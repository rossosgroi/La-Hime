import React from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '../constants';
import ProductCard from '../components/ProductCard';
import Button from '../components/Button';
import { ArrowRight, Star } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Background - Darker, more abstract/fashion focus */}
        <div className="absolute inset-0 bg-rot-black">
          <img 
            src="https://picsum.photos/id/338/1920/1080" 
            alt="Sweet Rot Hero" 
            className="w-full h-full object-cover opacity-70 animate-pulse-slow scale-105"
          />
          {/* Heavier gradient for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-rot-black/50 via-rot-black/20 to-rot-black" />
        </div>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10">
          <h1 className="mb-6">
            <span className="block font-serif italic text-6xl md:text-8xl text-sweet-pink drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">Indulge</span>
            <span className="block font-decay text-7xl md:text-9xl text-sweet-cream mt-[-10px] md:mt-[-20px] drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)] animate-pulse">
                THE DECAY
            </span>
          </h1>
          <Link to="/shop" className="mt-20">
            <Button className="bg-accent-rose border-accent-rose text-white hover:bg-white hover:text-accent-rose shadow-lg">
              Shop New Drops
            </Button>
          </Link>
        </div>
      </section>

      {/* Latest Drops Grid */}
      <section className="py-24 bg-sweet-cream px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12 border-b border-rot-black/10 pb-4">
            <h2 className="font-decay text-4xl md:text-5xl text-rot-black">
              Fresh <span className="text-rot-red">Rot</span>
            </h2>
            <Link to="/shop" className="group flex items-center gap-2 font-serif italic text-lg hover:text-sweet-pink transition-colors">
              View Collection <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
            {PRODUCTS.slice(0, 4).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* The Sweet Rot World (Editorial) */}
      <section className="py-24 bg-rot-black text-sweet-cream overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-sweet-pink/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-sweet-lavender/20 rounded-full blur-[100px]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-8">
            <h2 className="font-serif italic text-5xl md:text-6xl leading-tight">
              Too sweet to handle. <br/>
              <span className="font-decay text-rot-red">Too rotten to resist.</span>
            </h2>
            <p className="font-sans text-gray-400 text-lg leading-relaxed max-w-md">
                We exist in the tension between hyper-feminine glamour and inevitable decay. 
                Sweet Rot is for the dolls who wear their shadows like jewelry and their past like couture.
                A celebration of the overripe, the wilted, and the beautifully broken.
            </p>
            <div className="flex gap-4">
                <Link to="/about">
                    <Button variant="outline" className="border-sweet-pink text-sweet-pink hover:bg-sweet-pink hover:text-rot-black">
                        Read Story
                    </Button>
                </Link>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 auto-rows-[200px]">
            <img src="https://picsum.photos/id/106/400/600" alt="Mood" className="row-span-2 object-cover w-full h-full rounded-sm opacity-80 hover:opacity-100 transition-opacity duration-500" />
            <img src="https://picsum.photos/id/214/400/300" alt="Mood" className="object-cover w-full h-full rounded-sm opacity-80 hover:opacity-100 transition-opacity duration-500" />
            <div className="bg-rot-charcoal p-6 flex flex-col justify-between rounded-sm border border-rot-charcoal hover:border-rot-red transition-colors group">
                <Star className="text-sweet-pink w-8 h-8 group-hover:rotate-180 transition-transform duration-700" />
                <p className="font-decay text-2xl text-white">Sick<br/>Cute</p>
            </div>
          </div>
        </div>
      </section>

      {/* Instagram Embed Placeholder */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
            <h3 className="font-sans font-bold uppercase tracking-widest text-sm mb-8">@SweetRotOfficial</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                 {[1,2,3,4,5].map(i => (
                     <div key={i} className="aspect-square bg-gray-100 overflow-hidden group cursor-pointer relative">
                         <img src={`https://picsum.photos/id/${300+i}/400/400`} alt="Insta" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 filter group-hover:grayscale" />
                         <div className="absolute inset-0 bg-sweet-pink/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                            <InstagramLogo />
                         </div>
                     </div>
                 ))}
            </div>
        </div>
      </section>
    </div>
  );
};

const InstagramLogo = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
);

export default Home;