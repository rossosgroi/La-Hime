import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { PRODUCTS } from '../constants';
import Button from '../components/Button';
import { Minus, Plus, ShieldCheck, Ruler, Heart } from 'lucide-react';
import { useStore } from '../context/StoreContext';

const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const product = PRODUCTS.find(p => p.id === id) || PRODUCTS[0];
  const { addToCart, toggleWishlistItem, isInWishlist } = useStore();
  
  const [qty, setQty] = useState(1);
  const [selectedSize, setSelectedSize] = useState('M');

  const handleAddToCart = () => {
    // In a real app we might handle qty here, but context simple addToCart adds 1
    // Let's call it qty times or modify context to accept qty (keeping simple for now by looping)
    for(let i=0; i<qty; i++) {
        addToCart(product, selectedSize);
    }
  };

  const isWishlisted = isInWishlist(product.id);

  return (
    <div className="pt-28 pb-16 min-h-screen bg-sweet-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Gallery */}
          <div className="space-y-4 sticky top-24 h-fit">
            <div className="aspect-[3/4] w-full bg-gray-200 relative overflow-hidden group">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                <button 
                    onClick={() => toggleWishlistItem(product)}
                    className={`absolute top-4 right-4 p-3 rounded-full transition-all duration-300 ${isWishlisted ? 'bg-sweet-pink text-white' : 'bg-white/90 text-rot-black hover:bg-sweet-pink hover:text-white'}`}
                >
                    <Heart size={20} fill={isWishlisted ? "currentColor" : "none"} />
                </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
                 <img src={product.hoverImage} alt="Detail 1" className="aspect-square object-cover cursor-pointer hover:opacity-80 transition-opacity" />
                 <img src="https://picsum.photos/id/400/800/800" alt="Detail 2" className="aspect-square object-cover grayscale hover:grayscale-0 transition-all duration-500 cursor-pointer" />
            </div>
          </div>

          {/* Info */}
          <div className="pt-4">
            <div className="mb-8 border-b border-gray-200 pb-8">
                <span className="text-rot-red text-sm font-bold uppercase tracking-widest">{product.category}</span>
                <h1 className="font-serif italic text-4xl md:text-5xl mt-2 mb-4 text-rot-black">{product.name}</h1>
                <p className="text-2xl font-sans font-medium">€{product.price}.00</p>
            </div>

            <div className="space-y-8 mb-12">
                <p className="font-sans text-gray-600 leading-relaxed text-lg">
                    {product.description} Designed for the club, the street, and everywhere in between. 
                    Material allows for comfort while maintaining structural integrity.
                </p>

                {/* Size Selector */}
                <div>
                    <div className="flex justify-between items-center mb-3">
                        <span className="text-sm font-bold uppercase tracking-widest">Select Size</span>
                        <button className="text-xs text-gray-500 underline flex items-center gap-1 hover:text-sweet-pink">
                            <Ruler size={12} /> Size Guide
                        </button>
                    </div>
                    <div className="flex gap-3">
                        {['XS', 'S', 'M', 'L', 'XL'].map(size => (
                            <button
                                key={size}
                                onClick={() => setSelectedSize(size)}
                                className={`w-14 h-14 flex items-center justify-center border transition-all ${
                                    selectedSize === size 
                                    ? 'bg-rot-black text-white border-rot-black' 
                                    : 'bg-transparent text-rot-black border-gray-300 hover:border-rot-black'
                                }`}
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Quantity & Add */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex items-center border border-gray-300 px-4 h-14 w-full sm:w-32 justify-between">
                        <button onClick={() => setQty(Math.max(1, qty - 1))} className="hover:text-sweet-pink"><Minus size={16}/></button>
                        <span className="font-sans font-medium">{qty}</span>
                        <button onClick={() => setQty(qty + 1)} className="hover:text-sweet-pink"><Plus size={16}/></button>
                    </div>
                    <Button 
                        onClick={handleAddToCart}
                        className="flex-1 h-14 bg-accent-rose border-accent-rose text-white hover:bg-white hover:text-accent-rose text-lg"
                    >
                        Add to Cart - €{product.price * qty}.00
                    </Button>
                </div>
            </div>

            {/* Extra Info */}
            <div className="space-y-4 text-sm text-gray-500 border-t border-gray-200 pt-8">
                <div className="flex items-center gap-3">
                    <ShieldCheck className="text-sweet-pink" size={20} />
                    <span>Secure Checkout & EU Shipping</span>
                </div>
                <div className="flex items-center gap-3">
                    <Heart className="text-sweet-pink" size={20} />
                    <span>Ethically Decaying Materials</span>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;