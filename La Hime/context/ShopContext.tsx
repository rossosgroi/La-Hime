import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Product } from '../types';

export interface CartItem extends Product {
  size: string;
  quantity: number;
}

export interface Address {
  street: string;
  city: string;
  zipCode: string;
  country: string;
}

export interface User {
  email: string;
  firstName?: string;
  lastName?: string;
  address?: Address; 
}

interface ShopContextType {
  cart: CartItem[];
  wishlist: Product[];
  isAuthenticated: boolean;
  user: User | null;
  currency: string;
  addToCart: (product: Product, size: string) => void;
  removeFromCart: (productId: number, size: string) => void;
  updateQuantity: (productId: number, size: string, delta: number) => void;
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: number) => boolean;
  login: (userData: User) => void;
  logout: () => void;
  updateUser: (data: Partial<User>) => void;
  setCurrency: (currency: string) => void;
  formatPrice: (price: number) => string;     // Converted Price (for totals)
  formatBasePrice: (price: number) => string; // Base Price (EUR, for items)
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  
  // Currency State - Default to EUR
  const [currency, setCurrencyState] = useState('EUR');
  // Default rates relative to 1 EUR
  const [exchangeRates, setExchangeRates] = useState<Record<string, number>>({ 
    EUR: 1, 
    USD: 1.09, 
    GBP: 0.85, 
    JPY: 163.0, 
    CNY: 7.8 
  });

  // Load from local storage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    const savedWishlist = localStorage.getItem('wishlist');
    const savedAuth = localStorage.getItem('isAuthenticated');
    const savedUser = localStorage.getItem('user');
    const savedCurrency = localStorage.getItem('currency');
    
    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
    if (savedAuth) setIsAuthenticated(JSON.parse(savedAuth));
    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedCurrency) setCurrencyState(savedCurrency);

    // Fetch live rates relative to EUR
    fetch('https://api.exchangerate-api.com/v4/latest/EUR')
      .then(res => res.json())
      .then(data => {
        if (data && data.rates) {
          setExchangeRates(prev => ({ ...prev, ...data.rates }));
        }
      })
      .catch(err => console.error("Failed to fetch rates, using fallbacks", err));
  }, []);

  // Save to local storage on change
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated));
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('currency', currency);
  }, [cart, wishlist, isAuthenticated, user, currency]);

  const addToCart = (product: Product, size: string) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id && item.size === size);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, size, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number, size: string) => {
    setCart((prev) => prev.filter((item) => !(item.id === productId && item.size === size)));
  };

  const updateQuantity = (productId: number, size: string, delta: number) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === productId && item.size === size) {
          const newQuantity = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const toggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.filter((item) => item.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const isInWishlist = (productId: number) => {
    return wishlist.some((item) => item.id === productId);
  };

  const login = (userData: User) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  const updateUser = (data: Partial<User>) => {
    setUser((prev) => prev ? { ...prev, ...data } : null);
  }

  const setCurrency = (c: string) => {
    setCurrencyState(c);
  }

  // Returns formatted string in selected currency
  const formatPrice = (price: number) => {
    const rate = exchangeRates[currency] || 1;
    const convertedPrice = price * rate;
    
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      maximumFractionDigits: 2
    }).format(convertedPrice);
  }

  // Returns formatted string in EUR always
  const formatBasePrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 2
    }).format(price);
  }

  return (
    <ShopContext.Provider
      value={{
        cart,
        wishlist,
        isAuthenticated,
        user,
        currency,
        addToCart,
        removeFromCart,
        updateQuantity,
        toggleWishlist,
        isInWishlist,
        login,
        logout,
        updateUser,
        setCurrency,
        formatPrice,
        formatBasePrice
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};