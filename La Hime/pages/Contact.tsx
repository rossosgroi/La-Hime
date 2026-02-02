import React, { useState } from 'react';
import { Mail, MapPin } from 'lucide-react';

export const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="pt-32 pb-24 min-h-screen bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="font-serif-display text-4xl lg:text-5xl mb-4 text-gray-900">Get in Touch</h1>
          <p className="text-gray-500">We'd love to hear from you. Send us a message!</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Info */}
          <div className="bg-white p-8 rounded-2xl shadow-sm space-y-8 h-fit">
             <div>
                <h3 className="font-bold text-xl mb-4 flex items-center gap-2 text-gray-900"><Mail className="text-pink-500"/> Email</h3>
                <p className="text-gray-600">contact@lahime.com</p>
                <p className="text-gray-600">press@lahime.com</p>
             </div>
             <div>
                <h3 className="font-bold text-xl mb-4 flex items-center gap-2 text-gray-900"><MapPin className="text-pink-500"/> Studio</h3>
                <p className="text-gray-600">Via Condotti 15</p>
                <p className="text-gray-600">00187 Rome, Italy</p>
             </div>
          </div>

          {/* Form */}
          <div className="bg-white p-8 rounded-2xl shadow-sm">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-4">
                  <Mail size={32} />
                </div>
                <h3 className="font-bold text-2xl mb-2 text-gray-900">Message Sent!</h3>
                <p className="text-gray-500">We'll get back to you as soon as possible.</p>
                <button onClick={() => setSubmitted(false)} className="mt-6 text-pink-500 underline">Send another</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                    <input type="text" required className="w-full px-4 py-3 rounded-lg bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-pink-200 transition-all outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                    <input type="text" required className="w-full px-4 py-3 rounded-lg bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-pink-200 transition-all outline-none" />
                  </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input type="email" required className="w-full px-4 py-3 rounded-lg bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-pink-200 transition-all outline-none" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                    <textarea rows={4} required className="w-full px-4 py-3 rounded-lg bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-pink-200 transition-all outline-none"></textarea>
                </div>
                <button type="submit" className="w-full bg-black text-white py-4 rounded-lg font-bold uppercase tracking-widest hover:bg-pink-500 transition-all">Send Message</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};