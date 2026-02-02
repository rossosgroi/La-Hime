import React, { useState, useEffect, useRef } from 'react';
import { ShoppingBag, Search, Menu, X, Heart, Sparkles, User } from 'lucide-react';
import { NavItem } from '../types';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { PRODUCTS } from '../constants';
import { useShop } from '../context/ShopContext';

const navItems: NavItem[] = [
  { label: 'Home', path: '/' },
  { label: 'New Arrivals', path: '/shop?collection=new-arrivals' },
  { label: 'Shop', path: '/shop' },
  { label: 'About', path: '/about' },
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null); // For delayed close
  const location = useLocation();
  const { cart, wishlist, isAuthenticated } = useShop();

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsSidebarOpen(false);
    setIsSearchOpen(false);
    setSearchQuery('');
  }, [location]);

  useEffect(() => {
    if (isSearchOpen) {
        setIsSidebarOpen(false);
        const timer = setTimeout(() => {
            searchInputRef.current?.focus();
        }, 300);
        return () => clearTimeout(timer);
    }
  }, [isSearchOpen]);

  const searchResults = searchQuery.length > 0 
    ? PRODUCTS.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];


  // Interaction Handlers
  const keepSearchOpen = () => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
      searchTimeoutRef.current = null;
    }
    setIsSearchOpen(true);
  };

  const closeSearchDelayed = () => {
    searchTimeoutRef.current = setTimeout(() => {
      // Check if input is focused
      const isFocused = document.activeElement === searchInputRef.current;
      
      // Keep open ONLY if focused AND has content
      // If user hasn't typed anything, we close it even if focused (e.g. they hovered, it autofocused, they left)
      if (isFocused && searchQuery.length > 0) {
          return;
      }
      setIsSearchOpen(false);
    }, 200);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
          isScrolled
            ? 'bg-white/80 backdrop-blur-md border-b border-pink-100 py-2 shadow-sm'
            : 'bg-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center relative h-14">
          
          {/* LEFT: Sidebar Trigger */}
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 text-black hover:text-pink-600 transition-colors bg-transparent relative z-20"
            aria-label="Open Menu"
          >
            <Menu size={28} strokeWidth={2} />
          </button>

          {/* CENTER: SVG Text Logo + Crown trace on hover */}
          <Link 
            to="/" 
            className={`absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center transition-all duration-300 z-30 ${isSearchOpen && window.innerWidth < 768 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
          >
             <div className="relative flex flex-col items-center group cursor-pointer">
                <img
                  src="/logo/logo.png"
                  alt="La Hime"
                  className="w-[120px] h-auto transition-transform duration-300 group-hover:scale-105"
                />
             </div>
          </Link>

          {/* RIGHT: Icons & Search Bar */}
          <div className="flex items-center justify-end relative z-20 gap-1 md:gap-2">
            
            {/* Hover Search Container */}
            <div 
                className="relative flex items-center"
                onMouseEnter={keepSearchOpen}
                onMouseLeave={closeSearchDelayed}
            >
                {/* Sliding Search Bar - Expands to Left */}
                <AnimatePresence>
                    {isSearchOpen && (
                        <motion.div 
                            initial={{ width: 0, opacity: 0, x: 20 }}
                            animate={{ width: 'auto', opacity: 1, x: 0 }}
                            exit={{ width: 0, opacity: 0, x: 20 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="absolute right-full mr-2 flex items-center bg-white rounded-full border border-pink-200 shadow-sm overflow-hidden h-10 whitespace-nowrap"
                        >
                            <input
                                ref={searchInputRef}
                                type="text"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onFocus={keepSearchOpen}
                                onBlur={closeSearchDelayed}
                                className="w-[160px] md:w-[240px] px-4 py-2 outline-none text-sm font-medium bg-transparent text-gray-800 placeholder:text-gray-400"
                            />
                            {searchQuery && (
                                <button onClick={() => setSearchQuery('')} className="pr-3 text-gray-400 hover:text-black">
                                    <X size={14} />
                                </button>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className={`transition-all bg-transparent p-2 cursor-pointer ${isSearchOpen ? 'text-pink-600' : 'text-black hover:text-pink-600'}`}>
                    <Search size={24} strokeWidth={2} />
                </div>
            </div>
            
            <Link to="/wishlist" className="relative hidden md:block text-black hover:text-pink-600 transition-transform hover:scale-110 bg-transparent p-2">
              <Heart size={24} strokeWidth={2} />
              {wishlist.length > 0 && (
                <span className="absolute top-0 right-0 bg-pink-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-white">
                  {wishlist.length}
                </span>
              )}
            </Link>
            
            <Link to="/cart" className="relative text-black hover:text-pink-600 transition-transform hover:scale-110 bg-transparent p-2">
              <ShoppingBag size={24} strokeWidth={2} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-pink-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-white">
                  {cartCount}
                </span>
              )}
            </Link>

            <Link 
              to={isAuthenticated ? "/account/profile" : "/login"} 
              className="relative text-black hover:text-pink-600 transition-transform hover:scale-110 bg-transparent p-2"
            >
              <User size={24} strokeWidth={2} />
            </Link>
          </div>
        </div>

        {/* Search Results Dropdown (Only appears when typing) */}
        <AnimatePresence>
          {isSearchOpen && searchQuery && (
            <div 
                className="absolute top-full left-0 right-0 bg-white border-t border-b border-pink-100 shadow-xl max-h-[70vh] overflow-y-auto"
                onMouseEnter={keepSearchOpen}
                onMouseLeave={closeSearchDelayed}
            >
              <div className="max-w-7xl mx-auto px-4 py-6">
                 {searchResults.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {searchResults.map((product) => (
                        <Link
                        key={product.id}
                        to={`/product/${product.id}`}
                        className="flex md:flex-col items-center gap-4 p-4 rounded-xl hover:bg-pink-50 transition-colors group"
                        >
                        <img 
                            src={product.image} 
                            alt={product.name} 
                            className="w-16 h-16 md:w-full md:h-48 object-cover rounded-lg shadow-sm"
                        />
                        <div className="text-left md:text-center">
                            <h4 className="font-bold text-gray-900 group-hover:text-pink-600 font-serif-display">
                            {product.name}
                            </h4>
                            <p className="text-gray-500 text-sm">${product.price.toFixed(2)}</p>
                        </div>
                        </Link>
                    ))}
                    </div>
                ) : (
                    <div className="text-center py-8 text-gray-400">
                    No results found for "{searchQuery}"
                    </div>
                )}
              </div>
            </div>
          )}
        </AnimatePresence>
      </nav>

      {/* Sidebar / Drawer Navigation */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
            />
            
            {/* Drawer */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 left-0 bottom-0 w-[300px] bg-white z-[70] shadow-2xl flex flex-col"
            >
              <div className="p-6 flex justify-between items-center border-b border-gray-100">
                <div
                  className="flex-1 h-32 mr-2"
                  style={{
                    WebkitMaskImage: 'url(/logo/logo.png)',
                    maskImage: 'url(/logo/logo.png)',
                    WebkitMaskSize: 'contain',
                    maskSize: 'contain',
                    WebkitMaskRepeat: 'no-repeat',
                    maskRepeat: 'no-repeat',
                    WebkitMaskPosition: 'left center',
                    maskPosition: 'left center',
                    backgroundColor: '#ec4899' // Tailwind pink-500
                  }}
                  aria-label="La Hime"
                />
                <button 
                  onClick={() => setIsSidebarOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-8 px-6 space-y-6">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    to={item.path}
                    className="block font-serif-display text-3xl text-gray-900 hover:text-pink-600 hover:pl-2 transition-all"
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                
                <div className="pt-8 border-t border-gray-100 mt-8">
                  <h4 className="font-bold text-gray-400 text-xs uppercase tracking-widest mb-4">Account</h4>
                  <div className="space-y-4 text-lg text-black">
                    <Link 
                      to={isAuthenticated ? "/account/profile" : "/login"} 
                      className="block hover:text-pink-500"
                    >
                      Profile
                    </Link>
                    <Link to={isAuthenticated ? "/account/orders" : "/login"} className="block hover:text-pink-500">Orders</Link>
                    <Link to="/wishlist" className="block hover:text-pink-500">Wishlist ({wishlist.length})</Link>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-pink-50">
                 <div className="flex items-center gap-2 text-pink-800 font-bold text-sm">
                    <Sparkles size={16} />
                    <span>Free Shipping on orders $150+</span>
                 </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};