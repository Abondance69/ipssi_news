import { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'

// Pages
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import History from './pages/History'
import NotFound from './pages/NotFound'

// Components
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is already logged in (token in localStorage)
    const token = localStorage.getItem('token')
    if (token) {
      // Verify token with backend (you would implement this)
      // For now, we'll just mock this
      setIsAuthenticated(true)
      setUser({ username: localStorage.getItem('username') || 'User' })
    }
    setLoading(false)
  }, [])

  const login = (userData) => {
    setIsAuthenticated(true)
    setUser(userData)
    localStorage.setItem('token', userData.token)
    localStorage.setItem('username', userData.username)
  }

  const logout = () => {
    setIsAuthenticated(false)
    setUser(null)
    localStorage.removeItem('token')
    localStorage.removeItem('username')
  }

  if (loading) {
    return <div className="loading">Loading...</div>
  }

  return (
    <div className="app">
      <Navbar isAuthenticated={isAuthenticated} user={user} onLogout={logout} />
      <main className="content">
        <Routes>
          <Route path="/" element={<Home isAuthenticated={isAuthenticated} />} />
          <Route path="/login" element={!isAuthenticated ? <Login onLogin={login} /> : <Navigate to="/" />} />
          <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/" />} />
          <Route 
            path="/history" 
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <History user={user} />
              </ProtectedRoute>
            } 
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App