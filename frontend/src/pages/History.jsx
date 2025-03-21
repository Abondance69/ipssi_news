import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/api';
import './History.css';

const History = ({ user }) => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const response = await apiService.getHistory();
      setHistory(response.data || []);
    } catch (err) {
      console.error('Error fetching history:', err);
      setError('Failed to load your history. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Composant pour chaque élément d'historique
  const HistoryItem = ({ item }) => {
    const formatDate = (dateString) => {
      const options = { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      };
      return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
      <div className="history-item card">
        <div className="history-item-content">
          {/* Image à gauche */}
          {item.urlToImage && (
            <div className="history-item-image">
              <img 
                src={item.urlToImage} 
                alt={item.title} 
                onError={(e) => {
                  e.target.src = '/src/assets/news-placeholder.jpg';
                  e.target.onerror = null;
                }}
              />
            </div>
          )}

          {/* Contenu à droite */}
          <div className="history-item-text">
            {/* Titre cliquable qui mène directement à la source */}
            <a 
              href={item.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="history-item-title-link"
            >
              <h3 className="history-item-title">{item.title}</h3>
            </a>
            
            {/* Description de l'article */}
            {item.description && (
              <p className="history-item-description">{item.description}</p>
            )}
            
            {/* Date en bas à droite */}
            <div className="history-item-date">
              {formatDate(item.viewedAt)}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="history-page">
      <div className="history-header">
        <h1>Your Reading History</h1>
        <div className="history-user-info">
          <p>Welcome, <strong>{user?.username || 'User'}</strong></p>
        </div>
      </div>

      <div className="history-section">
        <h2>Articles You've Read</h2>
        
        {loading ? (
          <div className="history-loading">
            <div className="loader"></div>
            <p>Loading your history...</p>
          </div>
        ) : error ? (
          <div className="history-error">
            <p>{error}</p>
            <button onClick={fetchHistory} className="btn">Try Again</button>
          </div>
        ) : history.length === 0 ? (
          <div className="history-empty">
            <p>You haven't read any articles yet.</p>
            <p>Browse the news and your reading history will appear here.</p>
            <button onClick={() => navigate('/')} className="btn">Browse News</button>
          </div>
        ) : (
          <div className="history-list">
            {history.map((item) => (
              <HistoryItem key={item._id} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default History;