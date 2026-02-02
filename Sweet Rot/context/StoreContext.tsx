import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Product, CartItem } from '../types';

interface StoreContextType {
  // UI State
  isMenuOpen: boolean;
  toggleMenu: () => void;
  closeMenu: () => void;
  
  isCartOpen: boolean;
  toggleCart: () => void;
  closeCart: () => void;
  
  isWishlistOpen: boolean;
  toggleWishlist: () => void;
  closeWishlist: () => void;

  isProfileOpen: boolean;
  toggleProfile: () => void;
  closeProfile: () => void;

  // Auth State
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;

  // Cart Logic
  cart: CartItem[];
  addToCart: (product: Product, size: string) => void;
  removeFromCart: (cartId: string) => void;
  updateQuantity: (cartId: string, delta: number) => void;
  cartTotal: number;
  cartCount: number;

  // Wishlist Logic
  wishlist: Product[];
  toggleWishlistItem: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // UI States
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  // Auth State
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Data States
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);

  // Toggle Handlers
  const toggleMenu = () => setIsMenuOpen(prev => !prev);
  const closeMenu = () => setIsMenuOpen(false);
  
  const toggleCart = () => setIsCartOpen(prev => !prev);
  const closeCart = () => setIsCartOpen(false);

  const toggleWishlist = () => setIsWishlistOpen(prev => !prev);
  const closeWishlist = () => setIsWishlistOpen(false);

  const toggleProfile = () => setIsProfileOpen(prev => !prev);
  const closeProfile = () => setIsProfileOpen(false);

  // Auth Handlers
  const login = () => setIsLoggedIn(true);
  const logout = () => setIsLoggedIn(false);

  // Cart Logic
  const addToCart = (product: Product, size: string) => {
    setCart(prev => {
      const existingItem = prev.find(item => item.id === product.id && item.selectedSize === size);
      if (existingItem) {
        return prev.map(item => 
          item.cartId === existingItem.cartId 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, { ...product, selectedSize: size, quantity: 1, cartId: `${product.id}-${size}` }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (cartId: string) => {
    setCart(prev => prev.filter(item => item.cartId !== cartId));
  };

  const updateQuantity = (cartId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.cartId === cartId) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  // Wishlist Logic
  const toggleWishlistItem = (product: Product) => {
    setWishlist(prev => {
      const exists = prev.find(p => p.id === product.id);
      if (exists) {
        return prev.filter(p => p.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some(p => p.id === productId);
  };

  return (
    <StoreContext.Provider value={{
      isMenuOpen, toggleMenu, closeMenu,
      isCartOpen, toggleCart, closeCart,
      isWishlistOpen, toggleWishlist, closeWishlist,
      isProfileOpen, toggleProfile, closeProfile,
      isLoggedIn, login, logout,
      cart, addToCart, removeFromCart, updateQuantity, cartTotal, cartCount,
      wishlist, toggleWishlistItem, isInWishlist
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used within StoreProvider');
  return context;
};