import React, { useState } from 'react';
import { useShop, Address } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';
import { Check, CreditCard, Lock, MapPin, Truck } from 'lucide-react';

const EU_COUNTRIES = [
    "Austria", "Belgium", "Bulgaria", "Croatia", "Cyprus", "Czech Republic", 
    "Denmark", "Estonia", "Finland", "France", "Germany", "Greece", "Hungary", 
    "Ireland", "Italy", "Latvia", "Lithuania", "Luxembourg", "Malta", 
    "Netherlands", "Poland", "Portugal", "Romania", "Slovakia", "Slovenia", 
    "Spain", "Sweden"
];

export const Checkout: React.FC = () => {
    const { cart, formatPrice, formatBasePrice, currency, user, updateUser } = useShop();
    const navigate = useNavigate();

    const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const shipping = subtotal > 150 ? 0 : 10;
    const total = subtotal + shipping;

    const [shippingDetails, setShippingDetails] = useState<Address>(user?.address || {
        country: 'Italy',
        city: '',
        street: '',
        zipCode: ''
    });

    const [zipError, setZipError] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);

    // Reuse validation logic
    const validateZip = (zip: string) => {
        const regex = /^[A-Z0-9\s-]{3,10}$/i;
        return regex.test(zip);
    };

    const handlePlaceOrder = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validateZip(shippingDetails.zipCode)) {
            setZipError("Invalid Postal Code.");
            return;
        }

        setIsProcessing(true);

        // Simulate API Call
        setTimeout(() => {
            setIsProcessing(false);
            if (!user?.address) {
                // Save address if user didn't have one
                updateUser({ address: shippingDetails });
            }
            alert(`Order Placed Successfully! Total charged: ${formatPrice(total)}`);
            navigate('/account/orders');
        }, 2000);
    };

    if (cart.length === 0) {
        return (
            <div className="pt-32 pb-24 text-center">
                <p>Your cart is empty.</p>
            </div>
        )
    }

    return (
        <div className="pt-32 pb-24 min-h-screen bg-stone-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="font-serif-display text-4xl mb-8 text-gray-900">Checkout</h1>

                <form onSubmit={handlePlaceOrder} className="flex flex-col lg:flex-row gap-12">
                    
                    {/* Left: Shipping & Payment */}
                    <div className="flex-1 space-y-8">
                        
                        {/* Shipping Address */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-gray-900">
                                <MapPin className="text-pink-500" /> Shipping Address
                            </h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-900 mb-2">Country</label>
                                    <select 
                                        value={shippingDetails.country}
                                        onChange={(e) => setShippingDetails({...shippingDetails, country: e.target.value})}
                                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-pink-200 transition-all outline-none text-gray-900"
                                    >
                                        {EU_COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                     <div>
                                        <label className="block text-sm font-bold text-gray-900 mb-2">City</label>
                                        <input 
                                            type="text"
                                            required
                                            value={shippingDetails.city}
                                            onChange={(e) => setShippingDetails({...shippingDetails, city: e.target.value})}
                                            className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-pink-200 transition-all outline-none text-gray-900"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-900 mb-2">Postcode</label>
                                        <input 
                                            type="text"
                                            required
                                            value={shippingDetails.zipCode}
                                            onChange={(e) => {
                                                setShippingDetails({...shippingDetails, zipCode: e.target.value});
                                                setZipError('');
                                            }}
                                            className={`w-full px-4 py-3 rounded-xl bg-gray-50 border focus:bg-white focus:ring-2 transition-all outline-none text-gray-900 ${zipError ? 'border-red-500 focus:ring-red-200' : 'border-transparent focus:ring-pink-200'}`}
                                        />
                                        {zipError && <p className="text-red-500 text-xs mt-1">{zipError}</p>}
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-900 mb-2">Street Address</label>
                                    <input 
                                        type="text"
                                        required
                                        value={shippingDetails.street}
                                        onChange={(e) => setShippingDetails({...shippingDetails, street: e.target.value})}
                                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-pink-200 transition-all outline-none text-gray-900"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Payment Mock */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                             <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-gray-900">
                                <CreditCard className="text-pink-500" /> Payment
                            </h2>
                            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 mb-4">
                                <div className="flex items-center gap-3 mb-2">
                                    <Lock size={16} className="text-green-600" />
                                    <span className="text-sm font-bold text-gray-700">Secure SSL Connection</span>
                                </div>
                                <p className="text-sm text-gray-500">This is a secure 256-bit SSL encrypted payment.</p>
                            </div>
                            
                            <div className="space-y-4 opacity-50 pointer-events-none">
                                <input type="text" placeholder="Card Number" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200" disabled />
                                <div className="grid grid-cols-2 gap-4">
                                    <input type="text" placeholder="MM / YY" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200" disabled />
                                    <input type="text" placeholder="CVC" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200" disabled />
                                </div>
                            </div>
                            <p className="text-xs text-gray-400 mt-4 text-center">Payment processing is simulated for this demo.</p>
                        </div>
                    </div>

                    {/* Right: Order Summary */}
                    <div className="lg:w-96 flex-shrink-0 h-fit">
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-pink-100 sticky top-32">
                            <h2 className="font-bold text-xl mb-6 font-serif-display text-gray-900">Your Order</h2>
                            
                            <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2">
                                {cart.map(item => (
                                    <div key={`${item.id}-${item.size}`} className="flex justify-between items-center text-sm">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-gray-100 rounded overflow-hidden">
                                                <img src={item.image} alt="" className="w-full h-full object-cover" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-900">{item.name}</p>
                                                <p className="text-gray-500 text-xs">Size: {item.size} x {item.quantity}</p>
                                            </div>
                                        </div>
                                        {/* Shows Base Price (USD) for line items */}
                                        <span className="font-mono text-gray-700">{formatBasePrice(item.price * item.quantity)}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-gray-100 pt-4 space-y-2 text-gray-600 mb-6">
                                <div className="flex justify-between text-sm">
                                    <span>Subtotal</span>
                                    {/* Subtotal converted */}
                                    <span>{formatPrice(subtotal)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span>Shipping</span>
                                    <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
                                </div>
                                <div className="flex justify-between font-bold text-black text-lg border-t border-gray-100 pt-4 mt-2">
                                    <span>Total ({currency})</span>
                                    <span>{formatPrice(total)}</span>
                                </div>
                            </div>

                            <button 
                                type="submit"
                                disabled={isProcessing}
                                className="w-full bg-black text-white py-4 rounded-full font-bold uppercase tracking-widest hover:bg-pink-500 transition-all shadow-lg hover:shadow-pink-300/50 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isProcessing ? 'Processing...' : 'Pay Now'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};