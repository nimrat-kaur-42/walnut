import { useState, useEffect } from "react";
import "./App.css";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [savingsGoal, setSavingsGoal] = useState(10); // Default $10 goal
  const [currentSavings, setCurrentSavings] = useState(0);
  const [transactions, setTransactions] = useState([]);

  // Calculate rounding up amount
  const calculateRoundUp = (amount) => {
    const roundedUp = Math.ceil(amount);
    return roundedUp - amount;
  };

  // Add new transaction
  const addTransaction = (amount, merchant) => {
    const roundUpAmount = calculateRoundUp(amount);
    const newTransaction = {
      id: Date.now(),
      amount: amount,
      merchant: merchant,
      roundUpAmount: roundUpAmount,
      date: new Date().toISOString(),
    };

    setTransactions((prev) => [newTransaction, ...prev]);
    setCurrentSavings((prev) => prev + roundUpAmount);
  };

  // Calculate progress percentage
  const getProgressPercentage = () => {
    return Math.min((currentSavings / savingsGoal) * 100, 100);
  };

  // Reset savings when goal is reached
  useEffect(() => {
    if (currentSavings >= savingsGoal) {
      setCurrentSavings(0);
      // In a real app, you'd transfer this to a savings account
    }
  }, [currentSavings, savingsGoal]);

  if (!isLoggedIn) {
    return <Login onLogin={setIsLoggedIn} setUser={setUser} />;
  }

  return (
    <Dashboard
      user={user}
      currentSavings={currentSavings}
      savingsGoal={savingsGoal}
      setSavingsGoal={setSavingsGoal}
      transactions={transactions}
      addTransaction={addTransaction}
      getProgressPercentage={getProgressPercentage}
      onLogout={() => setIsLoggedIn(false)}
    />
  );
}

export default App;
