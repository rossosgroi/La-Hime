import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyle = "px-8 py-3 text-sm font-bold uppercase tracking-widest transition-all duration-300 ease-out relative overflow-hidden group";
  
  const variants = {
    primary: "bg-rot-black text-sweet-cream hover:bg-sweet-pink hover:text-rot-black border border-rot-black",
    outline: "bg-transparent text-rot-black border border-rot-black hover:bg-rot-black hover:text-sweet-cream",
    ghost: "bg-transparent text-rot-black hover:text-sweet-pink underline decoration-1 underline-offset-4"
  };

  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      <span className="relative z-10">{children}</span>
    </button>
  );
};

export default Button;
