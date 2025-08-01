import React from 'react';
import logo from '../assets/walnuts.png';

function Navbar() {
  return (
    <nav style={{
      backgroundColor: '#CD9252',
      padding: '1rem 2rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      fontWeight: '700',
      fontFamily: "'Inter', sans-serif" 
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        fontFamily: "'Inter', sans-serif" 
      }}>
        <img src={logo} alt="Walnuts" style={{ height: '30px' }} />
        <span style={{
          fontSize: '1.5rem',
          fontFamily: "'Inter', sans-serif"
        }}>
          WALNUTS
        </span>
      </div>
      <div style={{
        display: 'flex',
        gap: '2rem',
        fontFamily: "'Inter', sans-serif" 
      }}>
        <a href="/" style={{
          textDecoration: 'none',
          color: 'black',
          fontFamily: "'Inter', sans-serif"
        }}>Home</a>
        <a href="/caps" style={{
          textDecoration: 'none',
          color: 'black',
          fontFamily: "'Inter', sans-serif"
        }}>Caps</a>
        <a href="/transactions" style={{
          textDecoration: 'none',
          color: 'black',
          fontFamily: "'Inter', sans-serif"
        }}>Transactions</a>
      </div>
    </nav>
  );
}

export default Navbar;

