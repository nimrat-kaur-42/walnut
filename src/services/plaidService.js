import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

class PlaidService {
  constructor() {
    this.accessToken = null;
    this.itemId = null;
  }

  // Create a link token for the Plaid Link component
  async createLinkToken(userId) {
    try {
      const response = await axios.post(`${API_BASE_URL}/create-link-token`, {
        userId,
      });
      return response.data.link_token;
    } catch (error) {
      console.error('Error creating link token:', error);
      throw error;
    }
  }

  // Exchange public token for access token
  async exchangePublicToken(publicToken, userId) {
    try {
      const response = await axios.post(`${API_BASE_URL}/exchange-token`, {
        publicToken,
        userId,
      });
      
      this.accessToken = response.data.access_token;
      this.itemId = response.data.item_id;
      this.userId = userId;
      
      return {
        accessToken: this.accessToken,
        itemId: this.itemId,
      };
    } catch (error) {
      console.error('Error exchanging public token:', error);
      throw error;
    }
  }

  // Get account information
  async getAccounts() {
    if (!this.userId) {
      throw new Error('No user ID available');
    }

    try {
      const response = await axios.get(`${API_BASE_URL}/accounts/${this.userId}`);
      return response.data.accounts;
    } catch (error) {
      console.error('Error getting accounts:', error);
      throw error;
    }
  }

  // Get transactions for a specific date range
  async getTransactions(startDate, endDate, accountIds = null) {
    if (!this.userId) {
      throw new Error('No user ID available');
    }

    try {
      const params = new URLSearchParams();
      if (startDate) params.append('start_date', startDate);
      if (endDate) params.append('end_date', endDate);
      if (accountIds) params.append('account_ids', accountIds.join(','));

      const response = await axios.get(`${API_BASE_URL}/transactions/${this.userId}?${params}`);
      return response.data.transactions;
    } catch (error) {
      console.error('Error getting transactions:', error);
      throw error;
    }
  }

  // Get recent transactions (last 30 days)
  async getRecentTransactions() {
    const endDate = new Date().toISOString().split('T')[0];
    const startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    
    return this.getTransactions(startDate, endDate);
  }

  // Create sandbox test data
  async createSandboxTestData() {
    try {
      // Create a test user
      const userId = `user_${Date.now()}`;
      
      // Create link token
      const linkToken = await this.createLinkToken(userId);
      
      // For sandbox, we'll simulate the flow
      console.log('Sandbox Link Token created:', linkToken);
      
      return {
        linkToken,
        userId,
        message: 'Sandbox environment ready. Use Plaid Link to connect a bank account.',
      };
    } catch (error) {
      console.error('Error creating sandbox test data:', error);
      throw error;
    }
  }

  // Get sandbox test credentials
  getSandboxCredentials() {
    return {
      username: 'user_good',
      password: 'pass_good',
      institution_id: 'ins_109508', // Chase Bank
    };
  }

  // Simulate connecting a sandbox account
  async connectSandboxAccount() {
    try {
      // In a real implementation, this would use the Plaid Link flow
      // For now, we'll simulate a successful connection
      const mockAccessToken = `access-sandbox-${Date.now()}`;
      this.accessToken = mockAccessToken;
      
      return {
        success: true,
        accessToken: mockAccessToken,
        message: 'Sandbox account connected successfully',
      };
    } catch (error) {
      console.error('Error connecting sandbox account:', error);
      throw error;
    }
  }
}

export default new PlaidService(); 