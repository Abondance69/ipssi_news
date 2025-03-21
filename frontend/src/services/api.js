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

// Request interceptor for logging and authentication
apiClient.interceptors.request.use(
  (config) => {
    // Log the request details
    console.log('🚀 REQUEST ENVOYE :', {
      method: config.method.toUpperCase(),
      url: config.baseURL + config.url,
      params: config.params,
      data: config.data,
      headers: config.headers
    })
    
    // Add authentication token
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    console.log('❌ REQUEST ERROR:', error)
    return Promise.reject(error)
  }
)

// Response interceptor for logging responses
apiClient.interceptors.response.use(
  (response) => {
    console.log('✅ RESPONSE RECUE:', {
      status: response.status,
      statusText: response.statusText,
      data: response.data,
      headers: response.headers
    })
    return response
  },
  (error) => {
    console.log('❌ RESPONSE ERROR:', {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      message: error.message
    })
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