import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag } from 'lucide-react';
import { motion } from 'motion/react';
import { Product } from '../constants';
import { useShop } from '../ShopContext';
import { formatPrice } from '../lib/utils';
import { cn } from '../lib/utils';

interface ProductCardProps {
  product: Product;
  key?: React.Key;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { wishlist, toggleWishlist, addToCart } = useShop();
  const isWishlisted = wishlist.includes(product.id);

  const [showSizes, setShowSizes] = React.useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative"
      onMouseLeave={() => setShowSizes(false)}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
        <Link to={`/product/${product.id}`}>
          <img 
            src={product.images[0]} 
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </Link>
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col space-y-2">
          {product.newArrival && (
            <span className="bg-black text-white text-[10px] font-bold px-2 py-1 tracking-widest">NEW</span>
          )}
          {product.trending && (
            <span className="bg-white text-black text-[10px] font-bold px-2 py-1 tracking-widest shadow-sm">TRENDING</span>
          )}
        </div>

        {/* Quick Actions */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-8 px-4 space-x-2">
          {showSizes ? (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full bg-white p-2 grid grid-cols-3 gap-1 shadow-2xl"
            >
              {product.sizes.map(size => (
                <button
                  key={size}
                  onClick={(e) => {
                    e.preventDefault();
                    addToCart(product, size);
                    setShowSizes(false);
                  }}
                  className="py-2 text-[10px] font-bold border border-transparent hover:border-black transition-all"
                >
                  {size}
                </button>
              ))}
              <button 
                onClick={() => setShowSizes(false)}
                className="col-span-3 py-1 text-[8px] font-bold text-gray-400 hover:text-black uppercase tracking-widest border-t border-gray-100 mt-1"
              >
                Cancel
              </button>
            </motion.div>
          ) : (
            <>
              <button 
                onClick={() => toggleWishlist(product.id)}
                className={cn(
                  "p-3 rounded-full transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 shadow-lg",
                  isWishlisted ? "bg-black text-white" : "bg-white text-black hover:bg-black hover:text-white"
                )}
              >
                <Heart className={cn("w-5 h-5", isWishlisted && "fill-current")} strokeWidth={2.5} />
              </button>
              <button 
                onClick={() => setShowSizes(true)}
                className="flex-grow bg-white text-black text-xs font-bold py-3 px-6 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-black hover:text-white shadow-lg tracking-widest"
              >
                QUICK ADD
              </button>
            </>
          )}
        </div>
      </div>

      <div className="mt-4 flex justify-between items-start">
        <div>
          <h3 className="text-xs font-bold tracking-widest leading-relaxed">
            <Link to={`/product/${product.id}`} className="hover:opacity-60 transition-opacity">
              {product.name}
            </Link>
          </h3>
          <p className="text-[10px] text-gray-500 font-medium tracking-wider mt-1">{product.category}</p>
        </div>
        <p className="text-sm font-display font-medium">{formatPrice(product.price)}</p>
      </div>
    </motion.div>
  );
}
