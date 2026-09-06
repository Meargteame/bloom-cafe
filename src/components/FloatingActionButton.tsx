import React from 'react';
import { ShoppingBag, ArrowRight } from 'lucide-react';

interface FloatingActionButtonProps {
  orderItemCount: number;
  orderTotal: number;
  currencySymbol: string;
  tableNumber: string;
  onOpenOrderTray: () => void;
}

export const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  orderItemCount,
  orderTotal,
  currencySymbol,
  tableNumber,
  onOpenOrderTray,
}) => {
  if (orderItemCount === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <button
        type="button"
        onClick={onOpenOrderTray}
        className="group bg-[#0B281B] hover:bg-[#071E13] text-white p-4 rounded-2xl shadow-2xl flex items-center gap-4 border-2 border-[#F4B838] transition-all duration-300 hover:scale-105"
      >
        <div className="relative">
          <div className="w-10 h-10 rounded-xl bg-[#F4B838] text-black flex items-center justify-center font-bold">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-white text-[#0B281B] text-[10px] font-black flex items-center justify-center shadow-md">
            {orderItemCount}
          </span>
        </div>

        <div className="text-left pr-2">
          <div className="text-xs font-bold uppercase tracking-wider text-[#F4B838]">
            Table {tableNumber || '1'} Order
          </div>
          <div className="font-mono text-sm font-black text-white">
            {currencySymbol}{orderTotal.toFixed(2)}
          </div>
        </div>

        <div className="w-7 h-7 rounded-lg bg-[#16422E] group-hover:bg-[#F4B838] text-[#F4B838] group-hover:text-black flex items-center justify-center transition-colors">
          <ArrowRight className="w-4 h-4" />
        </div>
      </button>
    </div>
  );
};
