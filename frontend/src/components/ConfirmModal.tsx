import React, { useEffect } from 'react';
import { AlertTriangle, Trash2, X, HelpCircle } from 'lucide-react';

export interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isDanger?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  isDanger = false,
  onConfirm,
  onCancel,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCancel();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-[#0000] z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md transition-all animate-fadeIn">
      {/* Backdrop overlay */}
      <div 
        className="absolute inset-[#0000]" 
        onClick={onCancel}
        aria-hidden="true"
      />

      {/* Modal Box */}
      <div className="relative w-full max-w-md bg-[#071E13] border border-[#16422E] rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black/80 z-10 animate-scaleUp text-left overflow-hidden">
        {/* Ambient Top Glow Line */}
        <div className={`absolute top-0 left-0 right-0 h-1.5 ${isDanger ? 'bg-gradient-to-r from-red-600 via-amber-500 to-red-600' : 'bg-gradient-to-r from-[#F4B838] via-[#B0C32E] to-[#F4B838]'}`} />

        {/* Close Icon Button */}
        <button
          type="button"
          onClick={onCancel}
          className="absolute top-4 right-4 p-2 rounded-full text-[#8FA597] hover:text-white hover:bg-[#0B281B] transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Icon & Content Header */}
        <div className="flex items-start gap-4 mb-5">
          <div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border ${
              isDanger
                ? 'bg-red-950/40 text-red-400 border-red-800/60'
                : 'bg-[#7E5229]/30 text-[#F4B838] border-[#F4B838]/30'
            }`}
          >
            {isDanger ? (
              <Trash2 className="w-6 h-6 animate-bounce" />
            ) : (
              <AlertTriangle className="w-6 h-6 text-[#F4B838]" />
            )}
          </div>

          <div>
            <h3 className="text-xl font-editorial font-bold text-white tracking-wide leading-snug">
              {title}
            </h3>
            <p className="text-xs font-mono text-[#F4B838] uppercase tracking-wider mt-0.5">
              Bloom Cafe Confirmation
            </p>
          </div>
        </div>

        {/* Body Message */}
        <div className="mb-7 text-sm text-[#CAD4CD] leading-relaxed font-sans bg-[#0B281B]/80 p-4 rounded-2xl border border-[#16422E]/80">
          {message}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 pt-2 border-t border-[#16422E]">
          <button
            type="button"
            onClick={onCancel}
            className="px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-[#CAD4CD] bg-[#0B281B] hover:bg-[#16422E] border border-[#16422E] transition-all"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm();
            }}
            className={`px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider shadow-lg transition-all transform active:scale-95 ${
              isDanger
                ? 'bg-red-600 hover:bg-red-500 text-white border border-red-500 shadow-red-900/40'
                : 'bg-[#F4B838] hover:bg-[#E4A82B] text-black border border-[#F4B838] shadow-[#F4B838]/20'
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};
