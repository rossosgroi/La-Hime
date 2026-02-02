import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

export const About: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-32 pb-24 min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-6">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <p className="text-2xl md:text-3xl font-serif-display text-gray-800 italic">
            "Sweet with a Bite."
          </p>
        </motion.div>

        {/* The Name Section */}
        <div className="grid md:grid-cols-2 gap-16 items-center mb-32">
             <motion.div 
               initial={{ opacity: 0, x: -30 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
             >
                <h2 className="font-bold text-sm text-pink-500 mb-6 uppercase tracking-[0.2em]">The Origin</h2>
                <h3 className="font-serif-display text-4xl text-gray-900 mb-8">Defining the Aesthetic</h3>
                <p className="text-gray-600 leading-relaxed text-lg mb-8">
                    The name <span className="font-bold text-gray-900">La Hime</span> is a linguistic fusion representing the duality of our style—a bridge between two dominant East Asian youth aesthetics.
                </p>
                
                <div className="space-y-8">
                    <div className="flex items-start gap-6 group">
                        <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center text-3xl font-serif-display shrink-0 group-hover:bg-pink-500 transition-colors">
                            辣
                        </div>
                        <div>
                            <span className="block font-bold text-xl text-gray-900 mb-1">"La" (Chinese)</span>
                            <p className="text-gray-500">Meaning <span className="text-gray-900 font-medium">Spicy</span>. Represents the 'Yabi' attitude: bold, edgy, rebellious, and unapologetic.</p>
                        </div>
                    </div>
                    
                    <div className="flex items-start gap-6 group">
                        <div className="w-16 h-16 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center text-3xl font-serif-display shrink-0 group-hover:bg-pink-500 group-hover:text-white transition-colors">
                            姫
                        </div>
                        <div>
                            <span className="block font-bold text-xl text-gray-900 mb-1">"Hime" (Japanese)</span>
                            <p className="text-gray-500">Meaning <span className="text-gray-900 font-medium">Princess</span>. Represents the 'Gyaru' spirit: hyper-feminine, decorative, and dreamy.</p>
                        </div>
                    </div>
                </div>
             </motion.div>

             <motion.div 
               initial={{ opacity: 0, x: 30 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="relative"
             >
                 <div className="absolute inset-0 bg-gradient-to-tr from-pink-200 to-purple-200 rounded-2xl transform rotate-3 opacity-50"></div>
                 <img 
                    src="https://images.unsplash.com/photo-1552874869-5c39ec9288dc?q=80&w=800&auto=format&fit=crop" 
                    alt="La Hime Aesthetic" 
                    className="relative rounded-2xl shadow-xl w-full object-cover aspect-[4/5]"
                 />
             </motion.div>
        </div>

        {/* Mission Statement */}
        <div className="max-w-3xl mx-auto text-center border-t border-gray-100 pt-24">
            <h2 className="font-bold text-sm text-gray-400 mb-8 uppercase tracking-[0.2em]">Our Mission</h2>
            <p className="text-xl md:text-2xl text-gray-800 leading-relaxed font-light">
                La Hime brings Asiatic Y2K fashion to the global stage. We curate dreamy, playful pieces for the modern princess—blending soft pastels with confident details. We exist at the intersection of nostalgia and futurism, designing looks for your own digital fairytale.
            </p>
            <div className="mt-12">
                <span className="inline-block h-1 w-24 bg-black rounded-full"></span>
            </div>
        </div>

      </div>
    </div>
  );
};