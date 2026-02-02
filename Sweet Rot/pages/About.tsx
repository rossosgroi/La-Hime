import React from 'react';
import { STOCKISTS } from '../constants';

const About: React.FC = () => {
  return (
    <div className="pt-24 min-h-screen bg-sweet-cream">
        <div className="max-w-4xl mx-auto px-4 py-16">
            <h1 className="font-serif italic text-5xl md:text-7xl text-center mb-12">
                Our <span className="font-decay text-rot-black">Rotten</span> Heart
            </h1>

            <div className="prose prose-lg mx-auto text-gray-700 font-sans mb-20 first-letter:text-5xl first-letter:font-serif first-letter:text-sweet-pink">
                <p>
                    Sweet Rot was born in a fever dream between Harajuku and a forgotten rose garden. 
                    We saw the girls who loved pink but felt blue. The ones who wanted to look like dolls, but dolls 
                    that had been left in the rain.
                </p>
                <p>
                    We fuse the unapologetic glamour of <strong>Gyaru</strong>—the tan, the hair, the attitude—with the 
                    melancholy fragility of <strong>Dark Romanticism</strong>. It is a contradiction we wear proudly.
                </p>
                <p>
                    Based in Europe, we bring this specific brand of alternative fashion to a scene that is hungry for 
                    something more than just minimal. We are maximalist in our emotions and our aesthetics.
                </p>
            </div>

            <div className="border-t border-rot-black pt-16">
                <h2 className="font-decay text-4xl text-center mb-12">Physical Manifestations</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    {STOCKISTS.map(stockist => (
                        <div key={stockist.city} className="bg-white p-8 shadow-sm border border-gray-100 hover:border-sweet-pink transition-colors">
                            <h3 className="font-serif italic text-2xl mb-2 text-rot-red">{stockist.city}</h3>
                            <p className="font-bold font-sans uppercase tracking-wider mb-1">{stockist.name}</p>
                            <p className="text-sm text-gray-500">{stockist.address}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
  );
};

export default About;