import './Footer.css'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">📰 News Central</h3>
            <p className="footer-description">
              Your centralized news aggregator with personalized history tracking.
            </p>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">Links</h3>
            <ul className="footer-links">
              <li><a href="/">Home</a></li>
              <li><a href="/profile">History</a></li>
              <li><a href="/login">Login</a></li>
              <li><a href="/register">Register</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">News Sources</h3>
            <ul className="footer-links">
              <li><a href="https://newsapi.org/" target="_blank" rel="noopener noreferrer">NewsAPI</a></li>
              <li><a href="https://developer.nytimes.com/" target="_blank" rel="noopener noreferrer">NY Times API</a></li>
              <li><a href="https://gnews.io/" target="_blank" rel="noopener noreferrer">GNews API</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} News Central. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer