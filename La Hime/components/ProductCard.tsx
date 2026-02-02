import React from 'react';
import { Product } from '../types';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';
import { useShop } from '../context/ShopContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { toggleWishlist, isInWishlist, formatBasePrice } = useShop();
  const navigate = useNavigate();
  const isWishlisted = isInWishlist(product.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative"
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden bg-white p-3 shadow-sm transition-all duration-500 group-hover:shadow-xl group-hover:rotate-1 group-hover:scale-[1.02] border border-gray-100">
          <div className="relative h-full w-full overflow-hidden bg-gray-100">
             {/* Badge */}
             {product.isNew && (
                <span className="absolute top-2 left-2 z-20 bg-black text-white text-xs font-bold px-2 py-1 uppercase tracking-wider">
                  New
                </span>
             )}
            
            {/* Images */}
            <img
              src={product.image}
              alt={product.name}
              className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500 group-hover:opacity-0"
            />
            <img
              src={product.hoverImage}
              alt={`${product.name} detail`}
              className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />
            
            {/* Quick Actions Overlay */}
            <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center space-x-3 z-20">
              <button 
                className={`p-3 rounded-full transition-colors shadow-lg ${isWishlisted ? 'bg-pink-500 text-white' : 'bg-white/90 backdrop-blur-sm text-gray-900 hover:bg-pink-500 hover:text-white'}`}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleWishlist(product);
                }}
              >
                <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} />
              </button>
              <button 
                className="bg-white/90 backdrop-blur-sm p-3 rounded-full text-gray-900 hover:bg-black hover:text-white transition-colors shadow-lg"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  navigate(`/product/${product.id}`);
                }}
              >
                <ShoppingBag size={18} />
              </button>
            </div>
          </div>
          
          {/* Polaroid-style Bottom Text */}
          <div className="pt-4 pb-2 text-center">
             <h3 className="font-serif-display text-lg text-gray-900 group-hover:text-pink-600 transition-colors truncate px-2">
              {product.name}
            </h3>
            <p className="font-mono text-sm text-gray-500 mt-1">{formatBasePrice(product.price)}</p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};