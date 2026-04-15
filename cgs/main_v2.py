from fastapi import FastAPI, Header, HTTPException
from functools import lru_cache
from pathlib import Path
import datetime
import yaml

app = FastAPI()
API_KEY = "secure-key"
BASE_DIR = Path(__file__).resolve().parent.parent
VERSIONS_DIR = BASE_DIR / "governance" / "versions"
AUDIT_LOG = BASE_DIR / "governance" / "audit.log"


def verify_key(x_api_key: str = Header(...)):
    if x_api_key != API_KEY:
        raise HTTPException(status_code=403, detail="Unauthorized")


@lru_cache(maxsize=16)
def load_constitution_version(version: str):
    path = VERSIONS_DIR / f"{version}.yaml"
    if not path.exists():
        raise FileNotFoundError(f"Constitution version not found: {version}")
    with open(path, "r", encoding="utf-8") as f:
        return yaml.safe_load(f)


def evaluate_condition(condition: dict, context: dict) -> bool:
    field = condition.get("field")
    operator = condition.get("operator")

    if operator == "exists":
        return bool(context.get(field))

    if operator == "equals":
        return context.get(field) == condition.get("value")

    if "all" in condition:
        return all(evaluate_condition(item, context) for item in condition["all"])

    if "any" in condition:
        return any(evaluate_condition(item, context) for item in condition["any"])

    return False


def evaluate(context: dict, constitution: dict):
    violations = []
    for rule in constitution.get("rules", []):
        condition = rule.get("condition", {})
        if condition and not evaluate_condition(condition, context):
            if rule.get("enforcement") == "BLOCK":
                violations.append(rule["id"])
    return violations


def log_event(version: str, context: dict, violations: list[str]):
    AUDIT_LOG.parent.mkdir(parents=True, exist_ok=True)
    ts = datetime.datetime.utcnow().isoformat() + "Z"
    with open(AUDIT_LOG, "a", encoding="utf-8") as f:
        f.write(f"{ts} | version={version} | context={context} | violations={violations}\n")


@app.post("/evaluate")
def run_evaluation(payload: dict, x_api_key: str = Header(...)):
    verify_key(x_api_key)

    version = str(payload.get("version", "2.0"))
    context = payload.get("context", {})
    constitution = load_constitution_version(version)
    violations = evaluate(context, constitution)

    log_event(version, context, violations)

    return {
        "version": version,
        "allowed": len(violations) == 0,
        "violations": violations,
    }
