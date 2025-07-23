import axios from 'axios';
import useAuthStore from '../store/authStore';
import toast from 'react-hot-toast';

// Create axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { response } = error;
    
    if (response?.status === 401) {
      useAuthStore.getState().logout();
      toast.error('Session expired. Please login again.');
      window.location.href = '/auth';
    } else if (response?.status === 403) {
      toast.error('Access denied. Insufficient permissions.');
    } else if (response?.status >= 500) {
      toast.error('Server error. Please try again later.');
    } else if (response?.data?.message) {
      toast.error(response.data.message);
    } else {
      toast.error('An unexpected error occurred.');
    }
    
    return Promise.reject(error);
  }
);

// Auth API endpoints
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  demoLogin: (role) => api.post(`/auth/demo-login?role=${role}`),
  logout: () => api.post('/auth/logout'),
  refreshToken: () => api.post('/auth/refresh'),
};

// Public API endpoints (no auth required)
export const publicAPI = {
  getListings: (params) => api.get('/public/listings', { params }),
  getListingById: (id) => api.get(`/public/listings/${id}`),
  getCategories: () => api.get('/public/categories'),
  getStats: () => api.get('/public/stats'),
};

// Buyer API endpoints
export const buyerAPI = {
  createOffer: (data) => api.post('/buyer/offers', data),
  getMyOffers: (params) => api.get('/buyer/offers', { params }),
  getOfferById: (id) => api.get(`/buyer/offers/${id}`),
  updateOffer: (id, data) => api.put(`/buyer/offers/${id}`, data),
  deleteOffer: (id) => api.delete(`/buyer/offers/${id}`),
  getSavedListings: () => api.get('/buyer/saved-listings'),
  saveListing: (listingId) => api.post(`/buyer/saved-listings/${listingId}`),
  unsaveListing: (listingId) => api.delete(`/buyer/saved-listings/${listingId}`),
  getDashboard: () => api.get('/buyer/dashboard'),
};

// Seller API endpoints
export const sellerAPI = {
  createListing: (data) => api.post('/seller/listings', data),
  getMyListings: () => api.get('/seller/listings'),
  getListingById: (id) => api.get(`/seller/listings/${id}`),
  updateListing: (id, data) => api.put(`/seller/listings/${id}`, data),
  deleteListing: (id) => api.delete(`/seller/listings/${id}`),
  getOffersForMyListings: (params) => api.get('/seller/offers', { params }),
  getOffersForListing: (listingId) => api.get(`/seller/listings/${listingId}/offers`),
  updateOfferStatus: (id, status) => api.put(`/seller/offers/${id}/status?status=${status}`),
  getDashboard: () => api.get('/seller/dashboard'),
  getAnalytics: (listingId) => api.get(`/seller/listings/${listingId}/analytics`),
};

// Chat API endpoints
export const chatAPI = {
  getMessages: (listingId, userId) => api.get(`/chat/messages/${listingId}/${userId}`),
  sendMessage: (data) => api.post('/chat/messages', data),
  getChatUsers: () => api.get('/chat/users'),
  getUnreadCount: () => api.get('/chat/unread-count'),
  markAsRead: (messageId) => api.put(`/chat/messages/${messageId}/read`),
};

// File Upload API endpoints
export const filesAPI = {
  uploadKyc: (file, documentType) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post(`/files/upload/kyc/${documentType}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  uploadListing: (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/files/upload/listing', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  uploadAvatar: (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/files/upload/avatar', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
};

// Payment API endpoints
export const paymentAPI = {
  createPaymentIntent: (data) => api.post('/payments/create-intent', data),
  confirmPayment: (data) => api.post('/payments/confirm', data),
  getPaymentHistory: () => api.get('/payments/history'),
  refundPayment: (paymentId) => api.post(`/payments/${paymentId}/refund`),
};

// Admin API endpoints (admin role required)
export const adminAPI = {
  getDashboard: () => api.get('/admin/dashboard'),
  getUsers: (params) => api.get('/admin/users', { params }),
  getUserById: (id) => api.get(`/admin/users/${id}`),
  updateUserStatus: (id, status) => api.put(`/admin/users/${id}/status?status=${status}`),
  updateKycStatus: (id, status) => api.put(`/admin/users/${id}/kyc-status?status=${status}`),
  deleteUser: (id) => api.delete(`/admin/users/${id}`),
  getAllListings: (params) => api.get('/admin/listings', { params }),
  updateListingStatus: (id, status) => api.put(`/admin/listings/${id}/status?status=${status}`),
  deleteListing: (id) => api.delete(`/admin/listings/${id}`),
  getAllTransactions: (params) => api.get('/admin/transactions', { params }),
  getSystemStats: () => api.get('/admin/stats'),
};

// User profile API endpoints
export const userAPI = {
  getProfile: () => api.get('/user/profile'),
  updateProfile: (data) => api.put('/user/profile', data),
  changePassword: (data) => api.put('/user/change-password', data),
  deleteAccount: () => api.delete('/user/account'),
  getNotifications: () => api.get('/user/notifications'),
  markNotificationAsRead: (id) => api.put(`/user/notifications/${id}/read`),
  updatePreferences: (data) => api.put('/user/preferences', data),
};

export default api;