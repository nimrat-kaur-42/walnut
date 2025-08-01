import React from 'react';
import logo from '../assets/walnuts.png';

function Footer() {
  return (
    <footer style={{
      backgroundColor: '#CD9252',
      color: 'black',
      padding: '1rem 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontWeight: '600',
      fontSize: '0.9rem',
      marginTop: '2rem'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <img src={logo} alt="Walnuts" style={{ height: '24px' }} />
        <span>WALNUTS INC.</span>
      </div>
      <div>WE HELP YOU HANDLE YOUR MONEY</div>
    </footer>
  );
}

export default Footer;
