import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, Lock } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, formatPrice, formatBasePrice, currency } = useShop();
  const navigate = useNavigate();

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = subtotal > 150 ? 0 : 10;
  const total = subtotal + shipping;

  const handleCheckout = () => {
      navigate('/checkout');
  };

  return (
    <div className="pt-32 pb-24 min-h-screen bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-serif-display text-4xl mb-8 text-gray-900">Shopping Bag</h1>

        {cart.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your bag is empty</h2>
            <p className="text-gray-500 mb-8">Looks like you haven't added anything yet.</p>
            <Link 
              to="/shop" 
              className="inline-block bg-black text-white px-8 py-3 rounded-full font-bold uppercase tracking-wider hover:bg-pink-500 transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Cart Items */}
            <div className="flex-1 space-y-6">
              {cart.map((item, idx) => (
                <div key={`${item.id}-${item.size}`} className="bg-white p-6 rounded-2xl shadow-sm flex gap-6 items-center">
                    <Link to={`/product/${item.id}`} className="w-24 h-24 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden block">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                    </Link>
                    
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                          <Link to={`/product/${item.id}`}>
                            <h3 className="font-bold text-gray-900 font-serif-display text-lg hover:text-pink-600 transition-colors">{item.name}</h3>
                          </Link>
                          {/* Item Price Calculation uses Base Price (USD) as requested */}
                          <p className="font-mono font-medium text-gray-900">{formatBasePrice(item.price * item.quantity)}</p>
                      </div>
                      <p className="text-sm text-gray-500 mb-4">Size: {item.size}</p>
                      
                      <div className="flex justify-between items-center">
                          <div className="flex items-center border border-gray-200 rounded-full">
                            <button 
                              onClick={() => updateQuantity(item.id, item.size, -1)}
                              className="p-2 hover:bg-gray-50 rounded-full transition-colors text-gray-600"
                              disabled={item.quantity <= 1}
                            >
                              <Minus size={14} />
                            </button>
                            {/* Ensuring text is dark and visible */}
                            <span className="w-8 text-center text-sm font-bold text-gray-900">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.size, 1)}
                              className="p-2 hover:bg-gray-50 rounded-full transition-colors text-gray-600"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <button 
                            onClick={() => removeFromCart(item.id, item.size)}
                            className="text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                      </div>
                    </div>
                </div>
              ))}
              
              <Link to="/shop" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-gray-500 hover:text-pink-600 transition-colors mt-4">
                  <ArrowRight size={16} className="rotate-180" /> Continue Shopping
              </Link>
            </div>

            {/* Summary */}
            <div className="lg:w-96 flex-shrink-0 h-fit">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-pink-100 sticky top-32">
                <h2 className="font-bold text-xl mb-6 font-serif-display text-gray-900">Order Summary</h2>
                
                <div className="space-y-4 mb-8 text-gray-600">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    {/* Totals are Converted to Selected Currency */}
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-black text-lg border-t border-gray-100 pt-4">
                    <span>Total ({currency})</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>

                <button 
                  onClick={handleCheckout}
                  className="w-full bg-black text-white py-4 rounded-full font-bold uppercase tracking-widest hover:bg-pink-500 transition-all shadow-lg hover:shadow-pink-300/50 mb-4 flex items-center justify-center gap-2"
                >
                  <Lock size={16} /> Checkout
                </button>
                
                <div className="text-center text-xs text-gray-400">
                  <p>Secure Checkout powered by Stripe</p>
                </div>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};