import React, { useState } from 'react';
import Chart from './Chart';

function Dashboard() {
  const [saved, setSaved] = useState(0.0);
  const [invested, setInvested] = useState(0.0);

  return (
    <div style={{
      backgroundColor: '#fff',
      maxWidth: '800px',
      margin: '2rem auto',
      padding: '2rem',
      borderRadius: '20px'
    }}>
      <h2 style={{ textAlign: 'center' }}>DASHBOARD</h2>
      <p style={{
        textAlign: 'center',
        fontSize: '0.9rem',
        letterSpacing: '0.5px',
        color: '#444',
        marginBottom: '2rem'
      }}>
        HERE'S A SNAPSHOT OF YOUR FINANCIAL GROWTH. EVERY SMALL STEP COUNTS!
      </p>

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '2rem',
        marginBottom: '2rem'
      }}>
        <div style={{
          backgroundColor: '#CD9252',
          padding: '1.5rem 2rem',
          borderRadius: '16px',
          minWidth: '140px',
          textAlign: 'center',
        }}>
          <p style={{ fontWeight: '600', marginBottom: '0.5rem', color: 'white' }}>TOTAL SAVED</p>
          <div style={{
            backgroundColor: '#fff',
            borderRadius: '30px',
            display: 'inline-block',
            padding: '0.5rem 1rem',
            fontWeight: 'bold',
            fontSize: '1.2rem'
          }}>
            ${saved.toFixed(2)}
          </div>
        </div>

        <div style={{
          backgroundColor: '#CD9252',
          padding: '1.5rem 2rem',
          borderRadius: '16px',
          minWidth: '140px',
          textAlign: 'center',
        }}>
          <p style={{ fontWeight: '600', marginBottom: '0.5rem', color: 'white' }}>TOTAL INVESTED</p>
          <div style={{
            backgroundColor: '#fff',
            borderRadius: '30px',
            display: 'inline-block',
            padding: '0.5rem 1rem',
            fontWeight: 'bold',
            fontSize: '1.2rem'
          }}>
            ${invested.toFixed(2)}
          </div>
        </div>
      </div>

      <h3 style={{ textAlign: 'center', marginBottom: '1rem' }}>PROJECTED GROWTH</h3>
      <p style={{
        textAlign: 'center',
        fontSize: '0.8rem',
        color: '#555',
        marginBottom: '1.5rem'
      }}>
        SEE HOW YOUR CONTRIBUTIONS COULD GROW OVER TIME.
      </p>
      <Chart
        totalSaved={saved}
        totalInvested={invested}
        savingsRate={0.045}
        investmentRate={0.07}
      />
    </div>
  );
}

export default Dashboard;
