import { useState } from "react";
import "../styles/Login.css";

const Login = ({ onLogin, setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple validation
    if (email && password) {
      setUser({ email, name: email.split("@")[0] });
      onLogin(true);
    }
  };

  return (
    <div className="login-container">
      <div className="horizontal-line-1"></div>
      <div className="horizontal-line-2"></div>
      <div className="horizontal-line-3"></div>
      <div className="sliding-light"></div>
      <div className="login-card">
        <div className="logo-section">
          <img src="/walnut.svg" alt="Walnut" className="walnut-logo" />
          <h1 className="app-title">WALNUT</h1>
          <p className="app-tagline">Turn spare change into smart savings</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="login-btn">
            {isSignUp ? "Sign Up" : "Login"}
          </button>
        </form>

        <div className="toggle-section">
          <p>
            {isSignUp ? "Already have an account?" : "Don't have an account?"}
            <button
              className="toggle-btn"
              onClick={() => setIsSignUp(!isSignUp)}
            >
              {isSignUp ? "Login" : "Sign Up"}
            </button>
          </p>
        </div>

        <div className="demo-section">
          <p className="demo-text">Try the demo with any email/password!</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
