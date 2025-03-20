import { useState } from 'react'
import NewsCard from './NewsCard'
import './NewsList.css'

const NewsList = ({ articles, loading, error, onSaveToHistory }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const articlesPerPage = 6

  // Logic for pagination
  const indexOfLastArticle = currentPage * articlesPerPage
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage
  const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle)
  const totalPages = Math.ceil(articles.length / articlesPerPage)

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
    // Scroll to top when changing page
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (loading) {
    return (
      <div className="news-list-loading">
        <div className="loader"></div>
        <p>Loading articles...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="news-list-error">
        <h3>Error Loading News</h3>
        <p>{error}</p>
      </div>
    )
  }

  if (articles.length === 0) {
    return (
      <div className="news-list-empty">
        <h3>No Articles Found</h3>
        <p>Try adjusting your search filters or try a different keyword.</p>
      </div>
    )
  }

  return (
    <div className="news-list">
      <h2 className="news-list-title">Latest News</h2>
      
      <div className="news-list-grid">
        {currentArticles.map((article, index) => (
          <NewsCard 
            key={`${article.title}-${index}`}
            article={article}
            onSaveToHistory={onSaveToHistory}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button
            className={`pagination-btn ${currentPage === 1 ? 'disabled' : ''}`}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          
          <div className="pagination-pages">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                className={`pagination-btn ${page === currentPage ? 'active' : ''}`}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            ))}
          </div>
          
          <button
            className={`pagination-btn ${currentPage === totalPages ? 'disabled' : ''}`}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}

export default NewsList