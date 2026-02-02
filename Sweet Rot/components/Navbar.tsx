import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingBag, Heart, Menu, User, X, Search } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import Logo from './Logo';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';
  
  const { toggleMenu, toggleCart, toggleWishlist, toggleProfile, isMenuOpen, cartCount, wishlist } = useStore();

  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (searchQuery.trim()) {
          navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
          setSearchQuery(''); // Clear navbar search after submitting
      }
  };

  const showBackground = scrolled || !isHome || isMenuOpen;
  const textColorClass = 'text-sweet-cream';
  
  // Standard icon button style for consistent alignment
  const iconButtonClass = "w-10 h-10 flex items-center justify-center hover:text-sweet-pink transition-colors relative";

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ease-in-out border-b ${
        showBackground
          ? 'bg-rot-black/95 backdrop-blur-md border-rot-charcoal py-3'
          : 'bg-transparent border-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center relative">
        
        {/* Left: Hamburger Menu */}
        <div className="flex items-center">
            <button
                onClick={toggleMenu}
                className={iconButtonClass}
                aria-label="Toggle Menu"
            >
                {isMenuOpen ? <X size={28} strokeWidth={1.5} /> : <Menu size={28} strokeWidth={1.5} />}
            </button>
        </div>

        {/* Center: Logo */}
        <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
          <Link to="/">
            <Logo scrolled={showBackground} />
          </Link>
        </div>

        {/* Right: Actions */}
        <div className={`flex items-center space-x-1 sm:space-x-2 ${textColorClass}`}>
            
            {/* Search - Expanding */}
            <form onSubmit={handleSearchSubmit} className="relative group flex items-center h-10">
                <div 
                    className={`overflow-hidden transition-all duration-300 ease-out flex items-center justify-end ${
                        searchQuery ? 'w-48' : 'w-0 group-hover:w-48 focus-within:w-48'
                    }`}
                >
                    <input 
                        type="text" 
                        placeholder="Search..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-transparent border-b border-sweet-cream/50 text-sweet-cream placeholder-sweet-cream/50 focus:outline-none focus:border-sweet-pink text-sm px-2 py-1 font-sans mr-2"
                    />
                </div>
                <button type="submit" className={`${iconButtonClass} translate-y-2`}>
                    <Search size={22} strokeWidth={1.5} />
                </button>
            </form>

            {/* Wishlist */}
            <button onClick={toggleWishlist} className={iconButtonClass}>
                <Heart size={22} strokeWidth={1.5} />
                {wishlist.length > 0 && (
                    <span className="absolute top-2 right-2 w-2 h-2 bg-sweet-pink rounded-full pointer-events-none"></span>
                )}
            </button>
            
            {/* Cart */}
            <button onClick={toggleCart} className={iconButtonClass}>
                <ShoppingBag size={22} strokeWidth={1.5} />
                {cartCount > 0 && (
                    <span className="absolute top-1 right-1 bg-sweet-pink text-rot-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center pointer-events-none">
                        {cartCount}
                    </span>
                )}
            </button>

            {/* Profile Drawer Toggle */}
            <button onClick={toggleProfile} className={iconButtonClass}>
                <User size={22} strokeWidth={1.5} />
            </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;