import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import apiService from '../services/api'
import './Auth.css'

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields')
      return
    }
    
    try {
      setLoading(true)
      setError('')
      
      const response = await apiService.login(formData)
      
      // Handle successful login
      onLogin({
        username: response.data.username || response.data.email,
        token: response.data.token,
      })
      
      navigate('/')
    } catch (err) {
      console.error('Login error:', err)
      
      if (err.response?.data?.message) {
        setError(err.response.data.message)
      } else {
        setError('Login failed. Please check your credentials and try again.')
      }
      
      // For development: mock successful login
      if (import.meta.env.DEV && formData.email === 'demo@example.com' && formData.password === 'demo123') {
        onLogin({
          username: 'Demo User',
          token: 'mock-token-for-development',
        })
        navigate('/')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h1 className="auth-title">Login to News Central</h1>
        
        {error && <div className="auth-error">{error}</div>}
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              disabled={loading}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              disabled={loading}
              required
            />
          </div>
          
          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        
        <div className="auth-redirect">
          <p>Don't have an account? <Link to="/register">Register</Link></p>
          
          {import.meta.env.DEV && (
            <div className="auth-demo-note">
              <p>For development: Use email "demo@example.com" and password "demo123"</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Login