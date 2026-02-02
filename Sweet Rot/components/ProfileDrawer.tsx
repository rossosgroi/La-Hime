import React from 'react';
import { X, Package, RotateCcw, Settings, LogOut, User } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import Button from './Button';
import { Link } from 'react-router-dom';

const ProfileDrawer: React.FC = () => {
  const { isProfileOpen, closeProfile, isLoggedIn, login, logout } = useStore();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login();
  };

  return (
    <>
      <div 
        className={`fixed inset-0 bg-rot-black/60 backdrop-blur-sm z-40 transition-opacity duration-500 ${isProfileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={closeProfile}
      />
      
      <div className={`fixed top-0 right-0 h-full w-full sm:w-[450px] bg-sweet-cream z-50 transform transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] shadow-2xl ${isProfileOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
            
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-white">
                <h2 className="font-decay text-3xl text-rot-black">Account</h2>
                <button onClick={closeProfile} className="text-rot-black hover:text-rot-red transition-colors">
                    <X size={24} />
                </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-8">
                {isLoggedIn ? (
                    <div className="space-y-8 animate-fade-in">
                        <div className="flex items-center gap-4 pb-6 border-b border-gray-200">
                            <div className="w-16 h-16 bg-rot-black rounded-full flex items-center justify-center text-sweet-pink">
                                <User size={32} />
                            </div>
                            <div>
                                <h3 className="font-serif italic text-2xl">Welcome, Doll</h3>
                                <p className="text-sm text-gray-500">sweet_rot_fan@example.com</p>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Link to="/profile?tab=orders" onClick={closeProfile} className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50 border border-transparent hover:border-rot-black transition-all group">
                                <span className="flex items-center gap-3 font-bold uppercase text-sm tracking-widest"><Package size={18} /> Orders</span>
                                <span className="text-gray-400 group-hover:text-rot-black">3 Active</span>
                            </Link>
                            <Link to="/profile?tab=returns" onClick={closeProfile} className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50 border border-transparent hover:border-rot-black transition-all group">
                                <span className="flex items-center gap-3 font-bold uppercase text-sm tracking-widest"><RotateCcw size={18} /> Returns</span>
                            </Link>
                             <Link to="/profile?tab=settings" onClick={closeProfile} className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50 border border-transparent hover:border-rot-black transition-all group">
                                <span className="flex items-center gap-3 font-bold uppercase text-sm tracking-widest"><Settings size={18} /> Settings</span>
                            </Link>
                        </div>
                        
                        <button 
                            onClick={() => { logout(); closeProfile(); }}
                            className="text-red-600 text-sm font-bold uppercase tracking-widest flex items-center gap-2 mt-8 hover:opacity-70"
                        >
                            <LogOut size={16} /> Log Out
                        </button>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div className="text-center mb-8">
                            <h3 className="font-serif italic text-2xl mb-2">Access the Decay</h3>
                            <p className="text-sm text-gray-500">Log in to manage orders and view your wishlist.</p>
                        </div>
                        
                        <form onSubmit={handleLogin} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest mb-1">Email</label>
                                <input type="email" className="w-full border border-gray-300 p-3 focus:outline-none focus:border-rot-black bg-white" placeholder="you@example.com" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest mb-1">Password</label>
                                <input type="password" className="w-full border border-gray-300 p-3 focus:outline-none focus:border-rot-black bg-white" placeholder="••••••••" />
                            </div>
                            <Button type="submit" className="w-full mt-4">Sign In</Button>
                        </form>
                        
                        <div className="text-center pt-4">
                            <button className="text-xs text-gray-500 underline hover:text-rot-black">Forgot Password?</button>
                            <div className="mt-4 text-sm">
                                New here? <Link to="/profile" onClick={closeProfile} className="font-bold underline hover:text-sweet-pink">Create an account</Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
      </div>
    </>
  );
};

export default ProfileDrawer;