import { useState, useEffect } from "react";
import PlaidLink from "./PlaidLink";
import plaidService from "../services/plaidService";
import "../styles/Dashboard.css";

const Dashboard = ({
  user,
  currentSavings,
  savingsGoal,
  setSavingsGoal,
  transactions,
  addTransaction,
  getProgressPercentage,
  onLogout,
}) => {
  const [amount, setAmount] = useState("");
  const [merchant, setMerchant] = useState("");
  const [showTransactionForm, setShowTransactionForm] = useState(false);
  const [plaidConnected, setPlaidConnected] = useState(false);
  const [plaidAccounts, setPlaidAccounts] = useState([]);
  const [plaidTransactions, setPlaidTransactions] = useState([]);
  const [showPlaidLink, setShowPlaidLink] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAddTransaction = (e) => {
    e.preventDefault();
    if (amount && merchant) {
      addTransaction(parseFloat(amount), merchant);
      setAmount("");
      setMerchant("");
      setShowTransactionForm(false);
    }
  };

  const handlePlaidSuccess = async (plaidData) => {
    setPlaidConnected(true);
    setPlaidAccounts(plaidData.accounts);
    setShowPlaidLink(false);

    // Fetch recent transactions
    try {
      setLoading(true);
      const transactions = await plaidService.getRecentTransactions();
      setPlaidTransactions(transactions);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePlaidExit = (err, metadata) => {
    setShowPlaidLink(false);
    if (err) {
      console.error("Plaid Link exit error:", err);
    }
  };

  const formatCurrency = (amount) => {
    return `$${amount.toFixed(2)}`;
  };

  const progressPercentage = getProgressPercentage();

  // Calculate total from Plaid transactions
  const totalPlaidAmount = plaidTransactions.reduce((sum, transaction) => {
    return sum + Math.abs(transaction.amount);
  }, 0);

  // Calculate potential roundups
  const potentialRoundups = plaidTransactions.reduce((sum, transaction) => {
    const roundup =
      Math.ceil(Math.abs(transaction.amount)) - Math.abs(transaction.amount);
    return sum + roundup;
  }, 0);

  return (
    <div className="dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-left">
          <img src="/walnut.svg" alt="Walnut" className="header-logo" />
          <h1>WALNUT</h1>
        </div>
        <div className="header-right">
          <span className="user-name">Welcome, {user?.name}</span>
          <button onClick={onLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </header>

      <div className="dashboard-content">
        {/* Progress Section */}
        <div className="progress-section">
          <div className="progress-info">
            <h2>Investment Progress</h2>
            <div className="progress-stats">
              <div className="stat">
                <span className="stat-label">Current Investment</span>
                <span className="stat-value">
                  {formatCurrency(currentSavings)}
                </span>
              </div>
              <div className="stat">
                <span className="stat-label">Goal</span>
                <span className="stat-value">
                  {formatCurrency(savingsGoal)}
                </span>
              </div>
            </div>
          </div>

          <div className="progress-bar-container">
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <span className="progress-text">
              {progressPercentage.toFixed(1)}% Complete
            </span>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          <button
            className="add-transaction-btn"
            onClick={() => setShowTransactionForm(true)}
          >
            + Add Transaction
          </button>
          <button className="set-goals-btn">Set Goals</button>
          {!plaidConnected && (
            <button
              className="connect-bank-btn"
              onClick={() => setShowPlaidLink(true)}
            >
              🔗 Connect Bank
            </button>
          )}
        </div>

        {/* Transaction Form */}
        {showTransactionForm && (
          <div className="transaction-form-overlay">
            <div className="transaction-form">
              <h3>Add New Transaction</h3>
              <form onSubmit={handleAddTransaction}>
                <div className="form-group">
                  <label>Merchant</label>
                  <input
                    type="text"
                    value={merchant}
                    onChange={(e) => setMerchant(e.target.value)}
                    placeholder="e.g., Starbucks, Amazon"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Amount</label>
                  <input
                    type="number"
                    step="0.01"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="5.68"
                    required
                  />
                </div>
                <div className="form-actions">
                  <button
                    type="button"
                    onClick={() => setShowTransactionForm(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit">Add Transaction</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Plaid Connection Status */}
        {plaidConnected && (
          <div className="plaid-status-section">
            <div className="plaid-status-header">
              <h3>🏦 Connected Bank Accounts</h3>
              <span className="connection-status connected">Connected</span>
            </div>
            <div className="accounts-grid">
              {plaidAccounts.map((account) => (
                <div key={account.account_id} className="account-card">
                  <div className="account-info">
                    <h4>{account.name}</h4>
                    <p className="account-type">{account.subtype}</p>
                    <p className="account-balance">
                      {formatCurrency(account.balances.current)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Plaid Transactions */}
        {plaidConnected && (
          <div className="transactions-section">
            <div className="section-header">
              <h3>Recent Bank Transactions</h3>
              <div className="transaction-stats">
                <span>Total: {formatCurrency(totalPlaidAmount)}</span>
                <span>
                  Potential Roundups: {formatCurrency(potentialRoundups)}
                </span>
              </div>
            </div>
            <div className="transactions-list">
              {loading ? (
                <div className="loading-transactions">
                  <div className="loading-spinner"></div>
                  <p>Loading transactions...</p>
                </div>
              ) : plaidTransactions.length === 0 ? (
                <p className="no-transactions">No recent transactions found.</p>
              ) : (
                plaidTransactions.slice(0, 10).map((transaction) => (
                  <div
                    key={transaction.transaction_id}
                    className="transaction-item plaid-transaction"
                  >
                    <div className="transaction-info">
                      <span className="merchant">
                        {transaction.merchant_name || transaction.name}
                      </span>
                      <span className="date">
                        {new Date(transaction.date).toLocaleDateString()}
                      </span>
                      <span className="amount">
                        {formatCurrency(Math.abs(transaction.amount))}
                      </span>
                    </div>
                    <div className="roundup-info">
                      <span className="roundup-amount">
                        +
                        {formatCurrency(
                          Math.ceil(Math.abs(transaction.amount)) -
                            Math.abs(transaction.amount)
                        )}{" "}
                        potential
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Manual Transactions List */}
        <div className="transactions-section">
          <h3>Manual Transactions</h3>
          <div className="transactions-list">
            {transactions.length === 0 ? (
              <p className="no-transactions">
                Start saving with your first transaction!
              </p>
            ) : (
              transactions.map((transaction) => (
                <div key={transaction.id} className="transaction-item">
                  <div className="transaction-info">
                    <span className="merchant">{transaction.merchant}</span>
                    <span className="amount">
                      {formatCurrency(transaction.amount)}
                    </span>
                  </div>
                  <div className="roundup-info">
                    <span className="roundup-amount">
                      +{formatCurrency(transaction.roundUpAmount)} invested
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Savings Summary */}
        <div className="savings-summary">
          <div className="summary-card">
            <h3>Total Invested</h3>
            <div className="total-amount">{formatCurrency(currentSavings)}</div>
            <p>Your spare change is building your future</p>
          </div>
          {plaidConnected && (
            <div className="summary-card potential-card">
              <h3>Potential Savings</h3>
              <div className="total-amount">
                {formatCurrency(potentialRoundups)}
              </div>
              <p>From your recent transactions</p>
            </div>
          )}
        </div>
      </div>

      {/* Plaid Link Modal */}
      {showPlaidLink && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button
              className="modal-close"
              onClick={() => setShowPlaidLink(false)}
            >
              ×
            </button>
            <PlaidLink
              onSuccess={handlePlaidSuccess}
              onExit={handlePlaidExit}
              userId={user?.id || "test_user"}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
