import React from 'react';
import { Instagram, Twitter, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white pt-16 pb-8 border-t border-pink-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <h2 className="font-brand text-3xl mb-4 text-gray-900">La Hime</h2>
            <p className="text-gray-500 max-w-sm mb-6 leading-relaxed">
              Sweet & Spicy. A fusion of Tokyo aesthetic and Shanghai streetwear for the modern fashion enthusiast.
            </p>
            <div className="flex space-x-4">
              {[Instagram, Twitter, Mail].map((Icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="w-10 h-10 rounded-full bg-pink-50 flex items-center justify-center text-pink-400 hover:bg-black hover:text-white transition-all duration-300 hover:-translate-y-1 shadow-sm"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
          
          {/* Spacer column to keep layout balance or could just leave empty space */}
          <div className="hidden md:block"></div>

          <div>
            <h3 className="font-serif-display font-bold text-lg mb-6 text-gray-900">Care</h3>
            <ul className="space-y-3 text-gray-500">
              <li><Link to="/contact" className="hover:text-pink-500 hover:pl-2 transition-all duration-200">Contact Us</Link></li>
              <li><Link to="/shipping" className="hover:text-pink-500 hover:pl-2 transition-all duration-200">Shipping</Link></li>
              <li><Link to="/returns" className="hover:text-pink-500 hover:pl-2 transition-all duration-200">Returns</Link></li>
              <li><Link to="/size-guide" className="hover:text-pink-500 hover:pl-2 transition-all duration-200">Size Guide</Link></li>
              <li><Link to="/faq" className="hover:text-pink-500 hover:pl-2 transition-all duration-200">FAQ</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>© 2026 La Hime Studios. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="hover:text-gray-900">Privacy</Link>
            <Link to="/terms" className="hover:text-gray-900">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};