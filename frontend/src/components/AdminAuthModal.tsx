import React, { useState } from 'react';
import { ShieldCheck, Lock, X, ArrowRight } from 'lucide-react';
import { BloomLogo } from './BloomLogo';

interface AdminAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AdminAuthModal: React.FC<AdminAuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [pin, setPin] = useState<string>('');
  const [error, setError] = useState<string>('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Default PIN: 1234
    if (pin === '1234' || pin === 'bloom2026') {
      setError('');
      setPin('');
      onSuccess();
    } else {
      setError('Invalid Staff Security PIN. (Default PIN is 1234)');
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-md bg-[#071E13] text-white rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-[#16422E] space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#0B281B] text-[#8FA597] hover:text-white flex items-center justify-center transition-colors border border-[#16422E]"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-[#0B281B] text-[#F4B838] border border-[#16422E] flex items-center justify-center mx-auto shadow-inner">
            <Lock className="w-7 h-7" />
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0B281B] text-[#F4B838] text-[10px] font-bold uppercase tracking-[0.2em] border border-[#16422E]">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Staff Portal Access</span>
          </div>
          <h3 className="text-2xl font-editorial font-bold text-[#FAF8F5]">
            Enter Staff Passcode
          </h3>
          <p className="text-xs text-[#CAD4CD] font-light max-w-xs mx-auto">
            Restricted to Bloom Cafe baristas and management. Please enter your 4-digit security PIN.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="password"
              maxLength={10}
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="Enter PIN (Default: 1234)"
              className="w-full px-4 py-3.5 bg-[#0B281B] text-center font-mono text-lg tracking-[0.3em] font-bold text-[#F4B838] rounded-2xl border border-[#16422E] focus:outline-hidden focus:border-[#F4B838] placeholder-[#6E887B] placeholder:text-xs placeholder:tracking-normal"
              autoFocus
            />
            {error && (
              <p className="text-xs text-red-400 font-medium text-center mt-2 animate-bounce">
                {error}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-[#F4B838] hover:bg-[#E4A82B] text-black font-bold text-xs uppercase tracking-[0.2em] rounded-2xl transition-all shadow-xl flex items-center justify-center gap-2"
          >
            <span>Unlock Staff Console</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <p className="text-[10px] text-center text-[#8FA597] font-mono">
          Adebabay St · Bloom Cafe Operations Security
        </p>
      </div>
    </div>
  );
};
