import { useState, useEffect } from 'react'
import NewsFilters from '../components/NewsFilters'
import NewsList from '../components/NewsList'
import './Home.css'

const Home = ({ isAuthenticated }) => {
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [appliedFilters, setAppliedFilters] = useState({
    keyword: '',
    category: '',
    sortBy: 'publishedAt',
    startDate: '',
    endDate: '',
    searchInContent: '',
  })

  // Fetch news based on applied filters
  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true)
      setError(null)

      
    }

    fetchNews()
  }, [appliedFilters])

  const handleApplyFilters = (filters) => {
    setAppliedFilters(filters)
  }

  const handleSaveToHistory = async (article) => {
    if (!isAuthenticated) return
    
  }

  return (
    <div className="home-page">
      <div className="home-hero">
        <h1>📰 News Central</h1>
        <p>Your personalized news aggregator with filters and history tracking</p>
      </div>

      <div className="home-content">
        <div className="home-filters">
          <NewsFilters 
            onApplyFilters={handleApplyFilters} 
            initialFilters={appliedFilters}
          />
        </div>
        
        <div className="home-results">
          <NewsList 
            articles={news} 
            loading={loading} 
            error={error}
            onSaveToHistory={isAuthenticated ? handleSaveToHistory : null}
          />
        </div>
      </div>
    </div>
  )
}

// Mock data for development
const mockArticles = [
  {
    source: { id: 'bbc-news', name: 'BBC News' },
    author: 'BBC News',
    title: 'Sample Article Title 1',
    description: 'This is a sample article description for testing purposes. This would be replaced with real API data in production.',
    url: 'https://www.bbc.com/news',
    urlToImage: 'https://via.placeholder.com/600x400',
    publishedAt: '2025-03-20T10:00:00Z',
    content: 'Sample content text here...'
  },
  {
    source: { id: 'cnn', name: 'CNN' },
    author: 'CNN News',
    title: 'Sample Article Title 2',
    description: 'Another sample article description for testing the news display. This would be replaced with real API data in production.',
    url: 'https://www.cnn.com',
    urlToImage: 'https://via.placeholder.com/600x400',
    publishedAt: '2025-03-19T15:30:00Z',
    content: 'Sample content text here...'
  },
  // Add more mock articles as needed for testing
]

export default Home