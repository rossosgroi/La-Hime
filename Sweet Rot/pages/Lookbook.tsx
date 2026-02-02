import React from 'react';

const Lookbook: React.FC = () => {
  return (
    <div className="bg-rot-black min-h-screen text-sweet-cream">
        <div className="pt-32 pb-20 px-4 text-center">
            <h1 className="font-decay text-6xl md:text-9xl text-sweet-pink animate-pulse-slow">VOLUME 03</h1>
            <p className="font-serif italic text-2xl mt-4">"The Garden of Bad Fruit"</p>
        </div>

        <div className="max-w-screen-2xl mx-auto space-y-32 pb-32">
            {[1, 2, 3].map((item, index) => (
                <div key={index} className={`flex flex-col md:flex-row items-center gap-8 md:gap-20 px-4 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                    <div className="w-full md:w-3/5 relative group">
                        <div className="absolute inset-0 bg-sweet-pink/10 transform translate-x-4 translate-y-4 transition-transform group-hover:translate-x-6 group-hover:translate-y-6 duration-700" />
                        <img 
                            src={`https://picsum.photos/id/${150 + index * 10}/1200/1600`} 
                            alt="Lookbook" 
                            className="relative w-full grayscale contrast-125 group-hover:grayscale-0 transition-all duration-1000 ease-in-out" 
                        />
                    </div>
                    <div className="w-full md:w-2/5 space-y-6 text-center md:text-left">
                        <span className="text-rot-red font-bold text-4xl md:text-6xl font-decay">0{item}</span>
                        <h2 className="text-3xl font-serif italic">Subject: Midnight Bloom</h2>
                        <p className="text-gray-400 max-w-sm mx-auto md:mx-0 font-sans leading-relaxed">
                            Exploring the intersection of vitality and decay. The collection focuses on distressed fabrics, moody darks, and the fading colors of a garden at twilight.
                        </p>
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
};

export default Lookbook;