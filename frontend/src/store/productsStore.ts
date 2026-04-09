import { create } from 'zustand';
import { Product, ProductQuery } from '../types';

interface ProductsUIState {
  // Filters & pagination
  query: ProductQuery;
  setQuery: (q: Partial<ProductQuery>) => void;
  resetQuery: () => void;

  // Modal state
  isModalOpen: boolean;
  editingProduct: Product | null;
  openCreateModal: () => void;
  openEditModal: (product: Product) => void;
  closeModal: () => void;

  // Delete confirmation
  deletingProductId: string | null;
  openDeleteConfirm: (id: string) => void;
  closeDeleteConfirm: () => void;
}

const defaultQuery: ProductQuery = {
  page: 1,
  limit: 10,
  search: '',
  sortBy: 'createdAt',
  sortOrder: 'desc',
};

export const useProductsUIStore = create<ProductsUIState>((set) => ({
  query: { ...defaultQuery },

  setQuery: (q) =>
    set((state) => ({
      query: { ...state.query, ...q, page: q.page ?? 1 },
    })),

  resetQuery: () => set({ query: { ...defaultQuery } }),

  isModalOpen: false,
  editingProduct: null,
  openCreateModal: () => set({ isModalOpen: true, editingProduct: null }),
  openEditModal: (product) => set({ isModalOpen: true, editingProduct: product }),
  closeModal: () => set({ isModalOpen: false, editingProduct: null }),

  deletingProductId: null,
  openDeleteConfirm: (id) => set({ deletingProductId: id }),
  closeDeleteConfirm: () => set({ deletingProductId: null }),
}));
