import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useShop } from '../ShopContext';
import { formatPrice, cn } from '../lib/utils';

export default function Cart() {
  const { cart, removeFromCart, updateCartItemQuantity, updateCartItemSize, clearCart } = useShop();
  const [editingSize, setEditingSize] = useState<{ id: string, size: string } | null>(null);

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const total = subtotal;

  if (cart.length === 0) {
    return (
      <div className="pt-48 pb-32 px-6 text-center">
        <div className="flex justify-center mb-8">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center">
            <ShoppingBag className="w-8 h-8 text-gray-300" />
          </div>
        </div>
        <h1 className="text-4xl font-display font-bold tracking-tighter mb-4">YOUR BAG IS EMPTY</h1>
        <p className="text-gray-500 font-light mb-10">Seems like you haven't added any luxury pieces yet.</p>
        <Link 
          to="/shop" 
          className="inline-block bg-black text-white px-10 py-4 text-xs font-bold tracking-widest hover:bg-zinc-800 transition-colors"
        >
          START SHOPPING
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
      <h1 className="text-5xl font-display font-bold tracking-tighter mb-16">YOUR BAG</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Items List */}
        <div className="lg:col-span-8 space-y-8">
          {cart.map((item) => (
            <motion.div 
              layout
              key={`${item.id}-${item.selectedSize}`} 
              className="flex gap-6 pb-8 border-b border-gray-100"
            >
              <div className="w-32 aspect-[3/4] overflow-hidden bg-gray-50">
                <img src={item.images[0]} className="w-full h-full object-cover" />
              </div>
              
              <div className="flex-grow flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start">
                    <h3 className="text-sm font-bold tracking-widest uppercase">{item.name}</h3>
                    <button 
                      onClick={() => removeFromCart(item.id, item.selectedSize)}
                      className="text-gray-300 hover:text-black transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="relative mt-2">
                    {editingSize?.id === item.id && editingSize?.size === item.selectedSize ? (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {item.sizes.map(size => (
                          <button
                            key={size}
                            onClick={() => {
                              updateCartItemSize(item.id, item.selectedSize, size);
                              setEditingSize(null);
                            }}
                            className={cn(
                              "px-3 py-1 text-[10px] font-bold border transition-all",
                              item.selectedSize === size 
                                ? "bg-black text-white border-black" 
                                : "bg-white text-black border-black/10 hover:border-black"
                            )}
                          >
                            {size}
                          </button>
                        ))}
                        <button 
                          onClick={() => setEditingSize(null)}
                          className="p-1 text-gray-400 hover:text-black"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ) : (
                      <button 
                        onClick={() => setEditingSize({ id: item.id, size: item.selectedSize })}
                        className="flex items-center space-x-1 group"
                      >
                        <span className="text-[10px] text-gray-400 font-bold tracking-widest uppercase">SIZE: {item.selectedSize}</span>
                        <ChevronDown className="w-3 h-3 text-gray-300 group-hover:text-black transition-colors" />
                        <span className="text-[8px] text-zinc-300 font-bold tracking-widest opacity-0 group-hover:opacity-100 transition-opacity uppercase">EDIT</span>
                      </button>
                    )}
                  </div>
                </div>
                
                <div className="flex justify-between items-end">
                  <div className="flex items-center space-x-4 border px-4 py-2">
                    <button 
                      onClick={() => updateCartItemQuantity(item.id, item.selectedSize, -1)}
                      className="hover:opacity-60"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                    <button 
                      onClick={() => updateCartItemQuantity(item.id, item.selectedSize, 1)}
                      className="hover:opacity-60"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-sm font-display font-medium">{formatPrice(item.price * item.quantity)}</p>
                </div>
              </div>
            </motion.div>
          ))}
          
          <button 
            onClick={clearCart}
            className="text-[10px] font-bold tracking-widest text-gray-400 hover:text-black transition-colors"
          >
            CLEAR SHOPPING BAG
          </button>
        </div>

        {/* Summary */}
        <div className="lg:col-span-4">
          <div className="bg-gray-50 p-10 sticky top-32">
            <h2 className="text-xl font-display font-bold tracking-tighter mb-8">ORDER SUMMARY</h2>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 font-light tracking-wide">SUBTOTAL</span>
                <span className="font-medium">{formatPrice(subtotal)}</span>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6 mb-10 flex justify-between items-center text-xl font-display font-bold">
              <span>TOTAL</span>
              <span>{formatPrice(total)}</span>
            </div>

            <Link 
              to="/checkout"
              className="w-full bg-black text-white py-5 text-xs font-bold tracking-[0.2em] hover:bg-zinc-800 transition-colors flex items-center justify-center space-x-4 uppercase"
            >
              <span>SECURE CHECKOUT</span>
              <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
            </Link>
            <p className="mt-8 text-[10px] text-center text-gray-400 leading-relaxed uppercase tracking-widest">
              COMPLIMENTARY TAXES & CUSTOMS DUTIES INCLUDED
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
