import { Configuration, PlaidApi, PlaidEnvironments } from 'plaid';

// Plaid configuration for sandbox environment
const configuration = new Configuration({
  basePath: PlaidEnvironments.sandbox,
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': process.env.REACT_APP_PLAID_CLIENT_ID || 'your_client_id_here',
      'PLAID-SECRET': process.env.REACT_APP_PLAID_SANDBOX_SECRET || 'your_sandbox_secret_here',
    },
  },
});

export const plaidClient = new PlaidApi(configuration);

// Sandbox test credentials
export const SANDBOX_CREDENTIALS = {
  username: 'user_good',
  password: 'pass_good',
  institution_id: 'ins_109508', // Chase Bank
};

// Common sandbox institutions
export const SANDBOX_INSTITUTIONS = [
  { id: 'ins_109508', name: 'Chase Bank' },
  { id: 'ins_109509', name: 'Bank of America' },
  { id: 'ins_109510', name: 'Wells Fargo' },
  { id: 'ins_109511', name: 'Citibank' },
  { id: 'ins_109512', name: 'US Bank' },
];

export default plaidClient; 