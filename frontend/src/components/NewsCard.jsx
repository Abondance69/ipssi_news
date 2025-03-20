import { useState } from 'react'
import './NewsCard.css'

const NewsCard = ({ article, onSaveToHistory }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  const truncateText = (text, maxLength) => {
    if (!text) return ''
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text
  }

  const handleReadMore = () => {
    setIsExpanded(true)
    // Save to history when article is expanded
    if (onSaveToHistory && !isExpanded) {
      onSaveToHistory(article)
    }
  }

  const handleArticleClick = () => {
    // Save to history when clicking to external source
    if (onSaveToHistory) {
      onSaveToHistory(article)
    }
  }

  return (
    <article className="news-card">
      {article.urlToImage && (
        <div className="news-card-image">
          <img 
            src={article.urlToImage} 
            alt={article.title || 'News image'} 
            onError={(e) => {
              e.target.src = '/src/assets/news-placeholder.jpg'
              e.target.onerror = null
            }}
          />
        </div>
      )}
      
      <div className="news-card-content">
        <h3 className="news-card-title">{article.title}</h3>
        
        <div className="news-card-meta">
          {article.source && <span className="news-card-source">{article.source.name}</span>}
          {article.publishedAt && <span className="news-card-date">{formatDate(article.publishedAt)}</span>}
        </div>
        
        {article.description && (
          <p className="news-card-description">
            {isExpanded ? article.description : truncateText(article.description, 120)}
          </p>
        )}
        
        <div className="news-card-actions">
          {!isExpanded && article.description && article.description.length > 120 && (
            <button className="news-card-btn-text" onClick={handleReadMore}>
              Read More
            </button>
          )}
          
          {article.url && (
            <a 
              href={article.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="news-card-btn"
              onClick={handleArticleClick}
            >
              Visit Source
            </a>
          )}
        </div>
      </div>
    </article>
  )
}

export default NewsCard