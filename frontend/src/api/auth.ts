import api from './axios';
import { AuthResponse, User } from '../types';

export const authApi = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    const { data } = await api.post('/auth/login', { email, password });
    return data;
  },

  register: async (name: string, email: string, password: string): Promise<AuthResponse> => {
    const { data } = await api.post('/auth/register', { name, email, password });
    return data;
  },

  getProfile: async (): Promise<User> => {
    const { data } = await api.get('/auth/profile');
    return data;
  },
};
