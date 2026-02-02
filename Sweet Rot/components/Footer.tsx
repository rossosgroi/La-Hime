import React from 'react';
import { Instagram, Twitter, Facebook } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-rot-black text-sweet-cream pt-20 pb-10 border-t-4 border-sweet-pink">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <h3 className="font-decay text-5xl mb-6 text-sweet-pink">Join the Rot</h3>
            <p className="font-sans text-gray-400 mb-6 max-w-md">
              Subscribe to receive updates on drops, exclusive decay events, and medical-grade aesthetics.
            </p>
            <form className="flex max-w-md border-b border-gray-600 focus-within:border-sweet-pink transition-colors">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-transparent w-full py-2 px-1 focus:outline-none text-white placeholder-gray-600 font-serif"
              />
              <button
                type="button"
                className="text-sweet-pink font-bold uppercase tracking-widest text-sm hover:text-white transition-colors"
              >
                Infect
              </button>
            </form>
          </div>

          <div>
            <h4 className="font-serif italic text-2xl mb-6 text-sweet-pink">Explore</h4>
            <ul className="space-y-4 font-sans text-sm text-gray-400">
              <li><Link to="/shop" className="hover:text-white transition-colors">Shop All</Link></li>
              <li><Link to="/shop" className="hover:text-white transition-colors">New Arrivals</Link></li>
              <li><Link to="/lookbook" className="hover:text-white transition-colors">Lookbook</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">Stockists</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif italic text-2xl mb-6 text-sweet-pink">Legal</h4>
            <ul className="space-y-4 font-sans text-sm text-gray-400">
              <li><Link to="/legal/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/legal/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link to="/legal/returns" className="hover:text-white transition-colors">Returns & Shipping</Link></li>
              <li><Link to="/legal/imprint" className="hover:text-white transition-colors">Imprint</Link></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-800">
          <p className="text-gray-600 text-xs uppercase tracking-widest mb-4 md:mb-0">
            © {new Date().getFullYear()} Sweet Rot. All Rights Reserved.
          </p>
          <div className="flex space-x-6 text-gray-400">
            <a href="#" className="hover:text-sweet-pink transition-colors"><Instagram size={20} /></a>
            <a href="#" className="hover:text-sweet-pink transition-colors"><Twitter size={20} /></a>
            <a href="#" className="hover:text-sweet-pink transition-colors"><Facebook size={20} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;