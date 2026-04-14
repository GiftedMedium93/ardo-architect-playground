import fs from 'fs';
import yaml from 'js-yaml';

export type Rule = {
  id: string;
  name: string;
  enforcement: 'BLOCK' | 'LOG';
};

export function loadConstitution(path: string) {
  const file = fs.readFileSync(path, 'utf8');
  return yaml.load(file) as any;
}

export function evaluateRules(context: any, constitution: any) {
  const violations: string[] = [];

  for (const rule of constitution.rules as Rule[]) {
    if (rule.id === 'CONST-001' && !context.linearTicket) {
      violations.push(rule.id);
    }

    if (rule.id === 'CONST-002' && !context.specReference) {
      violations.push(rule.id);
    }
  }

  return violations;
}

export function enforce(context: any) {
  const constitution = loadConstitution('./governance/constitution.yaml');
  const violations = evaluateRules(context, constitution);

  if (violations.length > 0) {
    throw new Error(`Constitutional violations: ${violations.join(', ')}`);
  }
}
