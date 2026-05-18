import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from './constants';

interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
}

interface ShopContextType {
  cart: CartItem[];
  wishlist: string[];
  addToCart: (product: Product, size: string) => void;
  updateCartItemSize: (productId: string, oldSize: string, newSize: string) => void;
  updateCartItemQuantity: (productId: string, size: string, delta: number) => void;
  removeFromCart: (productId: string, size: string) => void;
  toggleWishlist: (productId: string) => void;
  clearCart: () => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('mafiya_cart');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('mafiya_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('mafiya_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('mafiya_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToCart = (product: Product, size: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id && item.selectedSize === size);
      if (existing) {
        return prev.map(item => 
          item.id === product.id && item.selectedSize === size 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, { ...product, quantity: 1, selectedSize: size }];
    });
  };

  const updateCartItemSize = (productId: string, oldSize: string, newSize: string) => {
    setCart(prev => {
      // Find the item being changed
      const itemToChange = prev.find(item => item.id === productId && item.selectedSize === oldSize);
      if (!itemToChange) return prev;

      // Check if an item with the new size already exists
      const existingWithNewSize = prev.find(item => item.id === productId && item.selectedSize === newSize);

      if (existingWithNewSize) {
        // Merge them
        return prev.filter(item => 
          !(item.id === productId && item.selectedSize === oldSize)
        ).map(item => 
          item.id === productId && item.selectedSize === newSize
            ? { ...item, quantity: item.quantity + itemToChange.quantity }
            : item
        );
      } else {
        // Just change the size
        return prev.map(item =>
          item.id === productId && item.selectedSize === oldSize
            ? { ...item, selectedSize: newSize }
            : item
        );
      }
    });
  };

  const updateCartItemQuantity = (productId: string, size: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === productId && item.selectedSize === size) {
        const newQuantity = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  const removeFromCart = (productId: string, size: string) => {
    setCart(prev => prev.filter(item => !(item.id === productId && item.selectedSize === size)));
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId) 
        : [...prev, productId]
    );
  };

  const clearCart = () => setCart([]);

  return (
    <ShopContext.Provider value={{ 
      cart, 
      wishlist, 
      addToCart, 
      updateCartItemSize,
      updateCartItemQuantity,
      removeFromCart, 
      toggleWishlist, 
      clearCart 
    }}>
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) throw new Error('useShop must be used within ShopProvider');
  return context;
};
