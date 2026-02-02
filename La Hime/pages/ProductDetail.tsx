import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PRODUCTS } from '../constants';
import { Truck, ShieldCheck, Heart, Share2, Check, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useShop } from '../context/ShopContext';

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = PRODUCTS.find((p) => p.id === Number(id));
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [mainImage, setMainImage] = useState<string>('');
  
  // Interaction States
  const [isAdded, setIsAdded] = useState(false);
  const [showShareTooltip, setShowShareTooltip] = useState(false);
  const [error, setError] = useState('');

  const { addToCart, toggleWishlist, isInWishlist, formatBasePrice } = useShop();

  useEffect(() => {
    if (product) {
        setMainImage(product.image);
        window.scrollTo(0,0);
    }
  }, [product]);

  if (!product) return <div className="pt-32 text-center text-gray-900">Product not found</div>;

  const sizes = ['XS', 'S', 'M', 'L'];
  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = () => {
    if (!selectedSize) {
      setError('Please select a size first! 💕');
      return;
    }
    setError('');
    addToCart(product, selectedSize);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setShowShareTooltip(true);
    setTimeout(() => setShowShareTooltip(false), 2000);
  };

  return (
    <div className="pt-32 pb-24 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-8 flex items-center gap-2">
            <Link to="/" className="hover:text-black transition-colors">Home</Link> / 
            <Link to="/shop" className="hover:text-black transition-colors">Shop</Link> / 
            <span className="text-black font-medium">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Gallery */}
          <div className="space-y-4">
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="aspect-[3/4] w-full bg-gray-100 rounded-2xl overflow-hidden relative border border-gray-100 shadow-sm"
            >
              <img src={mainImage} alt={product.name} className="w-full h-full object-cover" />
              {product.isNew && <span className="absolute top-4 left-4 bg-black text-white text-xs font-bold px-3 py-1 rounded-full uppercase shadow-md">New Season</span>}
            </motion.div>
            
            <div className="grid grid-cols-4 gap-4">
              {[product.image, product.hoverImage, product.image, product.hoverImage].map((img, idx) => (
                <button 
                  key={idx} 
                  onClick={() => setMainImage(img)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${mainImage === img ? 'border-black opacity-100' : 'border-transparent opacity-70 hover:opacity-100'}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col h-full">
            <div className="mb-auto">
              <h1 className="font-serif-display text-4xl lg:text-5xl text-gray-900 mb-2">{product.name}</h1>
              <div className="flex items-center gap-4 mb-6">
                 <p className="text-2xl font-mono text-gray-900">{formatBasePrice(product.price)}</p>
              </div>

              <p className="text-gray-600 leading-relaxed mb-8 pl-1">
                {product.description}
              </p>

              {/* Sizes */}
              <div className="mb-8">
                <div className="flex justify-between mb-3">
                  <span className="font-bold text-sm uppercase tracking-wide text-gray-900">Select Size</span>
                  <button className="text-xs text-gray-500 underline hover:text-black">Size Guide</button>
                </div>
                <div className="flex gap-3">
                  {sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => {
                        setSelectedSize(size);
                        setError('');
                      }}
                      className={`w-12 h-12 rounded-lg flex items-center justify-center font-bold text-sm transition-all ${
                        selectedSize === size 
                          ? 'bg-black text-white shadow-md scale-105' 
                          : 'bg-white border border-gray-200 text-gray-900 hover:border-black'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                {error && (
                  <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 text-red-500 text-sm mt-3 font-medium">
                    <AlertCircle size={16} />
                    {error}
                  </motion.div>
                )}
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-3 mb-10">
                <div className="flex gap-4">
                    <button 
                    onClick={handleAddToCart}
                    className={`flex-1 flex items-center justify-center gap-2 font-bold uppercase tracking-widest py-4 rounded-full border-2 transition-all duration-300 ${
                        isAdded 
                        ? 'bg-green-500 border-green-500 text-white' 
                        : 'bg-white border-black text-black hover:bg-black hover:text-white'
                    }`}
                    >
                    {isAdded ? (
                        <>
                        <Check size={20} /> Added
                        </>
                    ) : (
                        'Add to Cart'
                    )}
                    </button>
                    
                    <button 
                    onClick={() => toggleWishlist(product)}
                    className={`w-14 h-14 rounded-full border-2 flex items-center justify-center transition-all text-gray-900 ${
                        isWishlisted 
                        ? 'bg-pink-50 border-pink-200 text-pink-500' 
                        : 'border-gray-300 hover:border-pink-300 hover:text-pink-500'
                    }`}
                    >
                        <Heart size={24} fill={isWishlisted ? "currentColor" : "none"} />
                    </button>
                    
                    <div className="relative">
                    <button 
                        onClick={handleShare}
                        className="w-14 h-14 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-black text-gray-900 hover:text-black transition-all"
                    >
                        <Share2 size={24} />
                    </button>
                    <AnimatePresence>
                        {showShareTooltip && (
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-black text-white text-xs rounded whitespace-nowrap"
                        >
                            Copied!
                        </motion.div>
                        )}
                    </AnimatePresence>
                    </div>
                </div>

                <button 
                  className="w-full bg-black text-white font-bold uppercase tracking-widest py-4 rounded-full shadow-lg hover:bg-gray-800 transition-all duration-300"
                >
                  Buy Now
                </button>
              </div>
            </div>

            {/* Guarantees */}
            <div className="grid grid-cols-2 gap-4 pt-8 border-t border-gray-100 text-sm text-gray-500">
              <div className="flex items-center gap-3">
                <div className="bg-green-50 p-2 rounded-full text-green-600"><Truck size={18}/></div>
                <span>Free Shipping over $150</span>
              </div>
              <div className="flex items-center gap-3">
                 <div className="bg-blue-50 p-2 rounded-full text-blue-600"><ShieldCheck size={18}/></div>
                 <span>30-Day Easy Returns</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};