type GovernanceContext = {
  actor: string;
  action: string;
  resource?: string;
  risk_level?: 'low' | 'medium' | 'high';
  has_approval?: boolean;
  linearTicket?: boolean;
  specReference?: boolean;
};

type GovernanceDecision = {
  version: string;
  allowed: boolean;
  violations: string[];
};

export async function governedExecute<T>(
  action: () => Promise<T> | T,
  context: GovernanceContext,
  version = '2.0'
): Promise<T> {
  const res = await fetch('http://localhost:8000/evaluate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.CGS_KEY || 'secure-key',
    },
    body: JSON.stringify({ version, context }),
  });

  if (!res.ok) {
    throw new Error(`Governance service error: ${res.status}`);
  }

  const decision = (await res.json()) as GovernanceDecision;

  if (!decision.allowed) {
    throw new Error(`Constitutional violation: ${decision.violations.join(', ')}`);
  }

  return action();
}
