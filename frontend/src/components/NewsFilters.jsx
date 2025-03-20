import { useState } from 'react'
import './NewsFilters.css'

const NewsFilters = ({ onApplyFilters, initialFilters = {} }) => {
  const [filters, setFilters] = useState({
    keyword: initialFilters.keyword || '',
    category: initialFilters.category || '',
    sortBy: initialFilters.sortBy || 'publishedAt',
    startDate: initialFilters.startDate || '',
    endDate: initialFilters.endDate || '',
    searchInContent: initialFilters.searchInContent || '',
  })

  const categories = [
    { value: '', label: 'All Categories' },
    { value: 'business', label: 'Business' },
    { value: 'entertainment', label: 'Entertainment' },
    { value: 'general', label: 'General' },
    { value: 'health', label: 'Health' },
    { value: 'science', label: 'Science' },
    { value: 'sports', label: 'Sports' },
    { value: 'technology', label: 'Technology' },
  ]

  const sortOptions = [
    { value: 'publishedAt', label: 'Published Date' },
    { value: 'relevancy', label: 'Relevance' },
    { value: 'popularity', label: 'Popularity' },
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFilters(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onApplyFilters(filters)
  }

  const handleReset = () => {
    setFilters({
      keyword: '',
      category: '',
      sortBy: 'publishedAt',
      startDate: '',
      endDate: '',
      searchInContent: '',
    })
    
    // Also apply the reset filters
    onApplyFilters({
      keyword: '',
      category: '',
      sortBy: 'publishedAt',
      startDate: '',
      endDate: '',
      searchInContent: '',
    })
  }

  return (
    <div className="news-filters card">
      <h2 className="filters-title">Search & Filter News</h2>
      
      <form onSubmit={handleSubmit} className="filters-form">
        <div className="form-group">
          <label htmlFor="keyword">Keywords</label>
          <input
            type="text"
            id="keyword"
            name="keyword"
            value={filters.keyword}
            onChange={handleChange}
            placeholder="Search for news..."
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={filters.category}
              onChange={handleChange}
            >
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="sortBy">Sort By</label>
            <select
              id="sortBy"
              name="sortBy"
              value={filters.sortBy}
              onChange={handleChange}
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="startDate">From Date</label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={filters.startDate}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="endDate">To Date</label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={filters.endDate}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="searchInContent">Search in article content</label>
          <input
            type="text"
            id="searchInContent"
            name="searchInContent"
            value={filters.searchInContent}
            onChange={handleChange}
            placeholder="Search for specific text in articles..."
          />
        </div>

        <div className="filters-actions">
          <button type="submit" className="btn">Apply Filters</button>
          <button type="button" onClick={handleReset} className="btn btn-secondary">Reset</button>
        </div>
      </form>
    </div>
  )
}

export default NewsFilters