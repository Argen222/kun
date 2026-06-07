import { buildURL, API_ENDPOINTS } from '../config/api';

// Token Management
const TOKEN_KEY = 'access_token';

const getToken = () => localStorage.getItem(TOKEN_KEY);
const setToken = (token) => localStorage.setItem(TOKEN_KEY, token);
const clearToken = () => localStorage.removeItem(TOKEN_KEY);

// Базовый запрос
const apiCall = async (url, options = {}) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    const token = getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(url, { headers, ...options });

    if (!response.ok) {
      if (response.status === 401) {
        clearToken();
        window.location.href = '/login';
      }
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || `API Error: ${response.status}`);
    }

    // 204 No Content
    if (response.status === 204) return null;

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const api = {
  // ── AUTH ──────────────────────────────────────────────────
  register: (credentials) => apiCall(buildURL(API_ENDPOINTS.REGISTER), {
    method: 'POST',
    body: JSON.stringify(credentials),
  }),

  login: async (credentials) => {
    const response = await apiCall(buildURL(API_ENDPOINTS.LOGIN), {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    if (response.access_token) {
      setToken(response.access_token);
    }
    return response;
  },

  logout: () => clearToken(),

  getCurrentUser: () => apiCall(buildURL(API_ENDPOINTS.ME)),

  // ── PRODUCTS ──────────────────────────────────────────────
  getCategories: () => apiCall(buildURL(API_ENDPOINTS.CATEGORIES)),

  getProducts: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const url = query
      ? `${buildURL(API_ENDPOINTS.PRODUCTS)}?${query}`
      : buildURL(API_ENDPOINTS.PRODUCTS);
    return apiCall(url);
  },

  getProduct: (id) => apiCall(buildURL(API_ENDPOINTS.PRODUCT_DETAIL(id))),

  // ── CART ──────────────────────────────────────────────────
  getCart: () => apiCall(buildURL(API_ENDPOINTS.CART)),

  addToCart: (product_id, quantity = 1) => apiCall(buildURL(API_ENDPOINTS.CART), {
    method: 'POST',
    body: JSON.stringify({ product_id, quantity }),
  }),

  updateCartItem: (item_id, quantity) => apiCall(buildURL(API_ENDPOINTS.CART_ITEM(item_id)), {
    method: 'PUT',
    body: JSON.stringify({ quantity }),
  }),

  removeFromCart: (item_id) => apiCall(buildURL(API_ENDPOINTS.CART_ITEM(item_id)), {
    method: 'DELETE',
  }),

  clearCart: () => apiCall(buildURL(API_ENDPOINTS.CART), {
    method: 'DELETE',
  }),

  // ── ORDERS ────────────────────────────────────────────────
  createOrder: (orderData) => apiCall(buildURL(API_ENDPOINTS.ORDERS), {
    method: 'POST',
    body: JSON.stringify(orderData),
  }),

  getMyOrders: () => apiCall(buildURL(API_ENDPOINTS.MY_ORDERS)),

  // ── REVIEWS ───────────────────────────────────────────────
  getReviews: () => apiCall(buildURL(API_ENDPOINTS.REVIEWS)),

  createReview: (reviewData) => apiCall(buildURL(API_ENDPOINTS.REVIEWS), {
    method: 'POST',
    body: JSON.stringify(reviewData),
  }),
};

export const auth = {
  getToken,
  setToken,
  clearToken,
  isAuthenticated: () => !!getToken(),
};

export default api;