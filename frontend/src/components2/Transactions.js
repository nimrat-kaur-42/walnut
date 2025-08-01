import React from 'react';

const transactions = [
  { date: '2025-08-02', category: 'Shopping', vendor: 'Target', amount: 18.42, roundUp: 0.58, action: 'Save' },
  { date: '2025-08-03', category: 'Food + Drink', vendor: 'Starbucks', amount: 6.25, roundUp: 0.75, action: 'Invest' },
  { date: '2025-08-05', category: 'Transportation', vendor: 'Uber', amount: 12.91, roundUp: 0.09, action: 'Invest' },
  { date: '2025-08-06', category: 'Groceries', vendor: 'Trader Joe’s', amount: 24.60, roundUp: 0.40, action: 'Save' },
  { date: '2025-08-08', category: 'Shopping', vendor: 'Sephora', amount: 34.67, roundUp: 0.33, action: 'Save' },
  { date: '2025-08-09', category: 'Food + Drink', vendor: 'Chipotle', amount: 11.80, roundUp: 0.20, action: 'Save' },
  { date: '2025-08-10', category: 'Entertainment', vendor: 'Netflix', amount: 9.99, roundUp: 0.01, action: 'Invest' },
  { date: '2025-08-12', category: 'Transportation', vendor: 'Lyft', amount: 15.75, roundUp: 0.25, action: 'Save' },
  { date: '2025-08-13', category: 'Groceries', vendor: 'Whole Foods', amount: 37.10, roundUp: 0.90, action: 'Invest' },
  { date: '2025-08-14', category: 'Shopping', vendor: 'Amazon', amount: 22.50, roundUp: 0.50, action: 'Invest' }
];

const getMonthlyTotal = (transactions) => {
  const now = new Date('2025-08-10');
  return transactions
    .filter(txn => {
      const txnDate = new Date(txn.date);
      return txnDate.getMonth() === now.getMonth() && txnDate.getFullYear() === now.getFullYear();
    })
    .reduce((sum, txn) => sum + txn.roundUp, 0)
    .toFixed(2);
};

function Transactions() {
  const totalRoundUps = getMonthlyTotal(transactions);

  return (
    <div style={{
      maxWidth: '900px',
      margin: '2rem auto',
      backgroundColor: '#fff',
      padding: '2rem',
      borderRadius: '20px',
      fontFamily: "'Inter', sans-serif"
    }}>
      <h2 style={{ textAlign: 'center', fontWeight: '700' }}>TRANSACTIONS</h2>
      <p style={{ textAlign: 'center', fontSize: '0.9rem', color: '#555', marginBottom: '2rem' }}>
        Track each purchase and see how your money is being moved intentionally.
      </p>

      <div style={{
        maxHeight: '400px',
        overflowY: 'auto',
        border: '1px solid #ccc',
        borderRadius: '10px',
        marginBottom: '2rem'
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f7f7f7', textAlign: 'left' }}>
              <th style={thStyle}>Date</th>
              <th style={thStyle}>Category</th>
              <th style={thStyle}>Vendor</th>
              <th style={thStyle}>Amount</th>
              <th style={thStyle}>Round-Up</th>
              <th style={thStyle}>Action</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((txn, index) => (
              <tr key={index} style={{ borderBottom: '1px solid #ddd' }}>
                <td style={tdStyle}>{txn.date}</td>
                <td style={tdStyle}>{txn.category.toUpperCase()}</td>
                <td style={tdStyle}>{txn.vendor}</td>
                <td style={tdStyle}>${txn.amount.toFixed(2)}</td>
                <td style={tdStyle}>${txn.roundUp.toFixed(2)}</td>
                <td style={tdStyle}>{txn.action.toUpperCase()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{
        backgroundColor: '#CD9252',
        borderRadius: '16px',
        marginTop: '1.5rem',
        textAlign: 'center',
        padding: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '120px'
      }}>
        <div style={{  
            paddingTop: '12px',
            paddingBottom: '12px',
        }}></div>
        <p style={{
          fontWeight: '700',
          fontSize: '1rem',
          margin: '0 0 0.25rem',
          color: '#1a1a1a'
        }}>TOTAL ROUND-UPS THIS MONTH:</p>
        <h2 style={{
          marginTop: '0.5rem',
          fontWeight: '700',
          fontSize: '1.5rem',
          color: '#000'
        }}>${totalRoundUps}</h2>
      </div>
    </div>
    
  );
}

const thStyle = {
  padding: '0.75rem 1rem',
  fontWeight: '600',
  fontSize: '0.9rem',
  color: '#333'
};

const tdStyle = {
  padding: '0.75rem 1rem',
  fontSize: '0.95rem',
  color: '#222'
};

export default Transactions;
