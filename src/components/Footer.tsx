import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark text-white text-center py-3">
      <div className="container">
        <p>© {new Date().getFullYear()} Dream. All rights reserved.</p>
        <div className="d-flex justify-content-center mb-2">
          <Link className="text-white mx-2" to="/terms">
            Terms
          </Link>
          <Link className="text-white mx-2" to="/privacy">
            Privacy
          </Link>
          <Link className="text-white mx-2" to="/contact">
            Contact
          </Link>
        </div>
        <div>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white mx-2"
          >
            🐦
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white mx-2"
          >
            🔗
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white mx-2"
          >
            🐙
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
