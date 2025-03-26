import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Footer.css"; // Custom styles

const Footer: React.FC = () => {
  return (
    <footer className="footer-custom">
      <div className="container text-center">
        <p>© {new Date().getFullYear()} DREAMPIX. All rights reserved.</p>
        
        {/* Links Section */}
        <div className="footer-links">
          <Link to="/terms">Terms</Link>
          <Link to="/privacy">Privacy</Link>
          <Link to="/contact">Contact</Link>
        </div>

        {/* Social Icons */}
        <div className="footer-social">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-linkedin"></i>
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-github"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
