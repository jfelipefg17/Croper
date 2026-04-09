import { useProductStats } from '../../hooks/useProducts';
import { Package, TrendingUp, AlertTriangle, XCircle } from 'lucide-react';

export default function StatsCards() {
  const { data, isLoading } = useProductStats();

  const cards = [
    {
      label: 'Total Productos',
      value: data?.total ?? 0,
      icon: Package,
      color: 'text-blue-400',
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/20',
    },
    {
      label: 'Activos',
      value: data?.active ?? 0,
      icon: TrendingUp,
      color: 'text-brand-400',
      bg: 'bg-brand-500/10',
      border: 'border-brand-500/20',
    },
    {
      label: 'Sin stock',
      value: data?.outOfStock ?? 0,
      icon: AlertTriangle,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/20',
    },
    {
      label: 'Precio promedio',
      value: data ? `$${data.avgPrice.toLocaleString('es-CO', { maximumFractionDigits: 0 })}` : '—',
      icon: XCircle,
      color: 'text-purple-400',
      bg: 'bg-purple-500/10',
      border: 'border-purple-500/20',
    },
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-5 animate-pulse">
            <div className="h-8 w-8 bg-slate-700 rounded-lg mb-3" />
            <div className="h-7 w-16 bg-slate-700 rounded mb-1" />
            <div className="h-4 w-24 bg-slate-700 rounded" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.label}
            className={`bg-slate-800/50 border ${card.border} rounded-2xl p-5 hover:bg-slate-800 transition-all`}
          >
            <div className={`inline-flex items-center justify-center w-10 h-10 ${card.bg} rounded-xl mb-3`}>
              <Icon className={`w-5 h-5 ${card.color}`} />
            </div>
            <div className="text-2xl font-bold text-white font-mono">{card.value}</div>
            <div className="text-sm text-slate-400 mt-0.5">{card.label}</div>
          </div>
        );
      })}
    </div>
  );
}
