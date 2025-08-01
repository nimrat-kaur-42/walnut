import React, { useState } from 'react';

const transactions = [
  { category: 'Coffee', amount: 6.50, date: '2025-07-03' },
  { category: 'Coffee', amount: 4.25, date: '2025-07-10' },
  { category: 'Food', amount: 12.75, date: '2025-07-04' },
  { category: 'Coffee', amount: 5.00, date: '2025-07-28' },
  { category: 'Food', amount: 18.00, date: '2025-06-10' },
  { category: 'Shopping', amount: 20.00, date: '2025-07-12' }
];

function getMonthlySpent(category, txns) {
  const now = new Date();
  return txns
    .filter(t =>
      t.category === category &&
      new Date(t.date).getMonth() === now.getMonth() &&
      new Date(t.date).getFullYear() === now.getFullYear()
    )
    .reduce((sum, t) => sum + t.amount, 0);
}

const allCategories = ['Coffee', 'Food', 'Shopping', 'Transportation', 'Dining', 'Groceries'];

function Caps() {
  const [caps, setCaps] = useState([
    { category: 'Coffee', limit: 100 },
    { category: 'Food', limit: 100 },
    { category: 'Shopping', limit: 100 },
    { category: 'Transportation', limit: 100 }
  ]);

  const [newCategory, setNewCategory] = useState('');
  const [newLimit, setNewLimit] = useState('');

  const [penaltyCategory, setPenaltyCategory] = useState('');
  const [penaltyAmount, setPenaltyAmount] = useState('');
  const [penalties, setPenalties] = useState({}); 

  const inputStyle = {
    width: '100%',
    padding: '0.75rem 1rem',
    borderRadius: '10px',
    border: 'none',
    marginBottom: '1rem',
    fontSize: '1rem',
    fontFamily: "'Inter', sans-serif",
    boxSizing: 'border-box'
  };

  const addCap = () => {
    if (!newCategory || !newLimit) return;
    if (caps.some(g => g.category === newCategory)) return;
    setCaps([...caps, { category: newCategory, limit: parseFloat(newLimit) }]);
    setNewCategory('');
    setNewLimit('');
  };

  const removeCap = (category) => {
    setCaps(caps.filter((g) => g.category !== category));
  };

  const setPenalty = () => {
    if (!penaltyCategory || !penaltyAmount) return;
    setPenalties({
      ...penalties,
      [penaltyCategory]: parseFloat(penaltyAmount)
    });
    setPenaltyCategory('');
    setPenaltyAmount('');
  };

  return (
    <div style={{
      backgroundColor: '#fff',
      maxWidth: '800px',
      margin: '2rem auto',
      padding: '2rem',
      borderRadius: '20px',
      fontFamily: "'Inter', sans-serif"
    }}>
      <h2 style={{
        textAlign: 'center',
        fontWeight: '700',
        letterSpacing: '1px'
      }}>SPENDING CAPS</h2>

      <p style={{
        textAlign: 'center',
        fontSize: '0.9rem',
        color: '#555',
        marginBottom: '2rem'
      }}>
        Set limits to hold yourself accountable. When you log a purchase, we'll track it against your caps here.
      </p>

      {caps.map((cap, index) => {
        const spent = getMonthlySpent(cap.category, transactions);
        const percent = Math.min((spent / cap.limit) * 100, 100).toFixed(0);

        return (
          <div key={index} style={{
            backgroundColor: '#CD9252',
            padding: '1rem 1.5rem',
            borderRadius: '16px',
            marginBottom: '1.5rem'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontWeight: '700',
              fontSize: '1rem',
              color: '#1a1a1a'
            }}>
              <span>{cap.category.toUpperCase()}</span>
              <span>${spent.toFixed(2)} / ${cap.limit.toFixed(2)}</span>
            </div>

            <div style={{
              height: '14px',
              backgroundColor: 'white',
              borderRadius: '8px',
              overflow: 'hidden',
              marginTop: '0.5rem',
              marginBottom: '0.5rem'
            }}>
              <div style={{
                width: `${percent}%`,
                backgroundColor: '#8CD47E',
                height: '100%'
              }}></div>
            </div>

            <button onClick={() => removeCap(cap.category)} style={{
              background: 'none',
              border: 'none',
              color: '#1a1a1a',
              fontSize: '0.8rem',
              textDecoration: 'underline',
              cursor: 'pointer'
            }}>
              REMOVE
            </button>
          </div>
        );
      })}

      <div style={{
        backgroundColor: '#CD9252',
        padding: '1rem 1.5rem',
        borderRadius: '16px',
        marginTop: '2rem'
      }}>
        <h4 style={{ marginBottom: '1rem', fontWeight: '700' }}>ADD A NEW CAP</h4>

        <select
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          style={inputStyle}
        >
          <option value="">Select category</option>
          {allCategories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Monthly limit (e.g. 50)"
          value={newLimit}
          onChange={(e) => setNewLimit(e.target.value)}
          style={inputStyle}
        />

        <button onClick={addCap} style={{
          width: '100%',
          backgroundColor: '#8B572A',
          color: '#fff',
          padding: '0.65rem 0',
          borderRadius: '10px',
          fontWeight: '700',
          border: 'none',
          cursor: 'pointer',
          fontSize: '1rem',
          letterSpacing: '0.5px'
        }}>
          SET CAP
        </button>
      </div>

      <div style={{
        backgroundColor: '#CD9252',
        padding: '1rem 1.5rem',
        borderRadius: '16px',
        marginTop: '2rem'
      }}>
        <h4 style={{ marginBottom: '1rem', fontWeight: '700' }}>SET A PENALTY</h4>

        <select
          value={penaltyCategory}
          onChange={(e) => setPenaltyCategory(e.target.value)}
          style={inputStyle}
        >
          <option value="">Select category</option>
          {allCategories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Monthly penalty (e.g. 3)"
          value={penaltyAmount}
          onChange={(e) => setPenaltyAmount(e.target.value)}
          style={inputStyle}
        />

        <button onClick={setPenalty} style={{
          width: '100%',
          backgroundColor: '#8B572A',
          color: '#fff',
          padding: '0.65rem 0',
          borderRadius: '10px',
          fontWeight: '700',
          border: 'none',
          cursor: 'pointer',
          fontSize: '1rem',
          letterSpacing: '0.5px'
        }}>
          SET PENALTY
        </button>
      </div>
    </div>
  );
}

export default Caps;
