// import axios from 'axios'

// // Create base API instance
// const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

// // Create an Axios instance for our backend
// const apiClient = axios.create({
//   baseURL: API_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// })

// // Request interceptor for logging and authentication
// apiClient.interceptors.request.use(
//   (config) => {
//     // Log the request details
//     console.log('🚀 REQUEST ENVOYE :', {
//       method: config.method.toUpperCase(),
//       url: config.baseURL + config.url,
//       params: config.params,
//       data: config.data,
//       headers: config.headers
//     })
    
//     // Add authentication token
//     const token = localStorage.getItem('token')
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`
//     }
//     return config
//   },
//   (error) => {
//     console.log('❌ REQUEST ERROR:', error)
//     return Promise.reject(error)
//   }
// )

// // Response interceptor for logging responses
// apiClient.interceptors.response.use(
//   (response) => {
//     console.log('✅ RESPONSE RECUE:', {
//       status: response.status,
//       statusText: response.statusText,
//       data: response.data,
//       headers: response.headers
//     })
//     return response
//   },
//   (error) => {
//     console.log('❌ RESPONSE ERROR:', {
//       status: error.response?.status,
//       statusText: error.response?.statusText,
//       data: error.response?.data,
//       message: error.message
//     })
//     return Promise.reject(error)
//   }
// )

// // Define API service methods
// const apiService = {
//   // Auth endpoints
//   login: (credentials) => apiClient.post('/auth/login', credentials),
//   register: (userData) => apiClient.post('/auth/register', userData),
  
//   // News endpoints
//   getNews: (params) => apiClient.get('/news', { params }),
//   searchNews: (params) => apiClient.get('/news/search', { params }),
//   getNewsByCategory: (category, params) => apiClient.get(`/news/category/${category}`, { params }),
  
//   // History endpoints
//   getHistory: () => apiClient.get('/history'),
//   saveToHistory: (article) => apiClient.post('/history', article),
//   recreateSearch: (searchId) => apiClient.get(`/history/recreate/${searchId}`),
  
//   // User endpoints
//   getUserProfile: () => apiClient.get('/users/profile'),
// }

// export default apiService



import axios from 'axios'
 
// Enable mock mode while backend is not ready
const MOCK_MODE = true; // Mettez à false quand votre backend sera prêt
 
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
    console.log('🚀 REQUEST:', config.method.toUpperCase(), config.url, config.data);
   
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
 
// Mock data
const mockNews = [
  {
    _id: '1',
    title: 'Major Tech Breakthrough Announced',
    description: 'Scientists have developed a new technology that could revolutionize the way we process data.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies aliquam, nunc nisl aliquet nunc, vitae aliquam nisl nunc vitae nisl.',
    url: 'https://example.com/tech-news',
    urlToImage: 'https://via.placeholder.com/600x400?text=Tech+News',
    publishedAt: '2025-03-15T10:30:00Z',
    source: { id: 'tech-daily', name: 'Tech Daily' },
    category: 'technology'
  },
  {
    _id: '2',
    title: 'Global Markets See Record Gains',
    description: 'Stock markets around the world surged to new highs as economic recovery accelerates.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies aliquam, nunc nisl aliquet nunc, vitae aliquam nisl nunc vitae nisl.',
    url: 'https://example.com/financial-news',
    urlToImage: 'https://via.placeholder.com/600x400?text=Financial+News',
    publishedAt: '2025-03-16T14:45:00Z',
    source: { id: 'finance-world', name: 'Finance World' },
    category: 'business'
  },
  {
    _id: '3',
    title: 'Breakthrough in Renewable Energy Storage',
    description: 'New battery technology promises to solve long-standing issues with renewable energy storage.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies aliquam, nunc nisl aliquet nunc, vitae aliquam nisl nunc vitae nisl.',
    url: 'https://example.com/science-news',
    urlToImage: 'https://via.placeholder.com/600x400?text=Science+News',
    publishedAt: '2025-03-17T09:15:00Z',
    source: { id: 'science-today', name: 'Science Today' },
    category: 'science'
  },
  {
    _id: '4',
    title: 'Major Sports Tournament Begins',
    description: 'The biggest sporting event of the year kicked off with an impressive opening ceremony.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies aliquam, nunc nisl aliquet nunc, vitae aliquam nisl nunc vitae nisl.',
    url: 'https://example.com/sports-news',
    urlToImage: 'https://via.placeholder.com/600x400?text=Sports+News',
    publishedAt: '2025-03-18T18:00:00Z',
    source: { id: 'sports-globe', name: 'Sports Globe' },
    category: 'sports'
  },
  {
    _id: '5',
    title: 'Health Study Reveals Benefits of New Diet',
    description: 'Researchers find compelling evidence for health benefits of plant-based diets.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies aliquam, nunc nisl aliquet nunc, vitae aliquam nisl nunc vitae nisl.',
    url: 'https://example.com/health-news',
    urlToImage: 'https://via.placeholder.com/600x400?text=Health+News',
    publishedAt: '2025-03-19T11:30:00Z',
    source: { id: 'health-report', name: 'Health Report' },
    category: 'health'
  },
  {
    _id: '6',
    title: 'New Entertainment Platform Launches',
    description: 'A new streaming service enters the market with exclusive content from major studios.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies aliquam, nunc nisl aliquet nunc, vitae aliquam nisl nunc vitae nisl.',
    url: 'https://example.com/entertainment-news',
    urlToImage: 'https://via.placeholder.com/600x400?text=Entertainment+News',
    publishedAt: '2025-03-20T13:45:00Z',
    source: { id: 'entertainment-daily', name: 'Entertainment Daily' },
    category: 'entertainment'
  }
];
 
const mockHistory = [
  {
    _id: '101',
    title: 'Tech Breakthrough That Changed Everything',
    description: 'The story of how a small startup changed the tech landscape forever.',
    url: 'https://example.com/tech-history',
    urlToImage: 'https://via.placeholder.com/600x400?text=Tech+History',
    publishedAt: '2025-03-10T08:30:00Z',
    viewedAt: '2025-03-20T14:25:00Z',
    source: { id: 'tech-chronicles', name: 'Tech Chronicles' },
    searchParams: { keyword: 'tech breakthrough', category: 'technology' }
  },
  {
    _id: '102',
    title: 'Financial Markets Analysis for Q1 2025',
    description: 'Comprehensive analysis of global financial markets for the first quarter of 2025.',
    url: 'https://example.com/finance-analysis',
    urlToImage: 'https://via.placeholder.com/600x400?text=Financial+Analysis',
    publishedAt: '2025-03-12T10:15:00Z',
    viewedAt: '2025-03-19T16:40:00Z',
    source: { id: 'finance-review', name: 'Finance Review' },
    searchParams: { keyword: 'financial markets', category: 'business' }
  },
  {
    _id: '103',
    title: 'The Future of Clean Energy Technologies',
    description: 'What to expect in the clean energy sector over the next decade.',
    url: 'https://example.com/energy-future',
    urlToImage: 'https://via.placeholder.com/600x400?text=Energy+Future',
    publishedAt: '2025-03-15T09:45:00Z',
    viewedAt: '2025-03-18T11:20:00Z',
    source: { id: 'science-forecast', name: 'Science Forecast' },
    searchParams: { keyword: 'clean energy', category: 'science' }
  }
];
 
// Mock user data
const mockUser = {
  _id: '1001',
  username: 'BOUSSAD AIT DJOUDI',
  email: 'test@example.com',
  token: 'mock-jwt-token'
};
 
// Create mock service with simulated responses
const mockApiService = {
  // Auth endpoints
  login: (credentials) => {
    console.log('Mock login with:', credentials);
    // Simulate successful login with demo@example.com / demo123
    if (credentials.email === 'demo@example.com' && credentials.password === 'demo123') {
      return Promise.resolve({ data: mockUser });
    }
    // Otherwise simulate error
    return Promise.reject({
      response: {
        status: 401,
        data: { message: 'Invalid credentials' }
      }
    });
  },
 
  register: (userData) => {
    console.log('Mock register with:', userData);
    // Always simulate successful registration
    return Promise.resolve({ data: { message: 'Registration successful' } });
  },
 
  // News endpoints
  getNews: (params) => {
    console.log('Mock getNews with params:', params);
    // Filter news based on params
    let filteredNews = [...mockNews];
   
    if (params?.q) {
      const keyword = params.q.toLowerCase();
      filteredNews = filteredNews.filter(
        article => article.title.toLowerCase().includes(keyword) ||
                  article.description.toLowerCase().includes(keyword)
      );
    }
   
    if (params?.category && params.category !== '') {
      filteredNews = filteredNews.filter(
        article => article.category === params.category
      );
    }
   
    // Simulate API response format
    return Promise.resolve({
      data: {
        articles: filteredNews,
        totalResults: filteredNews.length
      }
    });
  },
 
  searchNews: (params) => {
    console.log('Mock searchNews with params:', params);
    return mockApiService.getNews(params);
  },
 
  getNewsByCategory: (category, params) => {
    console.log(`Mock getNewsByCategory: ${category}, params:`, params);
    return mockApiService.getNews({ ...params, category });
  },
 
  // History endpoints
  getHistory: () => {
    console.log('Mock getHistory');
    return Promise.resolve({ data: mockHistory });
  },
 
  saveToHistory: (article) => {
    console.log('Mock saveToHistory:', article);
    return Promise.resolve({ data: { message: 'Article saved to history' } });
  },
 
  recreateSearch: (searchId) => {
    console.log('Mock recreateSearch for ID:', searchId);
    const historyItem = mockHistory.find(item => item._id === searchId);
    if (historyItem) {
      return Promise.resolve({ data: { searchParams: historyItem.searchParams } });
    }
    return Promise.reject({ response: { status: 404, data: { message: 'Search not found' } } });
  },
 
  // User endpoints
  getUserProfile: () => {
    console.log('Mock getUserProfile');
    return Promise.resolve({ data: mockUser });
  },
};
 
// Choose which service to export based on mode
const apiService = MOCK_MODE ? mockApiService : {
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
};
 
export default apiService;