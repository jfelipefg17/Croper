import { useState, useEffect, FormEvent } from 'react';
import { X, Loader2 } from 'lucide-react';
import { Product, ProductFormData } from '../../types';
import { useCreateProduct, useUpdateProduct } from '../../hooks/useProducts';

interface Props {
  product: Product | null;
  onClose: () => void;
}

const defaultForm: ProductFormData = {
  name: '',
  description: '',
  price: 0,
  stock: 0,
  category: '',
  sku: '',
  isActive: true,
};

export default function ProductForm({ product, onClose }: Props) {
  const [form, setForm] = useState<ProductFormData>(defaultForm);
  const isEditing = !!product;

  const create = useCreateProduct(onClose);
  const update = useUpdateProduct(onClose);

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name,
        description: product.description || '',
        price: product.price,
        stock: product.stock,
        category: product.category,
        sku: product.sku || '',
        isActive: product.isActive,
      });
    } else {
      setForm(defaultForm);
    }
  }, [product]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (isEditing) {
      update.mutate({ id: product._id, dto: form });
    } else {
      create.mutate(form);
    }
  };

  const loading = create.isPending || update.isPending;

  const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
    <div>
      <label className="block text-sm font-medium text-slate-300 mb-1.5">{label}</label>
      {children}
    </div>
  );

  const inputClass = "w-full bg-slate-700/50 border border-slate-600/50 text-white placeholder-slate-500 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500/30 transition-all";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-slate-800 border border-slate-700/50 rounded-2xl w-full max-w-lg shadow-2xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-700/50">
          <h2 className="text-lg font-semibold text-white">
            {isEditing ? 'Editar producto' : 'Nuevo producto'}
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white hover:bg-slate-700 p-1.5 rounded-lg transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
          <div className="px-6 py-5 space-y-4">
            <Field label="Nombre *">
              <input
                type="text"
                required
                minLength={2}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Ej: Fertilizante NPK 20-20-20"
                className={inputClass}
              />
            </Field>

            <Field label="Descripción">
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Descripción del producto..."
                rows={3}
                className={`${inputClass} resize-none`}
              />
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field label="Precio (COP) *">
                <input
                  type="number"
                  required
                  min={0}
                  step="0.01"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                  className={inputClass}
                />
              </Field>
              <Field label="Stock">
                <input
                  type="number"
                  min={0}
                  value={form.stock}
                  onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })}
                  className={inputClass}
                />
              </Field>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Field label="Categoría *">
                <input
                  type="text"
                  required
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  placeholder="Ej: Fertilizantes"
                  className={inputClass}
                />
              </Field>
              <Field label="SKU">
                <input
                  type="text"
                  value={form.sku}
                  onChange={(e) => setForm({ ...form, sku: e.target.value })}
                  placeholder="Ej: FERT-001"
                  className={inputClass}
                />
              </Field>
            </div>

            <div className="flex items-center gap-3 p-3 bg-slate-700/30 rounded-xl">
              <button
                type="button"
                onClick={() => setForm({ ...form, isActive: !form.isActive })}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  form.isActive ? 'bg-brand-500' : 'bg-slate-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                    form.isActive ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className="text-sm text-slate-300">
                Producto <strong>{form.isActive ? 'activo' : 'inactivo'}</strong>
              </span>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-slate-700/50 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-slate-700/50 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-600/50 font-medium py-2.5 rounded-xl transition-all text-sm"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-brand-500 hover:bg-brand-600 disabled:opacity-60 text-white font-semibold py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 text-sm shadow-lg shadow-brand-500/20"
            >
              {loading ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Guardando...</>
              ) : (
                isEditing ? 'Actualizar' : 'Crear producto'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
