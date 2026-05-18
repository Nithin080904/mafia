import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight, Star } from 'lucide-react';
import { PRODUCTS, SITE_INFO } from '../constants';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const trendingProducts = PRODUCTS.filter(p => p.trending).slice(0, 4);
  const newArrivals = PRODUCTS.filter(p => p.newArrival).slice(0, 4);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.6 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <img 
            src="/src/assets/images/luxury_streetwear_hero_1779099203489.png" 
            alt="Mafiya Luxury Streetwear" 
            className="w-full h-full object-cover"
          />
        </motion.div>
        
        <div className="relative z-10 text-center px-6">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-white text-xs font-bold tracking-[0.6em] mb-6"
          >
            {SITE_INFO.tagline}
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-white text-6xl md:text-8xl font-display font-bold tracking-tighter mb-10 leading-none"
          >
            ELEVATE <br /> YOUR AURA
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <Link 
              to="/shop" 
              className="inline-flex items-center space-x-4 bg-white text-black px-10 py-5 text-sm font-bold tracking-widest hover:bg-transparent hover:text-white border border-white transition-all group"
            >
              <span>DISCOVER COLLECTION</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" strokeWidth={2.5} />
            </Link>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/40 flex flex-col items-center"
        >
          <span className="text-[10px] font-bold tracking-widest mb-2">SCROLL</span>
          <div className="w-[1px] h-12 bg-white/40" />
        </motion.div>
      </section>

      {/* Featured Collection Banner */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <span className="text-xs font-bold tracking-[0.4em] text-gray-400">LIMITED EDITION</span>
            <h2 className="text-5xl font-display font-bold tracking-tighter">THE MAFIYA <br />SIGNATURE</h2>
            <p className="text-gray-600 font-light max-w-sm leading-relaxed">
              Crafted for those who lead, never follow. Our latest collection blends classic silhouettes with contemporary street aesthetics.
            </p>
            <Link to="/shop" className="inline-flex items-center space-x-2 text-xs font-bold tracking-widest border-b border-black pb-2 hover:opacity-60 transition-opacity">
              <span>EXPLORE SERIES</span>
              <ChevronRight className="w-4 h-4" strokeWidth={2.5} />
            </Link>
          </motion.div>
          <motion.div 
             initial={{ opacity: 0, scale: 0.9 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             className="relative aspect-square bg-gray-100 overflow-hidden"
          >
            <img 
              src="https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=1000&auto=format&fit=crop" 
              alt="Monolith Series" 
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Trending Products */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-16">
            <div>
              <span className="text-xs font-bold tracking-[0.4em] text-gray-400">HOT NOW</span>
              <h2 className="text-4xl font-display font-bold tracking-tighter mt-4">TRENDING PIECES</h2>
            </div>
            <Link to="/shop" className="text-xs font-bold tracking-widest hover:opacity-60 transition-opacity underline underline-offset-4">VIEW ALL</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {trendingProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Brand Values */}
      <section className="py-32 px-6 border-y border-gray-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
          <div className="space-y-4">
            <h3 className="text-xs font-bold tracking-widest">UNCOMPROMISING QUALITY</h3>
            <p className="text-sm text-gray-500 font-light">Every stitch tells a story of perfection. Only the finest materials, sourced globally.</p>
          </div>
          <div className="space-y-4">
            <h3 className="text-xs font-bold tracking-widest">SUSTAINABLE LUXURY</h3>
            <p className="text-sm text-gray-500 font-light">Committed to low-impact manufacturing and ethical production standards.</p>
          </div>
          <div className="space-y-4">
            <h3 className="text-xs font-bold tracking-widest">GLOBAL PHILOSOPHY</h3>
            <p className="text-sm text-gray-500 font-light">Designed in Milan, inspired by the streets of Tokyo, London, and NYC.</p>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-display font-bold tracking-tighter text-center mb-16">THE WORLD OF MAFIYA</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white p-10 border border-gray-100 shadow-sm space-y-6">
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-4 h-4 fill-black text-black" strokeWidth={2.5} />)}
                </div>
                <p className="text-gray-600 font-light italic text-sm leading-relaxed">
                  "The quality of the craftsmanship is beyond anything I've owned before. MAFIYA is truly redefining modern luxury streetwear."
                </p>
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gray-200 rounded-full" />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest">Julian V.</p>
                    <p className="text-[10px] text-gray-400">Verified Client</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
