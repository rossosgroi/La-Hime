import React, { useState } from 'react';
import { X, Trash2, ArrowRight, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import Button from './Button';

const CartDrawer: React.FC = () => {
  const { isCartOpen, closeCart, cart, removeFromCart, updateQuantity, cartTotal } = useStore();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      alert("Checkout flow initiated via Payment Gateway.");
      setIsCheckingOut(false);
    }, 1500);
  };

  return (
    <>
      <div 
        className={`fixed inset-0 bg-rot-black/60 backdrop-blur-sm z-40 transition-opacity duration-500 ${isCartOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={closeCart}
      />
      
      <div className={`fixed top-0 right-0 h-full w-full sm:w-[450px] bg-sweet-cream z-50 transform transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] shadow-2xl ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
            
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-white">
                <h2 className="font-decay text-3xl text-rot-black">Your <span className="text-rot-red">Rot</span></h2>
                <button onClick={closeCart} className="text-rot-black hover:text-rot-red transition-colors">
                    <X size={24} />
                </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {cart.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-gray-400 opacity-60">
                        <ShoppingBag size={48} className="mb-4" />
                        <p className="font-serif italic text-xl">Your bag is empty.</p>
                        <button onClick={closeCart} className="mt-4 underline text-sm uppercase font-bold text-rot-black">Continue Shopping</button>
                    </div>
                ) : (
                    cart.map((item) => (
                        <div key={item.cartId} className="flex gap-4 group">
                            <div className="w-24 h-32 bg-gray-200 flex-shrink-0 overflow-hidden relative">
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex flex-col justify-between flex-1 py-1">
                                <div>
                                    <div className="flex justify-between items-start">
                                        <h4 className="font-serif italic text-lg leading-tight mb-1 pr-4">{item.name}</h4>
                                        <button 
                                            onClick={() => removeFromCart(item.cartId)}
                                            className="text-gray-300 hover:text-rot-red transition-colors"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                    <p className="text-xs text-gray-500 uppercase tracking-wide">{item.category} / {item.selectedSize}</p>
                                </div>
                                <div className="flex justify-between items-end">
                                    <div className="flex items-center border border-gray-300 h-8">
                                        <button 
                                            onClick={() => updateQuantity(item.cartId, -1)}
                                            className="px-2 hover:bg-gray-100 h-full flex items-center"
                                        >
                                            <Minus size={12}/>
                                        </button>
                                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                                        <button 
                                            onClick={() => updateQuantity(item.cartId, 1)}
                                            className="px-2 hover:bg-gray-100 h-full flex items-center"
                                        >
                                            <Plus size={12}/>
                                        </button>
                                    </div>
                                    <span className="font-bold">€{item.price * item.quantity}</span>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
                <div className="p-6 border-t border-gray-200 bg-white">
                    <div className="flex justify-between items-center mb-4 text-lg font-bold">
                        <span>Subtotal</span>
                        <span>€{cartTotal}</span>
                    </div>
                    <p className="text-xs text-gray-500 mb-6 text-center">Shipping & taxes calculated at checkout.</p>
                    <Button onClick={handleCheckout} className="w-full flex items-center justify-center gap-2" disabled={isCheckingOut}>
                        {isCheckingOut ? 'Processing...' : (
                            <>Checkout <ArrowRight size={16} /></>
                        )}
                    </Button>
                </div>
            )}
        </div>
      </div>
    </>
  );
};

export default CartDrawer;