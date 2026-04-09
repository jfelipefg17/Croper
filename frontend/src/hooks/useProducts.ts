import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { productsApi } from '../api/products';
import { ProductFormData, ProductQuery } from '../types';
import toast from 'react-hot-toast';

export const PRODUCTS_KEY = 'products';

export function useProducts(query: ProductQuery) {
  return useQuery({
    queryKey: [PRODUCTS_KEY, query],
    queryFn: () => productsApi.getAll(query),
    staleTime: 30_000,
  });
}

export function useProductStats() {
  return useQuery({
    queryKey: [PRODUCTS_KEY, 'stats'],
    queryFn: productsApi.getStats,
    staleTime: 60_000,
  });
}

export function useCategories() {
  return useQuery({
    queryKey: [PRODUCTS_KEY, 'categories'],
    queryFn: productsApi.getCategories,
    staleTime: 120_000,
  });
}

export function useCreateProduct(onSuccess?: () => void) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (dto: ProductFormData) => productsApi.create(dto),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [PRODUCTS_KEY] });
      toast.success('Producto creado exitosamente');
      onSuccess?.();
    },
    onError: (err: any) => {
      const msg = err?.response?.data?.message;
      toast.error(Array.isArray(msg) ? msg[0] : msg || 'Error al crear producto');
    },
  });
}

export function useUpdateProduct(onSuccess?: () => void) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: Partial<ProductFormData> }) =>
      productsApi.update(id, dto),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [PRODUCTS_KEY] });
      toast.success('Producto actualizado');
      onSuccess?.();
    },
    onError: (err: any) => {
      const msg = err?.response?.data?.message;
      toast.error(Array.isArray(msg) ? msg[0] : msg || 'Error al actualizar');
    },
  });
}

export function useDeleteProduct(onSuccess?: () => void) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => productsApi.remove(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [PRODUCTS_KEY] });
      toast.success('Producto eliminado');
      onSuccess?.();
    },
    onError: () => toast.error('Error al eliminar producto'),
  });
}
