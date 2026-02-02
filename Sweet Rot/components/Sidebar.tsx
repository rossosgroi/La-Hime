import React from 'react';
import { Link } from 'react-router-dom';
import { X, ArrowRight, User, Package, HelpCircle } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { NAV_ITEMS } from '../constants';

const Sidebar: React.FC = () => {
  const { isMenuOpen, closeMenu } = useStore();

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-rot-black/60 backdrop-blur-sm z-40 transition-opacity duration-500 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={closeMenu}
      />
      
      {/* Drawer */}
      <div className={`fixed top-0 left-0 h-full w-full sm:w-[400px] bg-rot-black z-50 transform transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] border-r border-rot-charcoal ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full p-8 md:p-12">
            
            {/* Header */}
            <div className="flex justify-between items-center mb-16">
                <img src="/assets/logo.png" alt="Sweet Rot" className="h-48 w-auto" />
                <button onClick={closeMenu} className="text-white hover:text-sweet-pink transition-colors">
                    <X size={28} strokeWidth={1} />
                </button>
            </div>

            {/* Links */}
            <nav className="flex flex-col space-y-6">
                <Link 
                    to="/" 
                    onClick={closeMenu}
                    className="font-decay text-5xl text-sweet-cream hover:text-sweet-pink hover:pl-4 transition-all duration-300 flex items-center group"
                >
                   Home <ArrowRight className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
                {NAV_ITEMS.map((item) => (
                    <Link
                    key={item.path}
                    to={item.path}
                    onClick={closeMenu}
                    className="font-decay text-5xl text-sweet-cream hover:text-sweet-pink hover:pl-4 transition-all duration-300 flex items-center group"
                    >
                    {item.label}
                    <ArrowRight className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                ))}
            </nav>

            {/* Account Quick Links */}
            <div className="mt-12 space-y-4">
                 <Link to="/profile" onClick={closeMenu} className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors">
                    <User size={18} /> My Account
                 </Link>
                 <Link to="/profile?tab=orders" onClick={closeMenu} className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors">
                    <Package size={18} /> Track Order
                 </Link>
                 <Link to="/profile?tab=help" onClick={closeMenu} className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors">
                    <HelpCircle size={18} /> Customer Care
                 </Link>
            </div>

            {/* Footer Info */}
            <div className="mt-auto space-y-6">
                 <div className="h-px bg-gray-800 w-full" />
                 <div className="grid grid-cols-2 gap-4 text-gray-500 font-sans text-sm">
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a>
                    <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">TikTok</a>
                    <Link to="/profile?tab=help" onClick={closeMenu} className="hover:text-white transition-colors">Shipping</Link>
                    <Link to="/profile?tab=returns" onClick={closeMenu} className="hover:text-white transition-colors">Returns</Link>
                 </div>
                 <p className="text-xs text-gray-700 uppercase tracking-widest">
                     Indulge the Decay
                 </p>
            </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;