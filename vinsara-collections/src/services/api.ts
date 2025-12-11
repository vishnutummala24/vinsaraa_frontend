import axios from 'axios';

// Base URL points to the API root
const BASE_URL = 'http://127.0.0.1:8000/api'; 

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('userToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error.response ? error.response.data : error);
  }
);

export const authService = {
  // Login
  login: async (credentials: any) => {
    const response = await api.post('/auth/login/', credentials);
    return response.data;
  },

  // Signup
  signup: async (userData: any) => {
    const response = await api.post('/auth/signup/', userData);
    return response.data;
  },

  // Get Profile
  getProfile: async () => {
    const response = await api.get('/auth/user/');
    return response.data;
  },

  // --- UPDATED GOOGLE LOGIN ---
// Google Login
  googleLogin: async (googleData: any) => {
    const payload = {
        code: googleData.code,
        callback_url: "postmessage" // <--- CRITICAL
    };
    
    // Note: ensure this path matches your urls.py (e.g. /auth/google/)
    const response = await api.post('/auth/google/', payload);
    return response.data;
  }
};
