import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import Button from '../components/Button';
import { User, Package, RotateCcw, Settings, LogOut, ChevronRight, HelpCircle, X, Edit2, Lock, Phone, Mail, MapPin } from 'lucide-react';

// Modal Component
const Modal: React.FC<{ isOpen: boolean; onClose: () => void; title: string; children: React.ReactNode }> = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-rot-black/60 backdrop-blur-sm" onClick={onClose} />
            <div className="relative bg-sweet-cream w-full max-w-md p-8 border border-rot-black shadow-2xl animate-fade-in max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6 border-b border-rot-black/10 pb-4">
                    <h3 className="font-decay text-2xl text-rot-black">{title}</h3>
                    <button onClick={onClose} className="hover:text-rot-red transition-colors"><X size={24} /></button>
                </div>
                {children}
            </div>
        </div>
    );
};

const COUNTRIES = [
    "Austria", "Belgium", "Bulgaria", "Croatia", "Cyprus", "Czech Republic", 
    "Denmark", "Estonia", "Finland", "France", "Germany", "Greece", "Hungary", 
    "Ireland", "Italy", "Latvia", "Lithuania", "Luxembourg", "Malta", "Netherlands", 
    "Poland", "Portugal", "Romania", "Slovakia", "Slovenia", "Spain", "Sweden", 
    "United Kingdom", "Switzerland"
];

const Profile: React.FC = () => {
  const { isLoggedIn, login, logout } = useStore();
  const [searchParams] = useSearchParams();
  
  // Auth Form State
  const [authMode, setAuthMode] = useState<'login' | 'register' | 'forgot'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Dashboard State
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'returns' | 'settings' | 'help'>('overview');

  // User Data State (Mock)
  const [userData, setUserData] = useState({
      firstName: 'Sweet',
      lastName: 'Doll',
      email: 'doll@sweetrot.com',
      phone: '+33 6 12 34 56 78',
      address: {
          street: '123 Rue de la Pourriture',
          city: 'Paris',
          zip: '75011',
          country: 'France'
      }
  });

  // Settings Modals State
  const [activeModal, setActiveModal] = useState<'none' | 'email' | 'password' | 'phone' | 'details' | 'address'>('none');
  const [tempData, setTempData] = useState({ ...userData });

  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam && ['overview', 'orders', 'returns', 'settings', 'help'].includes(tabParam)) {
        setActiveTab(tabParam as any);
    }
  }, [searchParams]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
        setError('Please fill in all fields.');
        return;
    }
    setError('');
    login();
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !name) {
        setError('All fields are required.');
        return;
    }
    setError('');
    login();
  };

  const handleForgot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
        setError('Please enter your email.');
        return;
    }
    setError('');
    setSuccessMsg('Reset link sent to your email.');
  };

  const saveDetails = () => {
      setUserData({ ...tempData });
      setActiveModal('none');
  };

  const handleAddressChange = (field: keyof typeof userData.address, value: string) => {
      setTempData(prev => ({
          ...prev,
          address: {
              ...prev.address,
              [field]: value
          }
      }));
  };

  // Helper for numeric input
  const handleZipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      if (/^\d*$/.test(val)) {
          handleAddressChange('zip', val);
      }
  };

  if (!isLoggedIn) {
    return (
      <div className="pt-32 pb-20 min-h-screen bg-sweet-cream flex items-center justify-center px-4">
        <div className="w-full max-w-md border border-rot-black/10 bg-sweet-cream/50 p-8 md:p-12 relative overflow-hidden">
            {/* Decorative corners */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-rot-black" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-rot-black" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-rot-black" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-rot-black" />

            {authMode === 'login' && (
                <div className="animate-fade-in">
                    <h1 className="font-decay text-4xl text-center mb-2">Welcome Back</h1>
                    <p className="text-center text-gray-500 mb-8 font-serif italic">The rot missed you.</p>
                    
                    {error && <div className="bg-red-50 text-red-600 text-sm p-3 mb-4 border border-red-100">{error}</div>}

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest mb-1 text-gray-600">Email</label>
                            <input 
                                type="email" 
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                className="w-full bg-transparent border-b border-gray-300 p-2 focus:outline-none focus:border-rot-black transition-colors placeholder-gray-400" 
                                placeholder="doll@sweetrot.com" 
                            />
                        </div>
                        <div>
                            <div className="flex justify-between items-center mb-1">
                                <label className="block text-xs font-bold uppercase tracking-widest text-gray-600">Password</label>
                                <button type="button" onClick={() => setAuthMode('forgot')} className="text-xs text-gray-400 hover:text-sweet-pink">Forgot?</button>
                            </div>
                            <input 
                                type="password" 
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                className="w-full bg-transparent border-b border-gray-300 p-2 focus:outline-none focus:border-rot-black transition-colors placeholder-gray-400" 
                                placeholder="••••••••" 
                            />
                        </div>
                        <Button type="submit" className="w-full mt-6">Enter</Button>
                    </form>
                    <div className="mt-6 text-center text-sm">
                        No account? <button onClick={() => setAuthMode('register')} className="font-bold underline hover:text-sweet-pink">Join the decay</button>
                    </div>
                </div>
            )}

            {authMode === 'register' && (
                <div className="animate-fade-in">
                    <h1 className="font-decay text-4xl text-center mb-2">Join Us</h1>
                    <p className="text-center text-gray-500 mb-8 font-serif italic">Become one with the rot.</p>

                    {error && <div className="bg-red-50 text-red-600 text-sm p-3 mb-4 border border-red-100">{error}</div>}

                    <form onSubmit={handleRegister} className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest mb-1 text-gray-600">Name</label>
                            <input 
                                type="text" 
                                value={name}
                                onChange={e => setName(e.target.value)}
                                className="w-full bg-transparent border-b border-gray-300 p-2 focus:outline-none focus:border-rot-black transition-colors placeholder-gray-400" 
                                placeholder="Your Name" 
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest mb-1 text-gray-600">Email</label>
                            <input 
                                type="email" 
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                className="w-full bg-transparent border-b border-gray-300 p-2 focus:outline-none focus:border-rot-black transition-colors placeholder-gray-400" 
                                placeholder="doll@sweetrot.com" 
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest mb-1 text-gray-600">Password</label>
                            <input 
                                type="password" 
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                className="w-full bg-transparent border-b border-gray-300 p-2 focus:outline-none focus:border-rot-black transition-colors placeholder-gray-400" 
                                placeholder="••••••••" 
                            />
                        </div>
                        <Button type="submit" className="w-full mt-6">Create Account</Button>
                    </form>
                    <div className="mt-6 text-center text-sm">
                        Already infected? <button onClick={() => setAuthMode('login')} className="font-bold underline hover:text-sweet-pink">Sign In</button>
                    </div>
                </div>
            )}

            {authMode === 'forgot' && (
                <div className="animate-fade-in">
                    <h1 className="font-decay text-3xl text-center mb-2">Recover Password</h1>
                    <p className="text-center text-gray-500 mb-8 font-serif italic">Lost in the dark?</p>

                    {error && <div className="bg-red-50 text-red-600 text-sm p-3 mb-4 border border-red-100">{error}</div>}
                    {successMsg ? (
                        <div className="bg-green-50 text-green-800 text-sm p-4 mb-4 text-center border border-green-100">
                            {successMsg}
                            <div className="mt-4">
                                <button onClick={() => setAuthMode('login')} className="underline font-bold">Back to Login</button>
                            </div>
                        </div>
                    ) : (
                        <form onSubmit={handleForgot} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest mb-1 text-gray-600">Email</label>
                                <input 
                                    type="email" 
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    className="w-full bg-transparent border-b border-gray-300 p-2 focus:outline-none focus:border-rot-black transition-colors placeholder-gray-400" 
                                    placeholder="doll@sweetrot.com" 
                                />
                            </div>
                            <Button type="submit" className="w-full mt-6">Send Reset Link</Button>
                        </form>
                    )}
                    {!successMsg && (
                        <div className="mt-6 text-center text-sm">
                            <button onClick={() => setAuthMode('login')} className="underline hover:text-sweet-pink">Cancel</button>
                        </div>
                    )}
                </div>
            )}
        </div>
      </div>
    );
  }

  // Dashboard View
  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'orders', label: 'Orders', icon: Package },
    { id: 'returns', label: 'Returns', icon: RotateCcw },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'help', label: 'Help', icon: HelpCircle },
  ];

  return (
    <div className="pt-24 min-h-screen bg-sweet-cream">
        {/* Modals */}
        <Modal isOpen={activeModal === 'email'} onClose={() => setActiveModal('none')} title="Change Email">
            <div className="space-y-4">
                <input 
                    type="email" 
                    placeholder="New Email Address" 
                    className="w-full bg-transparent border-b border-gray-400 p-2 focus:border-rot-black outline-none"
                    value={tempData.email}
                    onChange={(e) => setTempData({...tempData, email: e.target.value})}
                />
                 <input 
                    type="password" 
                    placeholder="Current Password for confirmation" 
                    className="w-full bg-transparent border-b border-gray-400 p-2 focus:border-rot-black outline-none"
                />
                <Button onClick={saveDetails} className="w-full mt-4">Update Email</Button>
            </div>
        </Modal>

        <Modal isOpen={activeModal === 'phone'} onClose={() => setActiveModal('none')} title="Add Phone Number">
             <div className="space-y-4">
                <p className="text-sm text-gray-500 mb-2">We'll only use this for shipping updates.</p>
                <input 
                    type="tel" 
                    placeholder="+33 0 00 00 00 00" 
                    className="w-full bg-transparent border-b border-gray-400 p-2 focus:border-rot-black outline-none"
                    value={tempData.phone}
                    onChange={(e) => setTempData({...tempData, phone: e.target.value})}
                />
                <Button onClick={saveDetails} className="w-full mt-4">Save Phone Number</Button>
            </div>
        </Modal>

        <Modal isOpen={activeModal === 'password'} onClose={() => setActiveModal('none')} title="Change Password">
             <div className="space-y-4">
                <input type="password" placeholder="Current Password" className="w-full bg-transparent border-b border-gray-400 p-2 focus:border-rot-black outline-none"/>
                <input type="password" placeholder="New Password" className="w-full bg-transparent border-b border-gray-400 p-2 focus:border-rot-black outline-none"/>
                <input type="password" placeholder="Confirm New Password" className="w-full bg-transparent border-b border-gray-400 p-2 focus:border-rot-black outline-none"/>
                <Button onClick={() => setActiveModal('none')} className="w-full mt-4">Update Password</Button>
            </div>
        </Modal>

        <Modal isOpen={activeModal === 'details'} onClose={() => setActiveModal('none')} title="Personal Details">
            <div className="space-y-4">
                 <div className="grid grid-cols-2 gap-4">
                    <input 
                        type="text" 
                        placeholder="First Name" 
                        className="w-full bg-transparent border-b border-gray-400 p-2 focus:border-rot-black outline-none"
                        value={tempData.firstName}
                        onChange={(e) => setTempData({...tempData, firstName: e.target.value})}
                    />
                    <input 
                        type="text" 
                        placeholder="Last Name" 
                        className="w-full bg-transparent border-b border-gray-400 p-2 focus:border-rot-black outline-none"
                        value={tempData.lastName}
                        onChange={(e) => setTempData({...tempData, lastName: e.target.value})}
                    />
                 </div>
                 <Button onClick={saveDetails} className="w-full mt-4">Save Details</Button>
            </div>
        </Modal>

        <Modal isOpen={activeModal === 'address'} onClose={() => setActiveModal('none')} title="Edit Address">
            <div className="space-y-4">
                <div>
                    <label className="block text-xs font-bold uppercase tracking-widest mb-1 text-gray-500">Country/Region</label>
                    <div className="relative">
                        <select 
                            className="w-full bg-transparent border-b border-gray-400 p-2 focus:border-rot-black outline-none appearance-none"
                            value={tempData.address.country}
                            onChange={(e) => handleAddressChange('country', e.target.value)}
                        >
                            {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                        <ChevronRight className="absolute right-2 top-3 rotate-90 pointer-events-none" size={14} />
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-bold uppercase tracking-widest mb-1 text-gray-500">Street Address</label>
                    <input 
                        type="text" 
                        placeholder="123 Example Street" 
                        className="w-full bg-transparent border-b border-gray-400 p-2 focus:border-rot-black outline-none"
                        value={tempData.address.street}
                        onChange={(e) => handleAddressChange('street', e.target.value)}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest mb-1 text-gray-500">Postal Code</label>
                        <input 
                            type="text" 
                            inputMode="numeric"
                            placeholder="00000" 
                            className="w-full bg-transparent border-b border-gray-400 p-2 focus:border-rot-black outline-none"
                            value={tempData.address.zip}
                            onChange={handleZipChange}
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest mb-1 text-gray-500">City</label>
                        <input 
                            type="text" 
                            placeholder="City" 
                            className="w-full bg-transparent border-b border-gray-400 p-2 focus:border-rot-black outline-none"
                            value={tempData.address.city}
                            onChange={(e) => handleAddressChange('city', e.target.value)}
                        />
                    </div>
                </div>

                <Button onClick={saveDetails} className="w-full mt-6">Save Address</Button>
            </div>
        </Modal>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="font-decay text-5xl mb-8">My <span className="text-rot-red">Account</span></h1>
            
            <div className="flex flex-col md:flex-row gap-12">
                {/* Sidebar Nav */}
                <aside className="w-full md:w-64 shrink-0">
                    <div className="bg-transparent p-0 md:border-r border-rot-black/10 min-h-[50vh]">
                        <div className="flex items-center gap-4 mb-12">
                            <div className="w-16 h-16 bg-rot-black rounded-full flex items-center justify-center text-sweet-pink shadow-lg">
                                <span className="font-decay text-2xl">{userData.firstName[0]}</span>
                            </div>
                            <div>
                                <p className="font-bold text-lg font-serif italic">{userData.firstName} {userData.lastName}</p>
                                <p className="text-xs text-gray-500 uppercase tracking-wider">Sick Member</p>
                            </div>
                        </div>
                        <nav className="space-y-2">
                            {tabs.map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id as any)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-bold uppercase tracking-wide transition-all duration-300 border-l-2 ${
                                        activeTab === tab.id 
                                        ? 'border-rot-red text-rot-black pl-6' 
                                        : 'border-transparent text-gray-500 hover:text-rot-black hover:pl-6'
                                    }`}
                                >
                                    <tab.icon size={18} /> {tab.label}
                                </button>
                            ))}
                            <div className="pt-8 mt-8 border-t border-rot-black/5">
                                <button
                                    onClick={logout}
                                    className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold uppercase tracking-wide text-red-800 hover:text-red-600 transition-colors"
                                >
                                    <LogOut size={18} /> Log Out
                                </button>
                            </div>
                        </nav>
                    </div>
                </aside>

                {/* Main Content */}
                <div className="flex-1 min-h-[600px]">
                    {activeTab === 'overview' && (
                        <div className="space-y-8 animate-fade-in">
                            <div className="border border-rot-black/5 bg-white/40 p-8 shadow-sm">
                                <h2 className="font-serif italic text-3xl mb-4">Hello, {userData.firstName}</h2>
                                <p className="text-gray-600 mb-8 max-w-2xl leading-relaxed">
                                    Welcome to your personal decay dashboard. Here you can track your recent orders, manage your shipping and billing addresses, and edit your password and account details.
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    <div className="bg-sweet-cream border border-rot-black/10 p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:border-rot-black hover:shadow-md transition-all group" onClick={() => setActiveTab('orders')}>
                                        <Package className="mb-4 text-gray-400 group-hover:text-rot-black transition-colors" size={32} />
                                        <span className="font-bold text-sm uppercase tracking-widest">3 Orders</span>
                                        <span className="text-xs text-gray-500 mt-1">1 In Transit</span>
                                    </div>
                                    <div className="bg-sweet-cream border border-rot-black/10 p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:border-rot-black hover:shadow-md transition-all group" onClick={() => setActiveTab('settings')}>
                                        <User className="mb-4 text-gray-400 group-hover:text-rot-black transition-colors" size={32} />
                                        <span className="font-bold text-sm uppercase tracking-widest">Profile</span>
                                        <span className="text-xs text-gray-500 mt-1">Edit Details</span>
                                    </div>
                                    <div className="bg-sweet-cream border border-rot-black/10 p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:border-rot-black hover:shadow-md transition-all group" onClick={() => setActiveTab('help')}>
                                        <HelpCircle className="mb-4 text-gray-400 group-hover:text-rot-black transition-colors" size={32} />
                                        <span className="font-bold text-sm uppercase tracking-widest">Help</span>
                                        <span className="text-xs text-gray-500 mt-1">FAQ & Support</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'orders' && (
                        <div className="space-y-6 animate-fade-in">
                             <h2 className="font-decay text-3xl mb-6 border-b border-rot-black/10 pb-4">Order History</h2>
                             {[
                                { id: '#SR-9921', date: 'Oct 12, 2023', status: 'Delivered', total: '€240.00', items: ['Bruised Peach Corset', 'Venom Gloss'] },
                                { id: '#SR-9844', date: 'Sep 28, 2023', status: 'Processing', total: '€85.00', items: ['Distressed Chic Pleated Skirt'] },
                             ].map(order => (
                                 <div key={order.id} className="bg-white/40 border border-rot-black/5 p-6 flex flex-col md:flex-row justify-between gap-6 hover:border-rot-black/20 transition-all">
                                     <div className="space-y-2">
                                         <div className="flex items-center gap-3">
                                            <span className="font-bold text-lg font-serif italic">{order.id}</span>
                                            <span className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest border ${order.status === 'Delivered' ? 'border-green-800 text-green-900 bg-green-50' : 'border-yellow-600 text-yellow-900 bg-yellow-50'}`}>
                                                {order.status}
                                            </span>
                                         </div>
                                         <p className="text-xs text-gray-500 uppercase tracking-widest">{order.date}</p>
                                         <p className="text-sm text-gray-800 mt-2">{order.items.join(', ')}</p>
                                     </div>
                                     <div className="flex flex-col justify-between items-end">
                                         <span className="font-bold text-xl">{order.total}</span>
                                         <Button variant="ghost" className="text-xs px-0 h-auto hover:bg-transparent">View Invoice</Button>
                                     </div>
                                 </div>
                             ))}
                        </div>
                    )}

                    {activeTab === 'returns' && (
                        <div className="animate-fade-in bg-white/40 p-8 border border-rot-black/5 text-center py-20">
                            <RotateCcw className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                            <h3 className="font-serif italic text-xl mb-2">No Active Returns</h3>
                            <p className="text-gray-500 mb-6">You have no return requests in progress.</p>
                            <Button onClick={() => setActiveTab('orders')}>Create Return</Button>
                        </div>
                    )}

                    {activeTab === 'settings' && (
                        <div className="animate-fade-in max-w-3xl">
                            <h2 className="font-decay text-3xl mb-8 border-b border-rot-black/10 pb-4">Account Settings</h2>
                            
                            <div className="space-y-6">
                                {/* Personal Info Card */}
                                <div className="bg-white/40 border border-rot-black/5 p-6">
                                    <div className="flex justify-between items-start mb-6">
                                        <h3 className="font-bold uppercase tracking-widest text-sm text-gray-500">Personal Details</h3>
                                        <button onClick={() => { setTempData(userData); setActiveModal('details'); }} className="text-rot-black hover:text-sweet-pink transition-colors">
                                            <Edit2 size={16} />
                                        </button>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div>
                                            <p className="text-xs text-gray-400 uppercase mb-1">Name</p>
                                            <p className="font-serif text-lg">{userData.firstName} {userData.lastName}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Address Book Card */}
                                <div className="bg-white/40 border border-rot-black/5 p-6">
                                    <div className="flex justify-between items-start mb-6">
                                        <h3 className="font-bold uppercase tracking-widest text-sm text-gray-500">Address Book</h3>
                                        <button onClick={() => { setTempData(userData); setActiveModal('address'); }} className="text-rot-black hover:text-sweet-pink transition-colors">
                                            <Edit2 size={16} />
                                        </button>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <MapPin className="text-gray-400 mt-1" size={20} />
                                        <div>
                                            <p className="font-bold text-sm mb-1">Default Shipping</p>
                                            <p className="font-serif italic text-lg">{userData.address.country}</p>
                                            <p className="text-sm text-gray-600">
                                                {userData.address.street}<br/>
                                                {userData.address.zip} {userData.address.city}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Contact Info Card */}
                                <div className="bg-white/40 border border-rot-black/5 p-6">
                                    <h3 className="font-bold uppercase tracking-widest text-sm text-gray-500 mb-6">Contact Info</h3>
                                    <div className="space-y-6">
                                        <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                                            <div className="flex items-center gap-4">
                                                <Mail className="text-gray-400" size={20} />
                                                <div>
                                                    <p className="text-xs text-gray-400 uppercase mb-0.5">Email Address</p>
                                                    <p className="font-medium">{userData.email}</p>
                                                </div>
                                            </div>
                                            <Button variant="outline" className="px-4 py-2 text-xs h-auto" onClick={() => { setTempData(userData); setActiveModal('email'); }}>Change</Button>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center gap-4">
                                                <Phone className="text-gray-400" size={20} />
                                                <div>
                                                    <p className="text-xs text-gray-400 uppercase mb-0.5">Phone Number</p>
                                                    <p className="font-medium">{userData.phone || 'Not provided'}</p>
                                                </div>
                                            </div>
                                            <Button variant="outline" className="px-4 py-2 text-xs h-auto" onClick={() => { setTempData(userData); setActiveModal('phone'); }}>
                                                {userData.phone ? 'Edit' : 'Add'}
                                            </Button>
                                        </div>
                                    </div>
                                </div>

                                {/* Security Card */}
                                <div className="bg-white/40 border border-rot-black/5 p-6">
                                    <h3 className="font-bold uppercase tracking-widest text-sm text-gray-500 mb-6">Security</h3>
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-4">
                                            <Lock className="text-gray-400" size={20} />
                                            <div>
                                                <p className="text-xs text-gray-400 uppercase mb-0.5">Password</p>
                                                <p className="font-medium">••••••••••••</p>
                                            </div>
                                        </div>
                                        <Button variant="outline" className="px-4 py-2 text-xs h-auto" onClick={() => setActiveModal('password')}>Update</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'help' && (
                        <div className="animate-fade-in">
                             <h2 className="font-decay text-3xl mb-8 border-b border-rot-black/10 pb-4">Customer Care</h2>
                             <div className="space-y-4 max-w-3xl">
                                 <details className="group border border-rot-black/5 bg-white/40 p-6 open:bg-white/80 transition-colors cursor-pointer">
                                     <summary className="flex justify-between items-center font-bold list-none text-lg font-serif italic">
                                         How do I track my order? <ChevronRight className="group-open:rotate-90 transition-transform"/>
                                     </summary>
                                     <p className="mt-4 text-gray-600 leading-relaxed">
                                         Once your order ships, you’ll receive an email with a tracking link. You can also view status in the "Orders" tab.
                                     </p>
                                 </details>
                                 <details className="group border border-rot-black/5 bg-white/40 p-6 open:bg-white/80 transition-colors cursor-pointer">
                                     <summary className="flex justify-between items-center font-bold list-none text-lg font-serif italic">
                                         What is your return policy? <ChevronRight className="group-open:rotate-90 transition-transform"/>
                                     </summary>
                                     <p className="mt-4 text-gray-600 leading-relaxed">
                                         We accept returns within 14 days of delivery. Items must be unworn and in original packaging. Distressed items are intentionally damaged; this is not a defect.
                                     </p>
                                 </details>
                                 <div className="pt-8 mt-8 border-t border-rot-black/10">
                                     <h3 className="font-serif italic text-xl mb-4">Still need help?</h3>
                                     <p className="text-gray-600 mb-6">Our support team is available Mon-Fri.</p>
                                     <Button variant="outline">Contact Support</Button>
                                 </div>
                             </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </div>
  );
};

export default Profile;