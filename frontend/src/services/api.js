import axios from 'axios'

// Create base API instance
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

// Create an Axios instance for our backend
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add a request interceptor to include auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Define API service methods
const apiService = {
  // Auth endpoints
  login: (credentials) => apiClient.post('/auth/login', credentials),
  register: (userData) => apiClient.post('/auth/register', userData),
  
  // News endpoints
  getNews: (params) => apiClient.get('/news', { params }),
  searchNews: (params) => apiClient.get('/news/search', { params }),
  getNewsByCategory: (category, params) => apiClient.get(`/news/category/${category}`, { params }),
  
  // History endpoints
  getHistory: () => apiClient.get('/history'),
  saveToHistory: (article) => apiClient.post('/history', article),
  recreateSearch: (searchId) => apiClient.get(`/history/recreate/${searchId}`),
  
  // User endpoints
  getUserProfile: () => apiClient.get('/users/profile'),
}

export default apiService