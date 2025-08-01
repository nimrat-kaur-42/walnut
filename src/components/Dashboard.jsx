import { useState, useEffect } from "react";
import Footer from "./Footer";
import "../styles/Dashboard.css";

const Dashboard = ({
  user,
  currentSavings,
  savingsGoal,
  setSavingsGoal,
  transactions,
  addTransaction,
  addDemoRoundups,
  getProgressPercentage,
  onLogout,
}) => {
  const [amount, setAmount] = useState("");
  const [merchant, setMerchant] = useState("");
  const [showTransactionForm, setShowTransactionForm] = useState(false);
  const [plaidConnected, setPlaidConnected] = useState(false);
  const [plaidAccounts, setPlaidAccounts] = useState([]);
  const [plaidTransactions, setPlaidTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMoreTransactions, setShowMoreTransactions] = useState(false);
  const [unidaysDiscounts, setUnidaysDiscounts] = useState([]);
  const [totalSpent, setTotalSpent] = useState(0);
  const [canInvest, setCanInvest] = useState(false);

  // Calculate total spent and check if user can invest
  useEffect(() => {
    const total = transactions.reduce(
      (sum, transaction) => sum + Math.abs(transaction.amount),
      0
    );
    setTotalSpent(total);
    setCanInvest(total >= 10);
  }, [transactions]);

  // Generate UNiDAYS discounts based on spending
  useEffect(() => {
    const generateUnidaysDiscounts = () => {
      const discounts = [
        {
          id: 1,
          merchant: "Amazon",
          discount: "15% off textbooks",
          code: "UNIDAYS15",
          validUntil: "2025-02-15",
          category: "Education",
          minSpend: 25,
          icon: "📚",
        },
        {
          id: 2,
          merchant: "Nike",
          discount: "20% off student essentials",
          code: "STUDENT20",
          validUntil: "2025-02-20",
          category: "Fashion",
          minSpend: 50,
          icon: "👟",
        },
        {
          id: 3,
          merchant: "Adobe Creative Cloud",
          discount: "60% off Creative Suite",
          code: "ADOBE60",
          validUntil: "2025-03-01",
          category: "Software",
          minSpend: 0,
          icon: "🎨",
        },
        {
          id: 4,
          merchant: "Apple",
          discount: "Free AirPods with MacBook",
          code: "APPLEEDU",
          validUntil: "2025-02-28",
          category: "Technology",
          minSpend: 999,
          icon: "💻",
        },
        {
          id: 5,
          merchant: "Chipotle",
          discount: "Free guac on burritos",
          code: "GUACFREE",
          validUntil: "2025-02-10",
          category: "Food",
          minSpend: 8,
          icon: "🌮",
        },
      ];

      // Filter discounts based on user's spending level
      const availableDiscounts = discounts.filter(
        (discount) => totalSpent >= discount.minSpend
      );

      setUnidaysDiscounts(availableDiscounts);
    };

    generateUnidaysDiscounts();
  }, [totalSpent]);

  const handleAddTransaction = (e) => {
    e.preventDefault();
    if (amount && merchant) {
      addTransaction(parseFloat(amount), merchant);
      setAmount("");
      setMerchant("");
      setShowTransactionForm(false);
    }
  };

  const handleDemoConnect = () => {
    setPlaidConnected(true);
    setPlaidAccounts([
      {
        account_id: "demo_checking",
        name: "Capital One 360 Checking",
        subtype: "checking",
        balances: { current: 1250.5 },
        cardType: "debit",
        cardNumber: "**** **** **** 1234",
        cardColor: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
        cardDesign: "360-checking",
      },
      {
        account_id: "demo_savings",
        name: "Capital One 360 Savings",
        subtype: "savings",
        balances: { current: 3500.0 },
        cardType: "savings",
        cardNumber: "**** **** **** 5678",
        cardColor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        cardDesign: "360-savings",
      },
      {
        account_id: "demo_student",
        name: "Capital One Student Card",
        subtype: "credit",
        balances: { current: -150.0 },
        cardType: "credit",
        cardNumber: "**** **** **** 9012",
        cardColor: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
        cardDesign: "student-card",
      },
    ]);
    const demoTransactions = [
      {
        transaction_id: "demo_1",
        merchant_name: "Amazon",
        amount: -29.99,
        date: "2025-01-15",
      },
      {
        transaction_id: "demo_2",
        merchant_name: "Chipotle",
        amount: -12.5,
        date: "2025-01-14",
      },
      {
        transaction_id: "demo_3",
        merchant_name: "Uber",
        amount: -18.75,
        date: "2025-01-13",
      },
      {
        transaction_id: "demo_4",
        merchant_name: "Target",
        amount: -45.23,
        date: "2025-01-12",
      },
      {
        transaction_id: "demo_5",
        merchant_name: "Nike",
        amount: -89.99,
        date: "2025-01-11",
      },
      {
        transaction_id: "demo_6",
        merchant_name: "Adobe Creative Cloud",
        amount: -19.99,
        date: "2025-01-10",
      },
    ];

    setPlaidTransactions(demoTransactions);

    // Calculate and add potential roundups to current savings
    const totalPotentialRoundups = demoTransactions.reduce(
      (sum, transaction) => {
        const roundup =
          Math.ceil(Math.abs(transaction.amount)) -
          Math.abs(transaction.amount);
        return sum + roundup;
      },
      0
    );

    // Add potential roundups to current savings
    addDemoRoundups(totalPotentialRoundups);
  };

  const handleInvest = () => {
    // Add investment transaction
    addTransaction(10, "Investment");
    setCanInvest(false);
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

  // Get transactions to display (3 by default, more if showMoreTransactions is true)
  const displayedTransactions = showMoreTransactions
    ? transactions
    : transactions.slice(0, 3);

  return (
    <div className="dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-left">
          <img src="/walnut.svg" alt="Walnut" className="header-logo" />
          <div className="header-brand">
            <h1>WALNUT</h1>
            <span className="header-tagline">
              Tip your Future, Meet your Fix.
            </span>
          </div>
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

        {/* UNiDAYS Discounts Section */}
        {unidaysDiscounts.length > 0 && (
          <div className="unidays-section">
            <div className="section-header">
              <h3>🎓 UNiDAYS Student Discounts</h3>
              <span className="unidays-tag">Based on your spending</span>
            </div>
            <div className="discounts-grid">
              {unidaysDiscounts.map((discount) => (
                <div key={discount.id} className="discount-card">
                  <div className="discount-header">
                    <span className="discount-icon">{discount.icon}</span>
                    <span className="discount-merchant">
                      {discount.merchant}
                    </span>
                  </div>
                  <div className="discount-details">
                    <h4>{discount.discount}</h4>
                    <p className="discount-code">Code: {discount.code}</p>
                    <p className="discount-category">{discount.category}</p>
                    <p className="discount-valid">
                      Valid until{" "}
                      {new Date(discount.validUntil).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Investment Opportunity */}
        {canInvest && (
          <div className="investment-opportunity">
            <div className="investment-card">
              <h3>💡 Investment Opportunity!</h3>
              <p>You've spent ${totalSpent.toFixed(2)}. Ready to invest $10?</p>
              <button onClick={handleInvest} className="invest-btn">
                Invest $10 Now
              </button>
            </div>
          </div>
        )}

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
            <button className="connect-bank-btn" onClick={handleDemoConnect}>
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
                    placeholder="e.g., Amazon, Chipotle"
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
                <div key={account.account_id} className="wallet-card">
                  <div className="card-container">
                    <img
                      src={`/images/capital-one-${account.cardDesign}.svg`}
                      alt={account.name}
                      className="real-card-image"
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.nextSibling.style.display = "block";
                      }}
                    />
                    <div
                      className={`card-front ${account.cardDesign}`}
                      style={{ background: account.cardColor, display: "none" }}
                    >
                      <div className="card-header">
                        <div className="card-logo">
                          <img
                            src="/images/capital-one-logo.svg"
                            alt="Capital One"
                            className="capital-one-logo-img"
                            onError={(e) => {
                              e.target.style.display = "none";
                              e.target.nextSibling.style.display = "block";
                            }}
                          />
                          <span
                            className="capital-one-logo"
                            style={{ display: "none" }}
                          >
                            Capital One
                          </span>
                        </div>
                        <div className="card-type-badge">
                          {account.cardType === "credit" ? "💳" : "🏦"}
                        </div>
                      </div>
                      <div className="card-number">{account.cardNumber}</div>
                      <div className="card-footer">
                        <div className="card-name">
                          <span className="card-holder">STUDENT</span>
                          <span className="card-brand">Capital One</span>
                        </div>
                        <div className="card-balance">
                          {formatCurrency(account.balances.current)}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-details">
                    <h4>{account.name}</h4>
                    <p className="account-type">
                      {account.subtype.charAt(0).toUpperCase() +
                        account.subtype.slice(1)}
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
                <>
                  {(showMoreTransactions
                    ? plaidTransactions
                    : plaidTransactions.slice(0, 3)
                  ).map((transaction) => (
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
                  ))}
                  {plaidTransactions.length > 3 && (
                    <button
                      className="load-more-btn"
                      onClick={() =>
                        setShowMoreTransactions(!showMoreTransactions)
                      }
                    >
                      {showMoreTransactions ? "Show Less" : "Load More"}
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        )}

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

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Dashboard;
