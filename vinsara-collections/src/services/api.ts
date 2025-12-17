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
    // Normalize error object
    const resp = error?.response;

    // If backend says token is invalid/expired, clear it so app can behave as guest
    if (resp && resp.status === 401) {
      localStorage.removeItem('userToken');
      // You can also clear any cached user profile here if you store it
      // localStorage.removeItem('user');

      // Optional: force a reload so public endpoints work as guest
      // and the UI updates logged-out state.
      window.location.reload();
    }

    return Promise.reject(resp ? resp.data : error);
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
// --- NEW: STORE SERVICE ---
export const storeService = {
  // 1. Get All Products 
  // FIXED: Added '/store' prefix
  getProducts: async (params?: { category?: string; is_new?: boolean }) => {
    const response = await api.get('/store/products/', { params }); 
    return response.data;
  },

  // 2. Get Single Product by Slug
  // FIXED: Added '/store' prefix
  getProductBySlug: async (slug: string) => {
    const response = await api.get(`/store/products/${slug}/`);
    return response.data;
  },

  // 3. Get All Categories
  // FIXED: Added '/store' prefix
  getCategories: async () => {
    const response = await api.get('/store/categories/');
    return response.data;
  },

  // 4. Validate Coupon
  validateCoupon: async (code: string, orderTotal: number) => {
    const response = await api.post('/store/validate-coupon/', { 
        code, 
        order_total: orderTotal 
    });
    return response.data;
  },

  // 5. Get Site Config
  getSiteConfig: async () => {
    const response = await api.get('/store/config/');
    return response.data;
  }
};

// --- NEW: ORDER / PAYMENT SERVICE ---
export const orderService = {
  // Create order and get Razorpay order details
  createOrder: async (data: any) => {
    const response = await api.post('/orders/checkout/', data);
    return response.data;
  },

  // Verify payment after Razorpay success
  verifyPayment: async (data: {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
  }) => {
    const response = await api.post('/payments/verify/', data);
    return response.data;
  },
};
