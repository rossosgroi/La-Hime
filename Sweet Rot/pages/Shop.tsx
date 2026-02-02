import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PRODUCTS } from '../constants';
import ProductCard from '../components/ProductCard';
import { ChevronDown, SlidersHorizontal, Search } from 'lucide-react';

const CATEGORIES = ['All', 'Tops', 'Bottoms', 'Accessories', 'Makeup'];
const SORTS = ['Newest', 'Price: Low to High', 'Price: High to Low'];

const Shop: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSort, setSelectedSort] = useState('Newest');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Sync state with URL params if they change
  useEffect(() => {
      const query = searchParams.get('search');
      if (query !== null) {
          setSearchQuery(query);
      }
  }, [searchParams]);

  // Filtering Logic
  const filteredProducts = PRODUCTS.filter(p => {
    const matchCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  }).sort((a, b) => {
      if (selectedSort === 'Price: Low to High') return a.price - b.price;
      if (selectedSort === 'Price: High to Low') return b.price - a.price;
      return 0; // Default (Newest) logic would normally check date, assuming array order for now
  });

  return (
    <div className="pt-24 min-h-screen bg-sweet-cream">
        
        {/* Header Section */}
        <div className="bg-white border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
                 <h1 className="font-decay text-5xl md:text-7xl text-rot-black mb-2">Collections</h1>
                 <p className="font-serif italic text-gray-500">Curated specifically for your downfall.</p>
            </div>
        </div>

        {/* Sticky Filter Bar */}
        <div className="sticky top-[72px] z-30 bg-sweet-cream/95 backdrop-blur-md border-b border-gray-200 shadow-sm transition-all">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                
                {/* Desktop Filters */}
                <div className="hidden md:flex items-center space-x-8">
                    {/* Category Dropdown Group */}
                    <div className="flex space-x-6">
                        {CATEGORIES.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`text-sm font-bold uppercase tracking-widest hover:text-sweet-pink transition-colors ${selectedCategory === cat ? 'text-rot-red underline underline-offset-4' : 'text-gray-600'}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Mobile Filter Toggle */}
                <button 
                    className="md:hidden flex items-center gap-2 font-bold uppercase text-sm tracking-widest"
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                >
                    <SlidersHorizontal size={16} /> Filters
                </button>

                {/* Right Side: Search & Sort */}
                <div className="flex items-center space-x-6">
                    <div className="hidden md:flex items-center border-b border-gray-300 pb-1 focus-within:border-rot-black">
                        <Search size={16} className="text-gray-400 mr-2" />
                        <input 
                            type="text" 
                            placeholder="Search..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-transparent focus:outline-none text-sm w-32 focus:w-48 transition-all"
                        />
                    </div>
                    
                    <div className="relative group hidden md:block">
                        <button className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-rot-black">
                            Sort: {selectedSort} <ChevronDown size={14} />
                        </button>
                        {/* Dropdown Menu */}
                        <div className="absolute right-0 top-full pt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                             <div className="bg-white border border-gray-200 shadow-lg p-2 flex flex-col">
                                 {SORTS.map(sort => (
                                     <button 
                                        key={sort}
                                        onClick={() => setSelectedSort(sort)}
                                        className="text-left px-4 py-2 text-sm hover:bg-gray-50 hover:text-sweet-pink"
                                    >
                                        {sort}
                                     </button>
                                 ))}
                             </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Mobile Filters Expanded */}
            {isFilterOpen && (
                <div className="md:hidden bg-white border-b border-gray-200 p-4 space-y-4 animate-fade-in">
                     <input 
                        type="text" 
                        placeholder="Search products..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full border p-2 text-sm"
                    />
                    <div>
                        <p className="font-bold text-xs uppercase mb-2 text-gray-400">Categories</p>
                        <div className="flex flex-wrap gap-2">
                             {CATEGORIES.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => { setSelectedCategory(cat); setIsFilterOpen(false); }}
                                    className={`px-3 py-1 border text-sm ${selectedCategory === cat ? 'bg-rot-black text-white border-rot-black' : 'border-gray-300 text-gray-600'}`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                     <div>
                        <p className="font-bold text-xs uppercase mb-2 text-gray-400">Sort By</p>
                        <div className="flex flex-col gap-2">
                            {SORTS.map(sort => (
                                <button
                                    key={sort}
                                    onClick={() => { setSelectedSort(sort); setIsFilterOpen(false); }}
                                    className={`text-left text-sm ${selectedSort === sort ? 'text-rot-red font-bold' : 'text-gray-600'}`}
                                >
                                    {sort}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>

        {/* Results */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="mb-6 text-xs text-gray-500 uppercase tracking-widest">
                Showing {filteredProducts.length} Results
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            
            {filteredProducts.length === 0 && (
                <div className="flex flex-col items-center justify-center py-32 text-center opacity-60">
                    <p className="font-decay text-3xl mb-2">Void.</p>
                    <p className="font-sans text-gray-500">Your search returned nothing but dust.</p>
                    <button onClick={() => {setSearchQuery(''); setSelectedCategory('All');}} className="mt-4 underline text-rot-black font-bold">Clear Filters</button>
                </div>
            )}
        </div>
    </div>
  );
};

export default Shop;