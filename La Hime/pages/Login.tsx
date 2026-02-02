import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, ArrowRight, AlertCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';

export const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useShop();
  const navigate = useNavigate();

  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');

  const validateForm = () => {
    // Basic email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!email || !emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return false;
    }

    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters.');
      return false;
    }

    if (!isLogin && (!firstName.trim() || !lastName.trim())) {
      setError('Please enter your full name.');
      return false;
    }

    setError('');
    return true;
  };

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Create user object
      const userData = {
        email,
        firstName: isLogin ? 'Princess' : firstName, // Default name if login (simulated)
        lastName: isLogin ? '' : lastName,
      };

      login(userData);
      navigate('/account/profile');
    }
  };

  // Reset error when switching modes
  const switchMode = (mode: boolean) => {
    setIsLogin(mode);
    setError('');
    setPassword('');
  };

  return (
    <div className="h-screen overflow-hidden bg-stone-50 flex items-center justify-center px-4 pt-16">
      <div className="bg-white w-full max-w-md p-8 rounded-3xl shadow-xl border border-gray-100 max-h-[90vh] overflow-y-auto">
        
        <div className="text-center mb-8">
          <img src="/logo/logo.png" alt="La Hime" className="mx-auto w-[140px] h-auto mb-2" />
          <p className="text-gray-500">{isLogin ? 'Welcome back' : 'Welcome to the club'}</p>
        </div>

        {/* Toggle */}
        <div className="flex p-1 bg-gray-50 rounded-full mb-8 relative">
          <motion.div 
            className="absolute top-1 bottom-1 w-1/2 bg-white rounded-full shadow-sm border border-gray-100"
            animate={{ left: isLogin ? '4px' : '50%' }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
          <button 
            className={`flex-1 py-3 text-sm font-bold uppercase tracking-wider relative z-10 transition-colors ${isLogin ? 'text-black' : 'text-gray-400'}`}
            onClick={() => switchMode(true)}
          >
            Sign In
          </button>
          <button 
            className={`flex-1 py-3 text-sm font-bold uppercase tracking-wider relative z-10 transition-colors ${!isLogin ? 'text-black' : 'text-gray-400'}`}
            onClick={() => switchMode(false)}
          >
            Register
          </button>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-3 bg-red-50 border border-red-100 rounded-xl flex items-center gap-2 text-red-600 text-sm font-medium"
          >
            <AlertCircle size={16} />
            {error}
          </motion.div>
        )}

        <AnimatePresence mode="wait">
          {isLogin ? (
            <motion.form 
              key="login"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-6"
              onSubmit={handleAuth}
            >
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Email</label>
                <input 
                  type="email" 
                  placeholder="princess@lahime.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-pink-200 transition-all outline-none text-gray-900 placeholder-gray-400" 
                />
              </div>
              <div>
                 <div className="flex justify-between mb-2">
                    <label className="block text-sm font-bold text-gray-900">Password</label>
                    <a href="#" className="text-xs text-gray-400 hover:text-pink-500">Forgot?</a>
                 </div>
                <div className="relative">
                  <input 
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-pink-200 transition-all outline-none text-gray-900" 
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              <button className="w-full bg-black text-white py-4 rounded-full font-bold uppercase tracking-widest hover:bg-pink-500 transition-all shadow-lg hover:shadow-pink-300/50 flex items-center justify-center gap-2 group">
                Sign In <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform"/>
              </button>
            </motion.form>
          ) : (
             <motion.form 
              key="register"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
              onSubmit={handleAuth}
            >
              <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">First Name</label>
                    <input 
                      type="text" 
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-pink-200 transition-all outline-none text-gray-900" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">Last Name</label>
                    <input 
                      type="text" 
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-pink-200 transition-all outline-none text-gray-900" 
                    />
                  </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Email</label>
                <input 
                  type="email" 
                  placeholder="princess@lahime.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-pink-200 transition-all outline-none text-gray-900 placeholder-gray-400" 
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Password</label>
                <div className="relative">
                  <input 
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-pink-200 transition-all outline-none text-gray-900" 
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              <button className="w-full bg-pink-500 text-white py-4 rounded-full font-bold uppercase tracking-widest hover:bg-black transition-all shadow-lg hover:shadow-pink-500/30 flex items-center justify-center gap-2 group">
                Create Account <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform"/>
              </button>
            </motion.form>
          )}
        </AnimatePresence>

        <div className="mt-8 text-center">
            <p className="text-gray-400 text-sm">By continuing, you agree to our <Link to="/terms" className="underline hover:text-black">Terms</Link> and <Link to="/privacy" className="underline hover:text-black">Privacy Policy</Link>.</p>
        </div>

      </div>
    </div>
  );
};