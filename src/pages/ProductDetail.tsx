import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Heart, ShoppingBag, ArrowLeft, Truck, ShieldCheck, RefreshCw } from 'lucide-react';
import { PRODUCTS } from '../constants';
import { useShop } from '../ShopContext';
import { formatPrice, cn } from '../lib/utils';
import ProductCard from '../components/ProductCard';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, wishlist, toggleWishlist } = useShop();
  const product = PRODUCTS.find(p => p.id === id);
  const [selectedSize, setSelectedSize] = useState('');
  const [activeImage, setActiveImage] = useState(0);

  if (!product) return <div className="pt-40 text-center">Product not found.</div>;

  const isInWishlist = wishlist.includes(product.id);
  const relatedProducts = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center space-x-2 text-xs font-bold tracking-widest hover:opacity-60 mb-12 transition-opacity"
      >
        <ArrowLeft className="w-4 h-4" strokeWidth={2.5} />
        <span>BACK TO COLLECTION</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-32">
        {/* Images */}
        <div className="lg:col-span-7 flex flex-col md:flex-row gap-4">
          <div className="flex md:flex-col gap-4 w-full md:w-24 overflow-x-auto md:overflow-y-auto no-scrollbar order-2 md:order-1">
            {product.images.map((img, idx) => (
              <button 
                key={idx} 
                onClick={() => setActiveImage(idx)}
                className={cn(
                  "aspect-[3/4] w-20 md:w-full shrink-0 overflow-hidden border transition-all",
                  activeImage === idx ? "border-black" : "border-transparent opacity-50 hover:opacity-100"
                )}
              >
                <img src={img} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
          <motion.div 
            key={activeImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="flex-grow aspect-[3/4] overflow-hidden bg-gray-50 order-1 md:order-2"
          >
            <img src={product.images[activeImage]} className="w-full h-full object-cover" />
          </motion.div>
        </div>

        {/* Info */}
        <div className="lg:col-span-5 space-y-10">
          <div>
            <p className="text-xs font-bold tracking-[0.4em] text-gray-400 mb-4">{product.category.toUpperCase()}</p>
            <h1 className="text-5xl font-display font-bold tracking-tighter mb-4">{product.name}</h1>
            <p className="text-2xl font-display font-light">{formatPrice(product.price)}</p>
          </div>

          <p className="text-gray-600 font-light leading-relaxed">{product.description}</p>

          {/* Size Selection */}
          <div className="space-y-4">
            <div className="flex justify-between items-center text-xs font-bold tracking-widest">
              <span>SELECT SIZE</span>
              <button className="text-gray-400 hover:text-black transition-colors underline">SIZE GUIDE</button>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.sizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={cn(
                    "py-4 text-xs font-bold transition-all border",
                    selectedSize === size 
                      ? "bg-black text-white border-black" 
                      : "bg-white text-black border-black/10 hover:border-black"
                  )}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col space-y-4">
            <div className="flex space-x-4">
              <button 
                onClick={() => selectedSize ? addToCart(product, selectedSize) : alert('Please select a size')}
                className="flex-grow bg-black text-white font-bold tracking-widest py-5 px-8 hover:bg-zinc-800 transition-colors flex items-center justify-center space-x-4 group uppercase"
              >
                <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" strokeWidth={2.5} />
                <span>Add to Bag</span>
              </button>
              <button 
                onClick={() => toggleWishlist(product.id)}
                className={cn(
                  "p-5 transition-all border",
                  isInWishlist ? "bg-black border-black text-white" : "border-black/10 hover:border-black"
                )}
              >
                <Heart className={cn("w-6 h-6", isInWishlist && "fill-current")} strokeWidth={2.5} />
              </button>
            </div>
            <button 
              onClick={() => {
                if(selectedSize) {
                  addToCart(product, selectedSize);
                  navigate('/checkout');
                } else {
                  alert('Please select a size');
                }
              }}
              className="w-full border border-black text-black font-bold tracking-[0.2em] py-5 px-8 hover:bg-black hover:text-white transition-all uppercase"
            >
              Order Now
            </button>
          </div>

          {/* Benefits */}
          <div className="pt-10 border-t border-gray-100 space-y-6">
            <div className="flex items-center space-x-4">
              <Truck className="w-5 h-5 text-gray-700" strokeWidth={2.5} />
              <p className="text-xs font-medium tracking-wide">COMPLIMENTARY WORLDWIDE SHIPPING</p>
            </div>
            <div className="flex items-center space-x-4">
              <ShieldCheck className="w-5 h-5 text-gray-700" strokeWidth={2.5} />
              <p className="text-xs font-medium tracking-wide">SECURE CHECKOUT & AUTHENTICITY GUARANTEE</p>
            </div>
            <div className="flex items-center space-x-4">
              <RefreshCw className="w-5 h-5 text-gray-700" strokeWidth={2.5} />
              <p className="text-xs font-medium tracking-wide">14-DAY LUXURY CONCIERGE RETURNS</p>
            </div>
          </div>
        </div>
      </div>

      {/* Suggested */}
      <section className="pt-24 border-t border-gray-100">
        <h2 className="text-3xl font-display font-bold tracking-tighter mb-12">COMPLEMENT YOUR LOOK</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {relatedProducts.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
