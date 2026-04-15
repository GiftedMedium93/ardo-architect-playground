from fastapi import FastAPI
import yaml

app = FastAPI()

def load_constitution():
    with open("governance/constitution.yaml", "r") as f:
        return yaml.safe_load(f)

def evaluate(context, constitution):
    violations = []

    for rule in constitution.get("rules", []):
        cond = rule.get("condition", {})
        field = cond.get("field")
        operator = cond.get("operator")

        if operator == "exists":
            if not context.get(field):
                violations.append(rule["id"])

    return violations

@app.post("/evaluate")
def run_evaluation(payload: dict):
    constitution = load_constitution()
    context = payload.get("context", {})

    violations = evaluate(context, constitution)

    return {
        "allowed": len(violations) == 0,
        "violations": violations
    }
