import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span>📰 News Central</span>
        </Link>

        <div className={`navbar-menu`}>
          <Link to="/" className="navbar-link">
            Home
          </Link>

          <Link to="/history" className="navbar-link">
            History
          </Link>
        </div>
      </div>
    </nav>
  );
}
