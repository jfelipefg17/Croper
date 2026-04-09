import { Plus } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import StatsCards from '../components/products/StatsCards';
import ProductFilters from '../components/products/ProductFilters';
import ProductTable from '../components/products/ProductTable';
import ProductForm from '../components/products/ProductForm';
import DeleteConfirm from '../components/ui/DeleteConfirm';
import Pagination from '../components/ui/Pagination';
import { useProducts, useDeleteProduct } from '../hooks/useProducts';
import { useProductsUIStore } from '../store/productsStore';

export default function ProductsPage() {
  const {
    query, setQuery,
    isModalOpen, editingProduct, openCreateModal, closeModal,
    deletingProductId, closeDeleteConfirm,
  } = useProductsUIStore();

  const { data, isLoading, isFetching } = useProducts(query);
  const deleteProduct = useDeleteProduct(closeDeleteConfirm);

  const products = data?.data ?? [];
  const pagination = data?.pagination;

  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-7">
          <div>
            <h1 className="text-2xl font-bold text-white">Inventario</h1>
            <p className="text-slate-400 text-sm mt-0.5">Gestiona el catálogo de productos</p>
          </div>
          <button
            onClick={openCreateModal}
            className="flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white font-semibold px-5 py-2.5 rounded-xl transition-all shadow-lg shadow-brand-500/25 text-sm"
          >
            <Plus className="w-4 h-4" />
            Nuevo producto
          </button>
        </div>

        {/* Stats */}
        <StatsCards />

        {/* Filters */}
        <ProductFilters />

        {/* Table */}
        <div className={isFetching && !isLoading ? 'opacity-70 transition-opacity' : ''}>
          <ProductTable products={products} isLoading={isLoading} />
        </div>

        {/* Pagination */}
        {pagination && pagination.totalPages > 1 && (
          <Pagination
            page={pagination.page}
            totalPages={pagination.totalPages}
            total={pagination.total}
            limit={pagination.limit}
            onPageChange={(p) => setQuery({ page: p })}
          />
        )}
      </main>

      {/* Modals */}
      {isModalOpen && (
        <ProductForm product={editingProduct} onClose={closeModal} />
      )}

      {deletingProductId && (
        <DeleteConfirm
          onConfirm={() => deleteProduct.mutate(deletingProductId)}
          onCancel={closeDeleteConfirm}
          isLoading={deleteProduct.isPending}
        />
      )}
    </div>
  );
}
