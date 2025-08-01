import React from "react";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <div className="footer-logo">
            <div className="logo-container">
              <img
                src="/walnut.svg"
                alt="Walnut"
                className="footer-logo-img"
                onError={(e) => {
                  console.log("Logo failed to load");
                  e.target.style.display = "none";
                }}
                onLoad={() => {
                  console.log("Logo loaded successfully");
                }}
                style={{ maxWidth: "100%", height: "auto" }}
              />
            </div>
            <span className="footer-brand">WALNUT</span>
          </div>
          <p className="footer-description">
            Capital One Tech Summit 2025 Project
          </p>
        </div>

        <div className="footer-section">
          <h4>Project Team</h4>
          <div className="team-members">
            <span>Ashi Sharma</span>
            <span>Christian Hernandez</span>
            <span>Nimrat Kaur</span>
            <span>Shayan Rahman</span>
            <span>Victoria Tan</span>
          </div>
        </div>

        <div className="footer-section">
          <h4>About Walnut</h4>
          <p>
            Budget Breaker? Meet Your Fix. Walnut is the revolutionary app for
            college students that makes saving automatic, even with irregular
            income. Uniquely, we harness your daily spending habits – not just
            your unpredictable incoming funds – giving you the flexibility you
            need to truly take control.
          </p>
          <p>
            For ultimate discipline, Walnut directly re-routes your overspend
            into your financial goals. Plus, invest your discount wins and
            effortlessly round up every purchase. No more excuses.
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>Innovatively presented by the Walnut Team</p>
      </div>
    </footer>
  );
};

export default Footer;
