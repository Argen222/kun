// API Configuration for Frontend

export const API_BASE_URL_DEV = 'https://kun-backend1.onrender.com/api';
export const API_BASE_URL_PROD = 'https://kun-backend1.onrender.com/api';

// Локалдык иштетүү үчүн — deploy кылганда 'production' га өзгөртүңүз
export const API_BASE_URL = import.meta.env.VITE_API_URL || API_BASE_URL_DEV;

export const API_ENDPOINTS = {
  // Auth
  REGISTER: '/auth/register',
  LOGIN: '/auth/login',
  ME: '/auth/me',

  // Products
  CATEGORIES: '/products/categories',
  PRODUCTS: '/products',
  PRODUCT_DETAIL: (id) => `/products/${id}`,

  // Cart
  CART: '/cart',
  CART_ITEM: (id) => `/cart/${id}`,

  // Orders
  ORDERS: '/orders',
  MY_ORDERS: '/orders',
  CUSTOM_ORDERS: '/orders',

  // Reviews
  REVIEWS: '/reviews',
};

export const buildURL = (endpoint) => {
  if (typeof endpoint === 'function') {
    return `${API_BASE_URL}${endpoint()}`;
  }
  return `${API_BASE_URL}${endpoint}`;
};