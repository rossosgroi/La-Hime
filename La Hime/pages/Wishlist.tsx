import React from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/ProductCard';
import { ArrowRight } from 'lucide-react';

export const Wishlist: React.FC = () => {
  const { wishlist } = useShop();

  return (
    <div className="pt-32 pb-24 min-h-screen bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-serif-display text-4xl mb-4 text-gray-900">My Wishlist</h1>
        <p className="text-gray-500 mb-12">Save your favorites for later.</p>

        {wishlist.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-dashed border-gray-200">
             <h2 className="text-2xl font-bold text-gray-900 mb-4">Your wishlist is empty</h2>
             <p className="text-gray-500 mb-8">Start collecting your favorite looks.</p>
             <Link 
              to="/shop" 
              className="inline-block bg-black text-white px-8 py-3 rounded-full font-bold uppercase tracking-wider hover:bg-pink-500 transition-colors"
             >
               Explore Collection
             </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {wishlist.map((product) => (
              <div key={product.id} className="relative">
                 <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}

        {wishlist.length > 0 && (
           <div className="mt-12 text-center">
             <Link to="/shop" className="inline-flex items-center gap-2 text-gray-500 hover:text-pink-600 transition-colors uppercase text-sm font-bold tracking-widest group">
                Continue Shopping
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
             </Link>
           </div>
        )}
      </div>
    </div>
  );
};