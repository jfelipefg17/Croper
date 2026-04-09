import { AlertTriangle, Loader2 } from 'lucide-react';

interface Props {
  onConfirm: () => void;
  onCancel: () => void;
  isLoading: boolean;
}

export default function DeleteConfirm({ onConfirm, onCancel, isLoading }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onCancel} />
      <div className="relative bg-slate-800 border border-slate-700/50 rounded-2xl p-6 w-full max-w-sm shadow-2xl">
        <div className="flex items-center justify-center w-12 h-12 bg-red-500/15 rounded-2xl mb-4 mx-auto">
          <AlertTriangle className="w-6 h-6 text-red-400" />
        </div>
        <h3 className="text-lg font-semibold text-white text-center mb-1">Eliminar producto</h3>
        <p className="text-sm text-slate-400 text-center mb-6">
          Esta acción no se puede deshacer. ¿Confirmas la eliminación?
        </p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 bg-slate-700/50 hover:bg-slate-700 text-slate-300 border border-slate-600/50 font-medium py-2.5 rounded-xl transition-all text-sm"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="flex-1 bg-red-500 hover:bg-red-600 disabled:opacity-60 text-white font-semibold py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 text-sm"
          >
            {isLoading ? <><Loader2 className="w-4 h-4 animate-spin" /> Eliminando...</> : 'Eliminar'}
          </button>
        </div>
      </div>
    </div>
  );
}
