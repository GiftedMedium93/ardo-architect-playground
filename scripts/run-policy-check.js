const { enforce } = require('../governance/policy-engine');

function extractContext() {
  const title = process.env.PR_TITLE || '';
  const body = process.env.PR_BODY || '';

  return {
    linearTicket: /LINEAR-[0-9]+/.test(title),
    specReference: /spec:/i.test(body),
  };
}

try {
  const context = extractContext();
  enforce(context);
  console.log('Policy check passed');
} catch (err) {
  console.error('Violation:', err.message);
  process.exit(1);
}
