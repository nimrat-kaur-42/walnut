const express = require('express');
const cors = require('cors');
const { Configuration, PlaidApi, PlaidEnvironments } = require('plaid');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Plaid configuration
const configuration = new Configuration({
  basePath: PlaidEnvironments.sandbox,
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID || 'your_client_id_here',
      'PLAID-SECRET': process.env.PLAID_SANDBOX_SECRET || 'your_sandbox_secret_here',
    },
  },
});

const plaidClient = new PlaidApi(configuration);

// Store access tokens (in production, use a database)
const accessTokens = new Map();

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Walnut Plaid API Server' });
});

// Create link token
app.post('/api/create-link-token', async (req, res) => {
  try {
    const { userId } = req.body;
    
    const request = {
      user: { client_user_id: userId },
      client_name: 'Walnut',
      products: ['transactions'],
      country_codes: ['US'],
      language: 'en',
      account_filters: {
        depository: {
          account_subtypes: ['checking', 'savings'],
        },
      },
    };

    const response = await plaidClient.linkTokenCreate(request);
    res.json({ link_token: response.data.link_token });
  } catch (error) {
    console.error('Error creating link token:', error);
    res.status(500).json({ error: 'Failed to create link token' });
  }
});

// Exchange public token for access token
app.post('/api/exchange-token', async (req, res) => {
  try {
    const { publicToken, userId } = req.body;
    
    const request = {
      public_token: publicToken,
    };

    const response = await plaidClient.itemPublicTokenExchange(request);
    const accessToken = response.data.access_token;
    const itemId = response.data.item_id;
    
    // Store access token (in production, save to database)
    accessTokens.set(userId, accessToken);
    
    res.json({
      access_token: accessToken,
      item_id: itemId,
    });
  } catch (error) {
    console.error('Error exchanging token:', error);
    res.status(500).json({ error: 'Failed to exchange token' });
  }
});

// Get accounts
app.get('/api/accounts/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const accessToken = accessTokens.get(userId);
    
    if (!accessToken) {
      return res.status(404).json({ error: 'No access token found' });
    }

    const request = {
      access_token: accessToken,
    };

    const response = await plaidClient.accountsGet(request);
    res.json({ accounts: response.data.accounts });
  } catch (error) {
    console.error('Error getting accounts:', error);
    res.status(500).json({ error: 'Failed to get accounts' });
  }
});

// Get transactions
app.get('/api/transactions/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { start_date, end_date, account_ids } = req.query;
    const accessToken = accessTokens.get(userId);
    
    if (!accessToken) {
      return res.status(404).json({ error: 'No access token found' });
    }

    const request = {
      access_token: accessToken,
      start_date: start_date || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      end_date: end_date || new Date().toISOString().split('T')[0],
      options: {
        account_ids: account_ids ? account_ids.split(',') : null,
        count: 100,
        offset: 0,
      },
    };

    const response = await plaidClient.transactionsGet(request);
    res.json({ transactions: response.data.transactions });
  } catch (error) {
    console.error('Error getting transactions:', error);
    res.status(500).json({ error: 'Failed to get transactions' });
  }
});

// Sandbox test endpoint
app.post('/api/sandbox/reset', async (req, res) => {
  try {
    const { userId } = req.body;
    
    // Reset sandbox data
    const request = {
      access_token: accessTokens.get(userId) || 'access-sandbox-test',
    };

    await plaidClient.sandboxItemResetLogin(request);
    res.json({ message: 'Sandbox data reset successfully' });
  } catch (error) {
    console.error('Error resetting sandbox:', error);
    res.status(500).json({ error: 'Failed to reset sandbox' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
}); 