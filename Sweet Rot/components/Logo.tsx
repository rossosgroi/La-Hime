import React from 'react';
import { Cherry } from 'lucide-react';

interface LogoProps {
  scrolled?: boolean;
}

const Logo: React.FC<LogoProps> = ({ scrolled }) => {
  return (
    <div className="relative group cursor-pointer flex items-center justify-center">
      <div className="relative flex items-baseline">
        <span className={`font-serif italic text-4xl md:text-5xl transition-colors duration-500 ${scrolled ? 'text-sweet-pink' : 'text-sweet-pink'}`}>
          Sweet
        </span>
        <div className="mx-1 relative">
             {/* Fresh Cherry */}
            <Cherry 
                className={`w-6 h-6 absolute -top-1 -left-1 text-sweet-pink rotate-[-15deg] transition-all duration-300 group-hover:opacity-0`} 
                strokeWidth={2.5}
            />
             {/* Rotting Cherry */}
            <Cherry 
                className={`w-6 h-6 absolute -top-1 -left-1 text-rot-black fill-rot-black rotate-[15deg] opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-110`} 
                strokeWidth={1}
            />
        </div>
        <span className={`font-decay text-4xl md:text-5xl tracking-widest transition-colors duration-500 ${scrolled ? 'text-white' : 'text-rot-black'} group-hover:text-rot-red`}>
          ROT
        </span>
      </div>
    </div>
  );
};

export default Logo;
