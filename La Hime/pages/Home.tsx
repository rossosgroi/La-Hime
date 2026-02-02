import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PRODUCTS } from '../constants';
import { ProductCard } from '../components/ProductCard';
import { ArrowRight, Check } from 'lucide-react';

// Custom Y2K 4-Point Star Component (Solid/Filled)
const Y2KStar = ({ className, size = 24 }: { className?: string; size?: number }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
  </svg>
);

export const Home: React.FC = () => {
  const featuredProducts = PRODUCTS.slice(0, 4);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  // Floating elements configuration
  // Removed one star from the right
  const floatingElements = [
    { icon: <Y2KStar size={28} className="text-pink-300" />, top: '15%', left: '10%', delay: 0 },
    { icon: <Y2KStar size={36} className="text-purple-300" />, top: '65%', left: '8%', delay: 1 },
    { icon: <Y2KStar size={24} className="text-pink-400" />, top: '25%', right: '15%', delay: 0.5 },
    // Removed the right-bottom star element
    { icon: <Y2KStar size={32} className="text-pink-400/60" />, top: '45%', left: '85%', delay: 2 },
  ];

  return (
    <div className="bg-white min-h-screen">
      
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden bg-gradient-to-b from-purple-50 via-pink-50 to-white">
        {/* Dynamic Gradient Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-pink-200/40 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-blue-200/40 via-transparent to-transparent" />
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] mix-blend-overlay"></div>

        {/* Floating Animated Elements */}
        {floatingElements.map((el, i) => (
          <motion.div
            key={i}
            className="absolute z-0 pointer-events-none"
            style={{ top: el.top, left: el.left, right: el.right }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.6, 1, 0.6],
              rotate: [0, 15, -15, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: el.delay
            }}
          >
            {el.icon}
          </motion.div>
        ))}

        {/* Hero Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            <motion.div
               initial={{ scale: 0.9, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               transition={{ delay: 0.2, duration: 0.8 }}
               className="mb-4 inline-block px-4 py-1 rounded-full border border-pink-200 bg-white/50 backdrop-blur-sm text-pink-500 text-sm font-bold tracking-widest uppercase"
            >
               The 2026 Collection
            </motion.div>

            <h1 className="font-brand text-7xl md:text-8xl lg:text-9xl text-gray-900 mb-6 drop-shadow-sm leading-tight pb-4 select-none">
              Sweet and <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 italic pr-8 pb-16 pt-4 inline-block">Spicy</span>
            </h1>
            
            <div className="flex gap-4 mt-8">
              <Link 
                to="/shop" 
                className="group relative inline-flex items-center gap-2 bg-black text-white px-10 py-5 rounded-full font-bold uppercase tracking-widest hover:bg-pink-500 transition-all duration-300 shadow-xl hover:shadow-pink-500/40 transform hover:-translate-y-1"
              >
                Shop New Arrivals
              </Link>
              <Link 
                to="/about" 
                className="group relative inline-flex items-center gap-2 bg-white text-black border border-gray-200 px-10 py-5 rounded-full font-bold uppercase tracking-widest hover:border-black transition-all duration-300 shadow-md transform hover:-translate-y-1"
              >
                Our Story
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Collection */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <h2 className="font-brand text-5xl text-gray-900 mb-2">New Drops</h2>
            <div className="h-1 w-20 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full"></div>
          </div>
          <Link to="/shop" className="hidden md:flex items-center gap-2 text-gray-500 hover:text-pink-600 transition-colors uppercase text-sm font-bold tracking-widest group">
            View All Collection
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        <div className="mt-12 text-center md:hidden">
           <Link to="/shop" className="inline-block border-b-2 border-black pb-1 uppercase font-bold text-sm tracking-widest">
            View All Collection
          </Link>
        </div>
      </section>

      {/* Aesthetic Break / Banner */}
      <section className="py-24 bg-black text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-purple-900/20 to-transparent pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
          <div className="order-2 md:order-1 relative group">
            <div className="absolute inset-0 bg-pink-500 rounded-t-full blur-2xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
            <img 
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop" 
              alt="Model Style" 
              className="relative w-full h-[500px] object-cover rounded-t-full border-4 border-white/20 hover:scale-[1.02] transition-transform duration-700"
            />
          </div>
          <div className="order-1 md:order-2 text-center md:text-left">
            <span className="text-pink-400 font-mono mb-4 block tracking-widest">/// THE LA HIME WAY</span>
            <h2 className="font-serif-display text-5xl md:text-6xl leading-tight mb-6">
              Modern Day <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-purple-300 font-brand">Princess</span>
            </h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              Bridging the gap between fantasy and reality. Our collection fuses the soft nostalgia of early 2000s Tokyo with a sharp, modern edge—crafted for those who aren't afraid to stand out.
            </p>
            <Link to="/about" className="text-white border-b border-pink-500 pb-1 hover:text-pink-400 transition-colors inline-flex items-center gap-2 group">
              Read Our Story <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 px-4 bg-pink-100/50">
        <div className="max-w-3xl mx-auto text-center p-12 bg-white/60 backdrop-blur-lg rounded-3xl border border-white shadow-xl relative overflow-hidden">
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
          
          <div className="flex items-center justify-center gap-3 mb-4 relative z-10">
             <Y2KStar className="text-pink-500" size={28} />
             <h2 className="font-brand text-4xl text-gray-800">Join the Club</h2>
             <Y2KStar className="text-pink-500" size={28} />
          </div>
          
          <p className="text-gray-600 mb-8 relative z-10">Get 10% off your first order plus early access to new drops.</p>
          
          {subscribed ? (
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-green-100 text-green-800 px-6 py-4 rounded-xl inline-flex items-center gap-2 relative z-10"
            >
              <Check size={20} />
              <span className="font-bold">You're on the list!</span>
            </motion.div>
          ) : (
            <form className="flex flex-col sm:flex-row gap-4 relative z-10" onSubmit={handleSubscribe}>
              <input 
                type="email" 
                placeholder="your@email.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 px-6 py-4 rounded-full bg-white border border-pink-200 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition-all placeholder:text-gray-400 text-gray-900"
              />
              <button className="bg-black text-white px-8 py-4 rounded-full font-bold uppercase tracking-wider hover:bg-pink-600 transition-colors shadow-lg hover:shadow-pink-500/30">
                Subscribe
              </button>
            </form>
          )}
        </div>
      </section>

    </div>
  );
};