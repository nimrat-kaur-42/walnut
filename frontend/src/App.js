import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components2/Navbar';
import Footer from './components2/Footer';
import Dashboard from './components2/Dashboard';
import Caps from './components2/Caps';
import Transactions from './components2/Transactions';

function App() {
  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/caps" element={<Caps />} />
          <Route path="/transactions" element={<Transactions />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
