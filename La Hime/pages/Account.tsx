import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useShop, Address } from '../context/ShopContext';
import { LogOut, User, ShoppingBag, Heart, Key, Trash2, Shield, X, Smartphone, MapPin, Edit2, Settings, Globe, DollarSign, Languages, Check, AlertTriangle, Loader2 } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { motion, AnimatePresence } from 'framer-motion';

const EU_COUNTRIES = [
    "Austria", "Belgium", "Bulgaria", "Croatia", "Cyprus", "Czech Republic", 
    "Denmark", "Estonia", "Finland", "France", "Germany", "Greece", "Hungary", 
    "Ireland", "Italy", "Latvia", "Lithuania", "Luxembourg", "Malta", 
    "Netherlands", "Poland", "Portugal", "Romania", "Slovakia", "Slovenia", 
    "Spain", "Sweden"
];

export const Account: React.FC = () => {
  const { section } = useParams<{ section: string }>();
  const { user, logout, isAuthenticated, wishlist, updateUser, setCurrency, currency: globalCurrency } = useShop();
  const navigate = useNavigate();

  // Modal States
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  
  // Form States
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Structured Address State
  const [addressData, setAddressData] = useState<Address>({
      country: 'Italy',
      city: '',
      street: '',
      zipCode: ''
  });
  const [zipError, setZipError] = useState('');
  
  // Settings States
  const [selectedCurrency, setSelectedCurrency] = useState(globalCurrency);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [selectedCountry, setSelectedCountry] = useState('Italy');
  const [isSavingSettings, setIsSavingSettings] = useState(false);
  const [settingsSaved, setSettingsSaved] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
      // Initialize forms with user data
      if(user?.address) {
          setAddressData(user.address);
          setSelectedCountry(user.address.country);
      }
      setSelectedCurrency(globalCurrency);
  }, [user, globalCurrency]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleDeleteAccount = () => {
      logout();
      navigate('/');
  };

  const handleChangePassword = (e: React.FormEvent) => {
      e.preventDefault();
      setIsPasswordModalOpen(false);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      alert("Password updated successfully!");
  };

  // Basic Postal Code Validation
  // Checks for length 3-10, alphanumeric, no weird symbols, must contain at least one digit or match specific format patterns loosely
  const validateZip = (zip: string) => {
      const regex = /^[A-Z0-9\s-]{3,10}$/i;
      if (!regex.test(zip)) {
          return "Invalid format.";
      }
      // Simple check to ensure it's not just random letters (e.g. "asdfg") - most postcodes have digits
      // Exception: some very specific formats, but generally a mix or digit heavy.
      // We will just allow alphanumeric but enforce regex structure.
      return "";
  }

  const handleUpdateAddress = (e: React.FormEvent) => {
      e.preventDefault();
      const error = validateZip(addressData.zipCode);
      if (error) {
          setZipError(error);
          return;
      }
      setZipError('');
      updateUser({ address: addressData });
      setIsAddressModalOpen(false);
  }

  const handleSavePreferences = () => {
      setIsSavingSettings(true);
      
      // Simulate API delay
      setTimeout(() => {
        setCurrency(selectedCurrency);
        if(user) {
            updateUser({ address: { ...user.address, country: selectedCountry } as Address });
        }
        setIsSavingSettings(false);
        setSettingsSaved(true);

        // Reset saved state after 2 seconds
        setTimeout(() => setSettingsSaved(false), 2000);
      }, 800);
  }

  const maskEmail = (email: string) => {
      const [local, domain] = email.split('@');
      if (!local || !domain) return email;
      const visible = local.slice(0, 4);
      return `${visible}*****@${domain}`;
  };

  const formatAddressString = (addr?: Address) => {
      if (!addr) return "No address set";
      // Filter out empty strings to avoid trailing commas
      const parts = [addr.street, addr.city, addr.zipCode, addr.country].filter(p => p);
      return parts.length > 0 ? parts.join(', ') : "No address set";
  }

  if (!user) return null;

  return (
    <div className="pt-32 pb-24 min-h-screen bg-stone-50">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="font-serif-display text-4xl mb-8 text-gray-900">My Account</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar */}
          <div className="w-full lg:w-72 flex-shrink-0 bg-white p-6 rounded-2xl shadow-sm h-fit border border-gray-100 sticky top-32">
            <div className="mb-8 px-2 pb-6 border-b border-gray-100 flex items-center gap-4">
               <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center text-pink-500 font-bold text-xl">
                    {user.firstName ? user.firstName[0] : 'P'}
               </div>
               <div className="overflow-hidden">
                    <p className="text-xs text-gray-400 uppercase tracking-wider font-bold mb-1">Welcome back</p>
                    <p className="font-bold text-gray-900 truncate">{user.firstName || 'Princess'}</p>
               </div>
            </div>
            <nav className="space-y-2">
              <Link to="/account/profile" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${section === 'profile' ? 'bg-black text-white shadow-md' : 'text-gray-600 hover:bg-gray-50'}`}>
                <User size={18} /> Profile & Security
              </Link>
              <Link to="/account/orders" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${section === 'orders' ? 'bg-black text-white shadow-md' : 'text-gray-600 hover:bg-gray-50'}`}>
                <ShoppingBag size={18} /> Orders
              </Link>
              <Link to="/account/wishlist" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${section === 'wishlist' ? 'bg-black text-white shadow-md' : 'text-gray-600 hover:bg-gray-50'}`}>
                <Heart size={18} /> Wishlist <span className="ml-auto text-xs opacity-70 bg-white/20 px-2 py-0.5 rounded-full">{wishlist.length}</span>
              </Link>
              <Link to="/account/settings" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${section === 'settings' ? 'bg-black text-white shadow-md' : 'text-gray-600 hover:bg-gray-50'}`}>
                <Settings size={18} /> Settings
              </Link>
              <button 
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-red-50 hover:text-red-500 transition-colors text-left mt-6 border-t border-gray-100"
              >
                <LogOut size={18} /> Log Out
              </button>
            </nav>
          </div>

          {/* Content Area */}
          <div className="flex-1 min-h-[500px]">
             
             {section === 'profile' && (
               <div className="space-y-8">
                 {/* Personal Info Card */}
                 <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                    <h2 className="text-2xl font-bold mb-6 text-gray-900 flex items-center gap-2">
                        <User className="text-pink-500" /> Personal Details
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">First Name</label>
                            <input type="text" value={user.firstName || ''} readOnly className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:border-pink-500" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Last Name</label>
                            <input type="text" value={user.lastName || ''} readOnly className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:border-pink-500" />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Email Address</label>
                            <input type="text" value={maskEmail(user.email)} readOnly className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none cursor-not-allowed" />
                        </div>
                        <div className="md:col-span-2">
                            <div className="flex justify-between items-center mb-2">
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider">Address</label>
                                <button onClick={() => setIsAddressModalOpen(true)} className="text-xs font-bold text-pink-500 hover:text-black flex items-center gap-1">
                                    <Edit2 size={12} /> {user.address ? 'Change Address' : 'Add Address'}
                                </button>
                            </div>
                            <div className={`w-full px-4 py-3 rounded-xl border flex items-center gap-3 ${user.address ? 'bg-white border-gray-200' : 'bg-gray-50 border-dashed border-gray-300'}`}>
                                <MapPin size={18} className="text-gray-400 shrink-0" />
                                <span className={user.address ? "text-gray-900" : "text-gray-400 italic"}>
                                    {formatAddressString(user.address)}
                                </span>
                            </div>
                        </div>
                    </div>
                 </div>

                 {/* Security Card */}
                 <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                    <h2 className="text-2xl font-bold mb-6 text-gray-900 flex items-center gap-2">
                      <Shield className="text-pink-500" /> Security & Privacy
                    </h2>
                    
                    <div className="space-y-6">
                        <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:border-pink-200 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-blue-50 text-blue-600 rounded-full">
                                    <Key size={20} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900">Password</h3>
                                    <p className="text-sm text-gray-500">Last changed 3 months ago</p>
                                </div>
                            </div>
                            <button 
                                onClick={() => setIsPasswordModalOpen(true)}
                                className="px-4 py-2 bg-gray-900 text-white text-sm font-bold rounded-lg hover:bg-pink-600 transition-colors"
                            >
                                Change Password
                            </button>
                        </div>

                        <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:border-pink-200 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-purple-50 text-purple-600 rounded-full">
                                    <Smartphone size={20} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900">Two-Factor Authentication</h3>
                                    <p className="text-sm text-gray-500">Add an extra layer of security</p>
                                </div>
                            </div>
                            <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
                                <input type="checkbox" name="toggle" id="toggle" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer border-gray-300"/>
                                <label htmlFor="toggle" className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-gray-100">
                             <p className="text-sm text-gray-500 mb-4">Once you delete your account, there is no going back. Please be certain.</p>
                             <button 
                                onClick={() => setIsDeleteModalOpen(true)}
                                className="px-6 py-3 border border-red-200 text-red-600 rounded-xl text-sm font-bold hover:bg-red-50 transition-colors flex items-center gap-2"
                             >
                                <Trash2 size={16} /> Delete Account
                             </button>
                        </div>
                    </div>
                 </div>
               </div>
             )}

             {section === 'settings' && (
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 min-h-[400px]">
                    <h2 className="text-2xl font-bold mb-6 text-gray-900 border-b border-gray-100 pb-4 flex items-center gap-2">
                        <Settings className="text-pink-500" /> Preferences
                    </h2>
                    
                    <div className="space-y-8 max-w-xl">
                        <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
                             <div className="p-3 bg-pink-50 text-pink-500 rounded-full mt-1">
                                <Globe size={20} />
                             </div>
                             <div className="flex-1">
                                 <h3 className="font-bold text-gray-900 mb-2">Country / Region</h3>
                                 <p className="text-sm text-gray-500 mb-3">Select your shipping destination (European Union only).</p>
                                 <select 
                                    value={selectedCountry} 
                                    onChange={(e) => setSelectedCountry(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 focus:ring-2 focus:ring-pink-200 outline-none cursor-pointer text-gray-900"
                                 >
                                    {EU_COUNTRIES.map(country => (
                                        <option key={country} value={country} className="text-gray-900">{country}</option>
                                    ))}
                                 </select>
                             </div>
                        </div>

                        <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
                             <div className="p-3 bg-purple-50 text-purple-500 rounded-full mt-1">
                                <Languages size={20} />
                             </div>
                             <div className="flex-1">
                                 <h3 className="font-bold text-gray-900 mb-2">Language</h3>
                                 <p className="text-sm text-gray-500 mb-3">Choose your preferred language for the interface.</p>
                                 <select 
                                    value={selectedLanguage}
                                    onChange={(e) => setSelectedLanguage(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 focus:ring-2 focus:ring-pink-200 outline-none cursor-pointer text-gray-900"
                                 >
                                    <option value="English" className="text-gray-900">English</option>
                                 </select>
                             </div>
                        </div>

                        <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
                             <div className="p-3 bg-green-50 text-green-500 rounded-full mt-1">
                                <DollarSign size={20} />
                             </div>
                             <div className="flex-1">
                                 <h3 className="font-bold text-gray-900 mb-2">Currency</h3>
                                 <p className="text-sm text-gray-500 mb-3">Select the currency you want to shop in.</p>
                                 <select 
                                    value={selectedCurrency}
                                    onChange={(e) => setSelectedCurrency(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 focus:ring-2 focus:ring-pink-200 outline-none cursor-pointer text-gray-900"
                                 >
                                    <option value="EUR" className="text-gray-900">EUR (€)</option>
                                    <option value="USD" className="text-gray-900">USD ($)</option>
                                    <option value="GBP" className="text-gray-900">GBP (£)</option>
                                    <option value="JPY" className="text-gray-900">JPY (¥)</option>
                                    <option value="CNY" className="text-gray-900">CNY (¥)</option>
                                 </select>
                             </div>
                        </div>

                        <div className="pt-4 flex justify-end">
                            <button 
                                onClick={handleSavePreferences}
                                disabled={isSavingSettings || settingsSaved}
                                className={`
                                    px-8 py-3 rounded-full font-bold shadow-lg transition-all flex items-center gap-2
                                    ${settingsSaved ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-black text-white hover:bg-pink-600'}
                                    ${isSavingSettings ? 'opacity-80 cursor-wait' : ''}
                                `}
                            >
                                {isSavingSettings ? (
                                    <>
                                        <Loader2 size={18} className="animate-spin" /> Saving...
                                    </>
                                ) : settingsSaved ? (
                                    <>
                                        <Check size={18} /> Preferences Saved!
                                    </>
                                ) : (
                                    <>
                                        <Check size={18} /> Save Preferences
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
             )}

             {section === 'orders' && (
               <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 min-h-[400px]">
                 <h2 className="text-2xl font-bold mb-6 text-gray-900 border-b border-gray-100 pb-4">Order History</h2>
                 <div className="text-center py-20 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                    <ShoppingBag size={48} className="mx-auto text-gray-300 mb-4" />
                    <p className="text-gray-900 font-bold text-lg mb-2">No orders yet</p>
                    <p className="text-gray-500 mb-6">Looks like you haven't bought anything yet, Princess.</p>
                    <Link to="/shop" className="inline-block px-8 py-3 bg-black text-white rounded-full font-bold uppercase tracking-wider text-sm hover:bg-pink-600 transition-colors shadow-lg hover:shadow-pink-500/30">
                      Start Shopping
                    </Link>
                 </div>
               </div>
             )}

             {section === 'wishlist' && (
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 min-h-[400px]">
                    <h2 className="text-2xl font-bold mb-6 text-gray-900 border-b border-gray-100 pb-4 flex items-center gap-2">
                        <Heart className="text-pink-500" fill="currentColor" /> My Wishlist
                    </h2>
                    
                    {wishlist.length === 0 ? (
                        <div className="text-center py-20 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                            <Heart size={48} className="mx-auto text-gray-300 mb-4" />
                            <p className="text-gray-900 font-bold text-lg mb-2">Your wishlist is empty</p>
                            <p className="text-gray-500 mb-6">Start collecting your favorite looks.</p>
                            <Link to="/shop" className="inline-block px-8 py-3 bg-black text-white rounded-full font-bold uppercase tracking-wider text-sm hover:bg-pink-600 transition-colors shadow-lg hover:shadow-pink-500/30">
                                Explore Collection
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {wishlist.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    )}
                </div>
             )}
          </div>
        </div>
      </div>

      {/* CHANGE PASSWORD MODAL */}
      <AnimatePresence>
        {isPasswordModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-[90]">
                <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    exit={{ opacity: 0 }}
                    onClick={() => setIsPasswordModalOpen(false)}
                    className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                />
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="relative w-full max-w-md bg-white p-8 rounded-3xl shadow-2xl z-10 m-4"
                >
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-2xl font-bold text-gray-900">Change Password</h3>
                        <button onClick={() => setIsPasswordModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                            <X size={20} />
                        </button>
                    </div>
                    <form onSubmit={handleChangePassword} className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-900 mb-2">Current Password</label>
                            <input 
                                type="password" 
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-pink-200 transition-all outline-none text-gray-900" 
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-900 mb-2">New Password</label>
                            <input 
                                type="password" 
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-pink-200 transition-all outline-none text-gray-900" 
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-900 mb-2">Confirm New Password</label>
                            <input 
                                type="password" 
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-pink-200 transition-all outline-none text-gray-900" 
                                required
                            />
                        </div>
                        <div className="pt-4 flex gap-3">
                            <button 
                                type="button" 
                                onClick={() => setIsPasswordModalOpen(false)}
                                className="flex-1 py-3 font-bold text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
                            >
                                Cancel
                            </button>
                            <button 
                                type="submit" 
                                className="flex-1 py-3 bg-black text-white font-bold rounded-xl hover:bg-pink-600 transition-colors shadow-lg"
                            >
                                Update
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
        )}
      </AnimatePresence>

       {/* EDIT ADDRESS MODAL */}
       <AnimatePresence>
        {isAddressModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-[90]">
                <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    exit={{ opacity: 0 }}
                    onClick={() => setIsAddressModalOpen(false)}
                    className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                />
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="relative w-full max-w-lg bg-white p-8 rounded-3xl shadow-2xl z-10 m-4 max-h-[90vh] overflow-y-auto"
                >
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-2xl font-bold text-gray-900">Delivery Address</h3>
                        <button onClick={() => setIsAddressModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                            <X size={20} />
                        </button>
                    </div>
                    <form onSubmit={handleUpdateAddress} className="space-y-4">
                        <div className="bg-pink-50 p-4 rounded-xl mb-4 text-sm text-pink-800 flex items-start gap-2">
                            <MapPin size={16} className="mt-0.5 shrink-0" />
                            <p>This address will be used as your default shipping location.</p>
                        </div>
                        
                        <div>
                            <label className="block text-sm font-bold text-gray-900 mb-2">Country</label>
                            <select 
                                value={addressData.country}
                                onChange={(e) => setAddressData({...addressData, country: e.target.value})}
                                className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-pink-200 transition-all outline-none text-gray-900 cursor-pointer"
                            >
                                {EU_COUNTRIES.map(country => (
                                    <option key={country} value={country}>{country}</option>
                                ))}
                            </select>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                             <div>
                                <label className="block text-sm font-bold text-gray-900 mb-2">City</label>
                                <input 
                                    type="text"
                                    value={addressData.city}
                                    onChange={(e) => setAddressData({...addressData, city: e.target.value})}
                                    placeholder="Rome"
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-pink-200 transition-all outline-none text-gray-900" 
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-900 mb-2">Postcode</label>
                                <input 
                                    type="text"
                                    value={addressData.zipCode}
                                    onChange={(e) => {
                                        setAddressData({...addressData, zipCode: e.target.value});
                                        setZipError('');
                                    }}
                                    placeholder="00187"
                                    className={`w-full px-4 py-3 rounded-xl bg-gray-50 border focus:bg-white focus:ring-2 transition-all outline-none text-gray-900 ${zipError ? 'border-red-500 focus:ring-red-200' : 'border-transparent focus:ring-pink-200'}`}
                                    required
                                />
                                {zipError && <p className="text-red-500 text-xs mt-1">{zipError}</p>}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-900 mb-2">Street Address</label>
                            <input
                                type="text"
                                value={addressData.street}
                                onChange={(e) => setAddressData({...addressData, street: e.target.value})}
                                placeholder="Via Condotti 15"
                                className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-pink-200 transition-all outline-none text-gray-900" 
                                required
                            />
                        </div>

                        <div className="pt-4 flex gap-3">
                            <button 
                                type="button" 
                                onClick={() => setIsAddressModalOpen(false)}
                                className="flex-1 py-3 font-bold text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
                            >
                                Cancel
                            </button>
                            <button 
                                type="submit" 
                                className="flex-1 py-3 bg-black text-white font-bold rounded-xl hover:bg-pink-600 transition-colors shadow-lg"
                            >
                                Save Address
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
        )}
      </AnimatePresence>

      {/* DELETE ACCOUNT MODAL */}
      <AnimatePresence>
        {isDeleteModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-[90]">
                <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    exit={{ opacity: 0 }}
                    onClick={() => setIsDeleteModalOpen(false)}
                    className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                />
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="relative w-full max-w-md bg-white p-8 rounded-3xl shadow-2xl z-10 m-4 border-2 border-red-100"
                >
                    <div className="text-center mb-6">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center text-red-500 mx-auto mb-4">
                            <AlertTriangle size={32} />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Delete Account?</h3>
                        <p className="text-gray-500 leading-relaxed">
                            Are you sure you want to delete your account? This action is permanent and cannot be undone. All your order history and wishlist data will be lost.
                        </p>
                    </div>
                    
                    <div className="flex flex-col gap-3">
                        <button 
                            onClick={handleDeleteAccount}
                            className="w-full py-4 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600 transition-colors shadow-lg hover:shadow-red-500/30 uppercase tracking-wider"
                        >
                            Yes, Delete My Account
                        </button>
                        <button 
                            onClick={() => setIsDeleteModalOpen(false)}
                            className="w-full py-4 bg-gray-100 text-gray-900 font-bold rounded-xl hover:bg-gray-200 transition-colors uppercase tracking-wider"
                        >
                            Cancel
                        </button>
                    </div>
                </motion.div>
            </div>
        )}
      </AnimatePresence>

    </div>
  );
};