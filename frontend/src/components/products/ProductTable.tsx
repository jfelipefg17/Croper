import { Pencil, Trash2, CheckCircle, XCircle, Package } from 'lucide-react';
import { Product } from '../../types';
import { useProductsUIStore } from '../../store/productsStore';

interface Props {
  products: Product[];
  isLoading: boolean;
}

export default function ProductTable({ products, isLoading }: Props) {
  const { openEditModal, openDeleteConfirm } = useProductsUIStore();

  if (isLoading) {
    return (
      <div className="overflow-x-auto rounded-2xl border border-slate-700/50">
        <table className="w-full text-sm">
          <thead className="bg-slate-800/80">
            <tr>
              {['Producto', 'Categoría', 'Precio', 'Stock', 'Estado', 'Acciones'].map((h) => (
                <th key={h} className="text-left px-5 py-3.5 text-slate-400 font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[...Array(5)].map((_, i) => (
              <tr key={i} className="border-t border-slate-700/30">
                {[...Array(6)].map((_, j) => (
                  <td key={j} className="px-5 py-4">
                    <div className="h-4 bg-slate-700/60 rounded animate-pulse" style={{ width: `${60 + Math.random() * 30}%` }} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-500 border border-slate-700/50 rounded-2xl bg-slate-800/20">
        <Package className="w-12 h-12 mb-3 opacity-40" />
        <p className="font-medium">No se encontraron productos</p>
        <p className="text-sm mt-1 opacity-70">Intenta cambiar los filtros o crea uno nuevo</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-700/50">
      <table className="w-full text-sm">
        <thead className="bg-slate-800/80">
          <tr>
            {['Producto', 'Categoría', 'Precio', 'Stock', 'Estado', 'Acciones'].map((h) => (
              <th key={h} className="text-left px-5 py-3.5 text-slate-400 font-medium whitespace-nowrap">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr
              key={product._id}
              className="border-t border-slate-700/30 hover:bg-slate-800/40 transition-colors group"
            >
              <td className="px-5 py-4">
                <div>
                  <div className="font-medium text-white group-hover:text-brand-400 transition-colors line-clamp-1">
                    {product.name}
                  </div>
                  {product.sku && (
                    <div className="text-xs text-slate-500 font-mono mt-0.5">{product.sku}</div>
                  )}
                </div>
              </td>
              <td className="px-5 py-4">
                <span className="bg-slate-700/60 text-slate-300 text-xs px-2.5 py-1 rounded-lg">
                  {product.category}
                </span>
              </td>
              <td className="px-5 py-4 font-mono text-white">
                ${product.price.toLocaleString('es-CO')}
              </td>
              <td className="px-5 py-4">
                <span className={`font-mono font-semibold ${
                  product.stock === 0 ? 'text-red-400' :
                  product.stock < 10 ? 'text-amber-400' : 'text-brand-400'
                }`}>
                  {product.stock}
                </span>
              </td>
              <td className="px-5 py-4">
                {product.isActive ? (
                  <span className="flex items-center gap-1.5 text-brand-400">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-xs font-medium">Activo</span>
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 text-slate-500">
                    <XCircle className="w-4 h-4" />
                    <span className="text-xs font-medium">Inactivo</span>
                  </span>
                )}
              </td>
              <td className="px-5 py-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openEditModal(product)}
                    className="p-1.5 text-slate-400 hover:text-brand-400 hover:bg-brand-500/10 rounded-lg transition-all"
                    title="Editar"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => openDeleteConfirm(product._id)}
                    className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                    title="Eliminar"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
