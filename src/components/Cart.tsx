import React from 'react';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { CartItem } from '../types';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (bookId: string, quantity: number) => void;
  onRemoveItem: (bookId: string) => void;
  onProceedToCheckout: () => void;
  totalPrice: number;
}

export const Cart: React.FC<CartProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  totalPrice
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex justify-end">
      <div className="bg-white/95 backdrop-blur-md w-full max-w-md h-full overflow-y-auto border-l border-slate-200">
        <div className="p-6 border-b border-slate-200 bg-white/80 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-serif font-bold text-slate-800 flex items-center gap-3">
              <ShoppingBag className="w-6 h-6 text-amber-600" />
              Your Collection
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-slate-600" />
            </button>
          </div>
        </div>

        <div className="p-6">
          {cartItems.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingBag className="w-20 h-20 text-slate-300 mx-auto mb-6" />
              <p className="text-slate-500 text-lg font-medium">Your collection is empty</p>
              <p className="text-slate-400 text-sm mt-2">Discover exceptional books to add</p>
            </div>
          ) : (
            <>
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-slate-200/50">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-16 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif font-semibold text-slate-800 truncate">
                        {item.title}
                      </h4>
                      <p className="text-sm text-slate-500 mb-3">
                        by {item.author}
                      </p>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="p-1.5 hover:bg-slate-200 rounded-lg transition-colors"
                        >
                          <Minus className="w-4 h-4 text-slate-600" />
                        </button>
                        <span className="w-8 text-center font-semibold text-slate-700">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="p-1.5 hover:bg-slate-200 rounded-lg transition-colors"
                        >
                          <Plus className="w-4 h-4 text-slate-600" />
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-slate-800 mb-2">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-slate-200 pt-6 bg-white/60 backdrop-blur-sm rounded-xl p-4">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-lg font-serif font-semibold text-slate-700">Total:</span>
                  <span className="text-2xl font-bold text-slate-800">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
                <button
                  onClick={onProceedToCheckout}
                  className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-semibold py-3 rounded-xl transition-all duration-200 shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40"
                >
                  Proceed to Checkout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};