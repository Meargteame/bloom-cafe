import React, { useState } from 'react';
import { OrderItem, CafeInfo } from '../types';
import { X, Plus, Minus, Trash2, Coffee, Check, MessageSquare, ArrowRight } from 'lucide-react';
import { BloomLogo } from './BloomLogo';
import { api } from '../services/api';

interface OrderTrayDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: OrderItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearOrder: () => void;
  cafeInfo: CafeInfo;
  tableNumber: string;
  onTableNumberChange: (table: string) => void;
}

export const OrderTrayDrawer: React.FC<OrderTrayDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearOrder,
  cafeInfo,
  tableNumber,
  onTableNumberChange,
}) => {
  const [orderSent, setOrderSent] = useState<boolean>(false);
  const [notes, setNotes] = useState<string>('');

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, orderItem) => {
    return sum + orderItem.item.price * orderItem.quantity;
  }, 0);

  const estimatedTax = subtotal * 0.08;
  const total = subtotal + estimatedTax;

  const handlePlaceOrder = () => {
    api.submitOrder(tableNumber || '1', items, total);
    setOrderSent(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-xs">
      <div 
        className="absolute inset-y-0 right-0 w-full max-w-md bg-[#0B281B] text-white shadow-2xl flex flex-col border-l border-[#16422E]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 bg-[#071E13] flex items-center justify-between border-b border-[#16422E]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0B281B] border border-[#16422E] flex items-center justify-center text-[#F4B838]">
              <Coffee className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-editorial font-bold text-[#FAF8F5]">Table Order Tray</h2>
              <p className="text-xs text-[#8FA597]">
                {items.length} {items.length === 1 ? 'item' : 'items'} selected
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[#8FA597] hover:text-white hover:bg-[#16422E] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Order Confirmed State */}
        {orderSent ? (
          <div className="p-8 flex-1 flex flex-col items-center justify-center text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-[#123827] text-[#B0C32E] border-2 border-[#B0C32E] flex items-center justify-center shadow-xl">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>

            <div className="space-y-2">
              <span className="text-[10px] uppercase font-bold tracking-[0.24em] text-[#F4B838]">
                ORDER READY FOR BARISTA
              </span>
              <h3 className="text-2xl font-editorial font-bold text-white">
                Ticket Generated
              </h3>
              <p className="text-xs text-[#CAD4CD] leading-relaxed max-w-xs">
                Your order for <strong className="text-white">Table {tableNumber || '1'}</strong> has been generated. Show this digital ticket to the barista or counter.
              </p>
            </div>

            {/* Ticket Box */}
            <div className="w-full bg-[#071E13] p-4 rounded-2xl border border-[#16422E] font-mono text-xs text-left space-y-2">
              <div className="flex justify-between text-[#8FA597] pb-2 border-b border-[#16422E]">
                <span>TABLE {tableNumber || '1'}</span>
                <span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
              {items.map((i) => (
                <div key={i.item.id} className="flex justify-between text-white">
                  <span>{i.quantity}x {i.item.name}</span>
                  <span className="text-[#F4B838]">{cafeInfo.currencySymbol}{(i.item.price * i.quantity).toFixed(2)}</span>
                </div>
              ))}
              {notes && (
                <div className="pt-2 text-[11px] text-[#CAD4CD] italic border-t border-[#16422E]">
                  Note: "{notes}"
                </div>
              )}
              <div className="pt-2 flex justify-between font-bold text-sm text-[#F4B838] border-t border-[#16422E]">
                <span>TOTAL:</span>
                <span>{cafeInfo.currencySymbol}{total.toFixed(2)}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                onClearOrder();
                setOrderSent(false);
                onClose();
              }}
              className="w-full py-3 bg-[#F4B838] hover:bg-[#E4A82B] text-black font-bold text-xs uppercase tracking-wider rounded-xl transition-colors shadow-lg"
            >
              Start New Order
            </button>
          </div>
        ) : (
          <>
            {/* Table Number Selector */}
            <div className="px-5 py-3 bg-[#071E13] border-b border-[#16422E] flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#F4B838]">
                Table Number:
              </span>
              <div className="flex items-center gap-1.5">
                <input
                  type="text"
                  value={tableNumber}
                  onChange={(e) => onTableNumberChange(e.target.value)}
                  placeholder="1"
                  className="w-16 px-2 py-1 bg-[#0B281B] text-center font-mono text-sm font-bold text-white rounded-lg border border-[#16422E] focus:outline-hidden focus:border-[#F4B838]"
                />
                <span className="text-[10px] text-[#8FA597] font-mono">Dine-in</span>
              </div>
            </div>

              {/* Item List */}
              <div className="flex-1 overflow-y-auto p-5 space-y-3">
                {items.length === 0 ? (
                  <div className="py-16 text-center space-y-3">
                    <div className="w-12 h-12 rounded-full bg-[#071E13] text-[#8FA597] border border-[#16422E] flex items-center justify-center mx-auto">
                      <Coffee className="w-6 h-6 text-[#F4B838]" />
                    </div>
                    <h4 className="text-lg font-editorial font-bold text-white">Your tray is empty</h4>
                    <p className="text-xs text-[#CAD4CD] max-w-xs mx-auto">
                      Browse the digital menu and tap "+ Add" to assemble your table order.
                    </p>
                  </div>
                ) : (
                  items.map(({ item, quantity }) => {
                    const nameMatch = item.name.match(/^(.*?)\s*\((.*?)\)$/);
                    const amharicName = nameMatch ? nameMatch[1].trim() : null;
                    const mainTitle = nameMatch ? nameMatch[2].trim() : item.name;

                    return (
                      <div 
                        key={item.id}
                        className="bg-[#071E13] p-4 rounded-xl border border-[#16422E] flex items-center justify-between gap-3 shadow-xs"
                      >
                        <div className="flex-1 min-w-0">
                          {amharicName && (
                            <span className="text-[10px] text-[#8FA597] font-sans block truncate">
                              {amharicName}
                            </span>
                          )}
                          <h4 className="text-sm font-editorial font-bold text-white truncate">
                            {mainTitle}
                          </h4>
                          <span className="font-mono text-xs text-[#F4B838]">
                            {item.price} {cafeInfo.currencySymbol} each
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <div className="flex items-center bg-[#0B281B] rounded-lg border border-[#16422E] p-0.5">
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(item.id, -1)}
                              className="w-6 h-6 flex items-center justify-center text-[#8FA597] hover:text-white rounded"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-6 text-center font-mono text-xs font-bold text-white">
                              {quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(item.id, 1)}
                              className="w-6 h-6 flex items-center justify-center text-[#8FA597] hover:text-white rounded"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() => onRemoveItem(item.id)}
                            className="w-7 h-7 flex items-center justify-center text-[#8FA597] hover:text-red-400 rounded-lg hover:bg-[#16422E] transition-colors"
                            title="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}

                {/* Special Instructions */}
                {items.length > 0 && (
                  <div className="pt-2">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#8FA597] block mb-1">
                      Barista Instructions (Optional):
                    </label>
                    <input
                      type="text"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="e.g. Oat milk, extra hot, no cinnamon..."
                      className="w-full px-3 py-2 bg-[#071E13] text-xs text-white rounded-xl border border-[#16422E] focus:outline-hidden focus:border-[#F4B838] placeholder-[#6E887B]"
                    />
                  </div>
                )}
              </div>

              {/* Bottom Totals & Place Order */}
              {items.length > 0 && (
                <div className="p-5 bg-[#071E13] border-t border-[#16422E] space-y-3">
                  <div className="space-y-1.5 text-xs text-[#CAD4CD]">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span className="font-mono text-white">{subtotal} {cafeInfo.currencySymbol}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Est. Tax (8%):</span>
                      <span className="font-mono text-white">{Math.round(estimatedTax)} {cafeInfo.currencySymbol}</span>
                    </div>
                    <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-[#16422E]">
                      <span>Total:</span>
                      <span className="font-mono text-[#F4B838]">{Math.round(total)} {cafeInfo.currencySymbol}</span>
                    </div>
                  </div>

                <div className="flex gap-2 pt-1">
                  <button
                    type="button"
                    onClick={onClearOrder}
                    className="px-3 py-3 bg-[#0B281B] hover:bg-[#123827] text-[#8FA597] hover:text-white rounded-xl text-xs font-bold uppercase transition-colors border border-[#16422E]"
                  >
                    Clear
                  </button>
                  <button
                    type="button"
                    onClick={handlePlaceOrder}
                    className="flex-1 py-3 bg-[#F4B838] hover:bg-[#E4A82B] text-black font-bold text-xs uppercase tracking-[0.2em] rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
                  >
                    <span>Generate Table Ticket</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
