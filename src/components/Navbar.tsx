import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Heart, User, Menu, X, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useShop } from '../ShopContext';
import { SITE_INFO } from '../constants';
import { cn } from '../lib/utils';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cart, wishlist } = useShop();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'SHOP', path: '/shop' },
    { name: 'ABOUT', path: '/about' },
    { name: 'CONTACT', path: '/contact' },
  ];

  const isHomePage = location.pathname === '/';
  const shouldBeLight = !isScrolled && isHomePage;

  return (
    <nav className={cn(
      "fixed top-0 left-0 w-full z-50 transition-all duration-300 px-6 py-4",
      shouldBeLight 
        ? "bg-transparent text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]" 
        : "bg-white/80 backdrop-blur-md py-3 shadow-sm text-black"
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Mobile Menu Toggle */}
        <button 
          className="lg:hidden p-2"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <Menu className="w-6 h-6" strokeWidth={2.5} />
        </button>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center space-x-8 text-xs font-medium tracking-[0.2em]">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path}
              className={cn(
                "hover:opacity-60 transition-opacity",
                location.pathname === link.path && "border-b border-current"
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Logo */}
        <Link to="/" className="text-2xl font-display font-bold tracking-tighter absolute left-1/2 -translate-x-1/2">
          {SITE_INFO.name}
        </Link>

        {/* Actions */}
        <div className="flex items-center space-x-5">
          <button className="hidden sm:block p-2 hover:opacity-60 transition-opacity">
            <Search className="w-5 h-5" strokeWidth={2.5} />
          </button>
          <Link to="/login" className="p-2 hover:opacity-60 transition-opacity">
            <User className="w-5 h-5" strokeWidth={2.5} />
          </Link>
          <Link to="/shop" className="relative p-2 hover:opacity-60 transition-opacity">
            <Heart className="w-5 h-5" strokeWidth={2.5} />
            {wishlist.length > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 bg-black text-white text-[10px] rounded-full flex items-center justify-center font-bold">
                {wishlist.length}
              </span>
            )}
          </Link>
          <Link to="/cart" className="relative p-2 hover:opacity-60 transition-opacity">
            <ShoppingBag className="w-5 h-5" strokeWidth={2.5} />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 bg-black text-white text-[10px] rounded-full flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 z-[60]"
            />
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 h-full w-full max-w-sm bg-white z-[70] p-8 text-black"
            >
              <div className="flex justify-between items-center mb-12">
                <span className="text-xl font-display font-bold tracking-tighter">{SITE_INFO.name}</span>
                <button onClick={() => setIsMobileMenuOpen(false)}><X className="w-6 h-6" strokeWidth={2.5} /></button>
              </div>
              <div className="flex flex-col space-y-8 text-2xl font-display font-medium">
                {navLinks.map((link) => (
                  <Link 
                    key={link.name} 
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="hover:translate-x-2 transition-transform"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
