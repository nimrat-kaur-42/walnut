import React, { useState, useEffect } from "react";
import { usePlaidLink } from "react-plaid-link";
import plaidService from "../services/plaidService";
import "../styles/PlaidLink.css";

const PlaidLink = ({ onSuccess, onExit, userId }) => {
  const [linkToken, setLinkToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initializePlaid = async () => {
      try {
        setLoading(true);
        console.log("Initializing Plaid with userId:", userId || "test_user");
        const token = await plaidService.createLinkToken(userId || "test_user");
        console.log("Link token received:", token ? "Success" : "Failed");
        setLinkToken(token);
      } catch (err) {
        console.error("Plaid initialization error:", err);
        if (err.response?.status === 500) {
          setError("Backend server error. Please check server configuration.");
        } else if (err.code === "ECONNREFUSED") {
          setError(
            "Cannot connect to server. Please ensure backend is running."
          );
        } else {
          setError("Failed to initialize Plaid. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    };

    initializePlaid();
  }, [userId]);

  const onPlaidSuccess = async (publicToken, metadata) => {
    try {
      setLoading(true);
      const result = await plaidService.exchangePublicToken(
        publicToken,
        userId
      );

      // Get account information
      const accounts = await plaidService.getAccounts();

      onSuccess({
        accessToken: result.accessToken,
        itemId: result.itemId,
        accounts,
        metadata,
      });
    } catch (err) {
      setError("Failed to connect account. Please try again.");
      console.error("Plaid success error:", err);
    } finally {
      setLoading(false);
    }
  };

  const onPlaidExit = (err, metadata) => {
    console.log("Plaid Link exit:", err, metadata);
    onExit && onExit(err, metadata);
  };

  const config = {
    token: linkToken,
    onSuccess: onPlaidSuccess,
    onExit: onPlaidExit,
  };

  const { open, ready } = usePlaidLink(config);

  if (loading && !linkToken) {
    return (
      <div className="plaid-loading">
        <div className="loading-spinner"></div>
        <p>Initializing Plaid...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="plaid-error">
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
        <div className="demo-mode-notice">
          <p>
            <strong>Demo Mode:</strong> For hackathon purposes, you can use the
            sandbox credentials:
          </p>
          <ul>
            <li>
              <strong>Username:</strong> user_good
            </li>
            <li>
              <strong>Password:</strong> pass_good
            </li>
            <li>
              <strong>Bank:</strong> Chase Bank
            </li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="plaid-link-container">
      <div className="plaid-info">
        <h3>Connect Your Bank Account</h3>
        <p>
          Securely connect your bank account to start tracking transactions and
          saving automatically.
        </p>

        <div className="sandbox-notice">
          <h4>🧪 Sandbox Environment</h4>
          <p>This is a test environment. Use these credentials:</p>
          <ul>
            <li>
              <strong>Username:</strong> user_good
            </li>
            <li>
              <strong>Password:</strong> pass_good
            </li>
            <li>
              <strong>Bank:</strong> Chase Bank (or any available institution)
            </li>
          </ul>
        </div>
      </div>

      <button
        className="connect-bank-btn"
        onClick={() => open()}
        disabled={!ready || loading}
      >
        {loading ? "Connecting..." : "Connect Bank Account"}
      </button>

      {loading && (
        <div className="connecting-overlay">
          <div className="loading-spinner"></div>
          <p>Connecting to your bank...</p>
        </div>
      )}
    </div>
  );
};

export default PlaidLink;
