import React from 'react';
import { X, ShoppingBag } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import ProductCard from './ProductCard';

const WishlistDrawer: React.FC = () => {
  const { isWishlistOpen, closeWishlist, wishlist } = useStore();

  return (
    <>
      <div 
        className={`fixed inset-0 bg-rot-black/60 backdrop-blur-sm z-40 transition-opacity duration-500 ${isWishlistOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={closeWishlist}
      />
      
      <div className={`fixed top-0 right-0 h-full w-full sm:w-[450px] bg-sweet-cream z-50 transform transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] shadow-2xl ${isWishlistOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
            
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-white">
                <h2 className="font-serif italic text-2xl text-rot-black">Wishlist <span className="text-sm font-sans not-italic text-gray-400 ml-2">({wishlist.length})</span></h2>
                <button onClick={closeWishlist} className="text-rot-black hover:text-sweet-pink transition-colors">
                    <X size={24} />
                </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6">
                {wishlist.length === 0 ? (
                     <div className="h-full flex flex-col items-center justify-center text-gray-400 opacity-60">
                        <ShoppingBag size={48} className="mb-4" />
                        <p className="font-serif italic text-xl">Your wishlist is empty.</p>
                        <button onClick={closeWishlist} className="mt-4 underline text-sm uppercase font-bold text-rot-black">Find something dark</button>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 gap-x-4 gap-y-8">
                        {wishlist.map((item) => (
                            <div key={item.id} className="relative">
                                <ProductCard product={item} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
      </div>
    </>
  );
};

export default WishlistDrawer;