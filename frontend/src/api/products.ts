import api from './axios';
import { Product, PaginatedResponse, ProductQuery, ProductFormData, Stats } from '../types';

export const productsApi = {
  getAll: async (query: ProductQuery = {}): Promise<PaginatedResponse<Product>> => {
    const params = new URLSearchParams();
    Object.entries(query).forEach(([k, v]) => {
      if (v !== undefined && v !== '') params.append(k, String(v));
    });
    const { data } = await api.get(`/products?${params}`);
    return data;
  },

  getOne: async (id: string): Promise<Product> => {
    const { data } = await api.get(`/products/${id}`);
    return data;
  },

  create: async (dto: ProductFormData): Promise<Product> => {
    const { data } = await api.post('/products', dto);
    return data;
  },

  update: async (id: string, dto: Partial<ProductFormData>): Promise<Product> => {
    const { data } = await api.patch(`/products/${id}`, dto);
    return data;
  },

  remove: async (id: string): Promise<void> => {
    await api.delete(`/products/${id}`);
  },

  getCategories: async (): Promise<string[]> => {
    const { data } = await api.get('/products/categories');
    return data;
  },

  getStats: async (): Promise<Stats> => {
    const { data } = await api.get('/products/stats');
    return data;
  },
};
