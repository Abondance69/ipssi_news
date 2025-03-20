import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Navbar.css'

const Navbar = ({ isAuthenticated, user, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navigate = useNavigate()

  const handleLogout = () => {
    onLogout()
    navigate('/')
    setIsMenuOpen(false)
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src="/src/assets/react.svg" alt="Logo" className="navbar-logo-img" />
          <span>📰 News Central</span>
        </Link>

        <div className="navbar-mobile-toggle" onClick={toggleMenu}>
          <span className="navbar-icon">{isMenuOpen ? '✕' : '☰'}</span>
        </div>

        <div className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          <Link to="/" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
            Home
          </Link>
          
          {isAuthenticated ? (
            <>
              <Link to="/profile" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
                History
              </Link>
              <div className="navbar-user">
                <span>{user?.username}</span>
                <button onClick={handleLogout} className="navbar-btn">
                  Logout
                </button>
              </div>
            </>
          ) : (
            <div className="navbar-auth">
              <Link to="/login" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
                Login
              </Link>
              <Link to="/register" className="navbar-btn" onClick={() => setIsMenuOpen(false)}>
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar