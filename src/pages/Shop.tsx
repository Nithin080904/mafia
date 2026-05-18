import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Filter, SlidersHorizontal, X } from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '../constants';
import ProductCard from '../components/ProductCard';
import { cn } from '../lib/utils';

export default function Shop() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];
    
    if (selectedCategory !== 'All') {
      result = result.filter(p => p.category === selectedCategory);
    }

    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    }
    
    return result;
  }, [selectedCategory, sortBy]);

  return (
    <div className="pt-32 pb-24 px-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
          <div>
            <h1 className="text-5xl font-display font-bold tracking-tighter mb-4">SHOP ALL</h1>
            <p className="text-gray-500 font-light text-sm max-w-md">Our complete collection of luxury essentials. Crafted with precision and designed for longevity.</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center space-x-2 text-xs font-bold tracking-widest border border-black/10 px-6 py-3 hover:bg-black hover:text-white transition-all uppercase"
            >
              <Filter className="w-4 h-4" />
              <span>Filters</span>
            </button>
            <div className="relative">
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white border border-black/10 px-6 py-3 text-xs font-bold tracking-widest focus:outline-none focus:border-black cursor-pointer pr-10 uppercase"
              >
                <option value="newest">Newest Arrivals</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
              <SlidersHorizontal className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Filter Bar (Desktop) */}
        <div className="flex flex-wrap gap-4 mb-12 overflow-x-auto pb-4">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                "px-8 py-2 text-[10px] font-bold tracking-[0.2em] transition-all uppercase border",
                selectedCategory === cat 
                  ? "bg-black text-white border-black" 
                  : "bg-white text-black border-black/10 hover:border-black"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </AnimatePresence>
        </div>

        {filteredProducts.length === 0 && (
          <div className="py-32 text-center">
            <p className="text-gray-400 font-light italic">No pieces found matching your selection.</p>
            <button 
              onClick={() => setSelectedCategory('All')}
              className="mt-6 text-xs font-bold tracking-widest underline underline-offset-4"
            >
              RESET FILTERS
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
