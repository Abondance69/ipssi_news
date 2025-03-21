import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Profile.css'

const Profile = ({ user }) => {
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    fetchHistory()
  }, [])

  const fetchHistory = async () => {

  }

  const handleRecreateSearch = async (searchId) => {
    
  }

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  return (
    <div className="profile-page">
      <div className="profile-header">
        <h1>Your Profile</h1>
        <div className="profile-user-info">
          <p>Welcome, <strong>{user?.username || 'User'}</strong></p>
        </div>
      </div>

      <div className="profile-section">
        <h2>Reading History</h2>
        
        {loading ? (
          <div className="profile-loading">
            <div className="loader"></div>
            <p>Loading your history...</p>
          </div>
        ) : error ? (
          <div className="profile-error">
            <p>{error}</p>
            <button onClick={fetchHistory} className="btn">Try Again</button>
          </div>
        ) : history.length === 0 ? (
          <div className="profile-empty">
            <p>You haven't read any articles yet.</p>
            <p>Browse the news and your reading history will appear here.</p>
            <button onClick={() => navigate('/')} className="btn">Browse News</button>
          </div>
        ) : (
          <div className="history-list">
            {history.map((item) => (
              <div key={item._id} className="history-item card">
                <div className="history-item-content">
                  <h3 className="history-item-title">{item.title}</h3>
                  
                  <div className="history-item-meta">
                    <span className="history-item-source">{item.source?.name}</span>
                    <span className="history-item-date">Read on: {formatDate(item.viewedAt)}</span>
                  </div>
                  
                  {item.description && (
                    <p className="history-item-description">{item.description}</p>
                  )}
                </div>
                
                <div className="history-item-actions">
                  {item.url && (
                    <a 
                      href={item.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn"
                    >
                      Visit Source
                    </a>
                  )}
                  
                  {item.searchParams && (
                    <button 
                      onClick={() => handleRecreateSearch(item._id)}
                      className="btn btn-secondary"
                    >
                      Recreate Search
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Profile