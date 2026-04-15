from dataclasses import dataclass
import hashlib, hmac, json
from pathlib import Path

@dataclass(frozen=True)
class TrustEvent:
    node_id: str
    event_type: str
    outcome: str
    weight_delta: float
    evidence_hash: str

class TrustLedger:
    def __init__(self, ledger_path='governance/trust_ledger.jsonl', secret_key='secure-key'):
        self.ledger_path = Path(ledger_path)
        self.secret_key = secret_key.encode()
        self.ledger_path.parent.mkdir(parents=True, exist_ok=True)

    def _canonical(self, payload):
        return json.dumps(payload, sort_keys=True, separators=(',', ':')).encode()

    def hash_evidence(self, evidence):
        return hashlib.sha256(self._canonical(evidence)).hexdigest()

    def sign_event(self, event):
        payload = self._canonical(event.__dict__)
        return hmac.new(self.secret_key, payload, hashlib.sha256).hexdigest()

    def append_event(self, event):
        signature = self.sign_event(event)
        record = {'event': event.__dict__, 'signature': signature}
        with self.ledger_path.open('a', encoding='utf-8') as f:
            f.write(json.dumps(record, sort_keys=True) + '\n')
        return signature

    def compute_trust(self, node_id, default=1.0):
        trust = default
        if not self.ledger_path.exists():
            return trust
        with self.ledger_path.open('r', encoding='utf-8') as f:
            for line in f:
                if not line.strip():
                    continue
                try:
                    record = json.loads(line)
                    event = record.get('event', {})
                    if event.get('node_id') != node_id:
                        continue
                    trust += float(event.get('weight_delta', 0.0))
                except Exception:
                    continue
        return max(0.0, trust)
