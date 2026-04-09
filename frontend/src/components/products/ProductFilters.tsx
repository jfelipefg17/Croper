import { useEffect, useState } from 'react';
import { Search, Filter, X, ChevronDown } from 'lucide-react';
import { useProductsUIStore } from '../../store/productsStore';
import { useCategories } from '../../hooks/useProducts';

export default function ProductFilters() {
  const { query, setQuery, resetQuery } = useProductsUIStore();
  const { data: categories = [] } = useCategories();
  const [searchInput, setSearchInput] = useState(query.search || '');

  // Debounce search
  useEffect(() => {
    const t = setTimeout(() => {
      setQuery({ search: searchInput, page: 1 });
    }, 400);
    return () => clearTimeout(t);
  }, [searchInput]);

  const hasFilters = query.search || query.category || query.isActive !== undefined;

  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-5">
      {/* Search */}
      <div className="relative flex-1">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Buscar productos..."
          className="w-full bg-slate-800/60 border border-slate-700/50 text-white placeholder-slate-500 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500/30 transition-all"
        />
      </div>

      {/* Category filter */}
      <div className="relative">
        <select
          value={query.category || ''}
          onChange={(e) => setQuery({ category: e.target.value || undefined, page: 1 })}
          className="appearance-none bg-slate-800/60 border border-slate-700/50 text-white rounded-xl px-4 py-2.5 pr-9 text-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500/30 transition-all cursor-pointer min-w-[160px]"
        >
          <option value="">Todas las categorías</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
      </div>

      {/* Status filter */}
      <div className="relative">
        <select
          value={query.isActive === undefined ? '' : String(query.isActive)}
          onChange={(e) => {
            const v = e.target.value;
            setQuery({ isActive: v === '' ? undefined : v === 'true', page: 1 });
          }}
          className="appearance-none bg-slate-800/60 border border-slate-700/50 text-white rounded-xl px-4 py-2.5 pr-9 text-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500/30 transition-all cursor-pointer"
        >
          <option value="">Todos</option>
          <option value="true">Activos</option>
          <option value="false">Inactivos</option>
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
      </div>

      {/* Sort */}
      <div className="relative">
        <select
          value={`${query.sortBy}:${query.sortOrder}`}
          onChange={(e) => {
            const [sortBy, sortOrder] = e.target.value.split(':') as [string, 'asc' | 'desc'];
            setQuery({ sortBy, sortOrder, page: 1 });
          }}
          className="appearance-none bg-slate-800/60 border border-slate-700/50 text-white rounded-xl px-4 py-2.5 pr-9 text-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500/30 transition-all cursor-pointer"
        >
          <option value="createdAt:desc">Más recientes</option>
          <option value="createdAt:asc">Más antiguos</option>
          <option value="price:asc">Precio ↑</option>
          <option value="price:desc">Precio ↓</option>
          <option value="name:asc">Nombre A-Z</option>
          <option value="stock:asc">Stock ↑</option>
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
      </div>

      {/* Clear filters */}
      {hasFilters && (
        <button
          onClick={() => { resetQuery(); setSearchInput(''); }}
          className="flex items-center gap-2 text-sm text-slate-400 hover:text-white bg-slate-800/60 hover:bg-slate-700 border border-slate-700/50 px-3 py-2.5 rounded-xl transition-all whitespace-nowrap"
        >
          <X className="w-4 h-4" />
          Limpiar
        </button>
      )}
    </div>
  );
}
