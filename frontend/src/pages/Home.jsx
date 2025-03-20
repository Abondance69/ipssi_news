import { useState, useEffect } from 'react'
import NewsFilters from '../components/NewsFilters'
import NewsList from '../components/NewsList'
import apiService from '../services/api'
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

      try {
        // Create query params from applied filters
        const params = {}
        
        if (appliedFilters.keyword) params.q = appliedFilters.keyword
        if (appliedFilters.category) params.category = appliedFilters.category
        if (appliedFilters.sortBy) params.sortBy = appliedFilters.sortBy
        if (appliedFilters.startDate) params.from = appliedFilters.startDate
        if (appliedFilters.endDate) params.to = appliedFilters.endDate
        if (appliedFilters.searchInContent) params.searchInContent = appliedFilters.searchInContent

        // Make API request
        const response = await apiService.getNews(params)
        setNews(response.data.articles || [])
      } catch (err) {
        console.error('Error fetching news:', err)
        setError('Failed to load news. Please try again later.')
        
        // For development: mock data when API is not available
        if (import.meta.env.DEV) {
          setNews(mockArticles)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [appliedFilters])

  const handleApplyFilters = (filters) => {
    setAppliedFilters(filters)
  }

  const handleSaveToHistory = async (article) => {
    if (!isAuthenticated) return
    
    try {
      await apiService.saveToHistory({
        ...article,
        searchParams: appliedFilters, // Save the search params that led to this article
      })
    } catch (err) {
      console.error('Error saving to history:', err)
    }
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