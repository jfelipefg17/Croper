import axios, { AxiosError } from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
});

// Request interceptor: attach JWT
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Response interceptor: handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  },
);

// ── Auth ─────────────────────────────────────────────
export const authService = {
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),
  register: (email: string, password: string) =>
    api.post('/auth/register', { email, password }),
};

// ── Products ─────────────────────────────────────────
export const productService = {
  getAll: (params: Record<string, any>) =>
    api.get('/products', { params }),
  getById: (id: string) =>
    api.get(`/products/${id}`),
  create: (data: Record<string, any>) =>
    api.post('/products', data),
  update: (id: string, data: Record<string, any>) =>
    api.put(`/products/${id}`, data),
  delete: (id: string) =>
    api.delete(`/products/${id}`),
};
