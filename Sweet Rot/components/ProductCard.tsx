import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { Heart } from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { toggleWishlistItem, isInWishlist } = useStore();
  const isWishlisted = isInWishlist(product.id);

  return (
    <div className="group relative w-full">
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-200">
        <Link to={`/product/${product.id}`}>
            {/* Base Image */}
            <img
            src={product.image}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out group-hover:opacity-0"
            />
            {/* Hover/Rot Image */}
            <img
            src={product.hoverImage}
            alt={`${product.name} decayed`}
            className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-700 ease-in-out group-hover:opacity-100 scale-105"
            />
            
            {/* Decay Overlay Effect */}
            <div className="absolute inset-0 bg-rot-black/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-rot-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        </Link>

        {/* Badges */}
        {product.isNew && (
            <span className="absolute top-2 left-2 bg-sweet-pink text-rot-black text-[10px] font-bold uppercase px-2 py-1 tracking-widest z-10">
            New Rot
            </span>
        )}

        {/* Quick Actions */}
        <button 
            onClick={(e) => {
                e.preventDefault();
                toggleWishlistItem(product);
            }}
            className={`absolute top-2 right-2 p-2 rounded-full transition-all duration-300 z-10 ${isWishlisted ? 'bg-sweet-pink text-white opacity-100' : 'bg-white/80 text-rot-black opacity-0 group-hover:opacity-100 hover:bg-sweet-pink hover:text-white'}`}
        >
            <Heart size={16} fill={isWishlisted ? "currentColor" : "none"} />
        </button>
      </div>

      {/* Info */}
      <div className="mt-4 flex justify-between items-start">
        <div>
          <h3 className="font-serif text-lg leading-tight group-hover:text-rot-red transition-colors duration-300">
            <Link to={`/product/${product.id}`}>{product.name}</Link>
          </h3>
          <p className="text-gray-500 text-xs mt-1 uppercase tracking-wider">{product.category}</p>
        </div>
        <span className="font-sans font-medium text-rot-black">€{product.price}</span>
      </div>
    </div>
  );
};

export default ProductCard;