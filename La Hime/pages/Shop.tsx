import React, { useState, useMemo, useEffect } from 'react';
import { PRODUCTS } from '../constants';
import { ProductCard } from '../components/ProductCard';
import { CategoryFilter } from '../types';
import { ChevronDown, SlidersHorizontal } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

const filters: CategoryFilter[] = ['All', 'Miniskirts', 'Tops', 'Sets', 'Accessories', 'Shoes'];

export const Shop: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') as CategoryFilter || 'All';

  const [activeFilter, setActiveFilter] = useState<CategoryFilter>(initialCategory);
  const [activeSort, setActiveSort] = useState<'newest' | 'price-low' | 'price-high'>('newest');

  useEffect(() => {
    const category = searchParams.get('category');
    if (category) {
        if (filters.includes(category as CategoryFilter)) {
            setActiveFilter(category as CategoryFilter);
        }
    } else {
        setActiveFilter('All');
    }
  }, [searchParams]);

  const handleFilterChange = (filter: CategoryFilter) => {
      setActiveFilter(filter);
      if (filter === 'All') {
          searchParams.delete('category');
          setSearchParams(searchParams);
      } else {
          setSearchParams({ category: filter });
      }
  };

  const filteredProducts = useMemo(() => {
    let result = activeFilter === 'All' 
      ? [...PRODUCTS] 
      : PRODUCTS.filter(p => p.category === activeFilter);
    
    // Filter for specific sale or special collections (mock logic)
    const collection = searchParams.get('collection');
    if (collection === 'new-arrivals') {
        result = result.filter(p => p.isNew);
    } else if (collection === 'best-sellers') {
        result = result.filter(p => p.isBestSeller);
    }
    
    // Sort logic
    if (activeSort === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (activeSort === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else {
      // Newest (Default by ID mostly or isNew flag)
      result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0) || b.id - a.id);
    }

    return result;
  }, [activeFilter, activeSort, searchParams]);

  return (
    <div className="pt-24 min-h-screen bg-stone-50">
      
      {/* Header */}
      <div className="bg-pink-50 border-b border-pink-100 py-12 mb-0">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="font-serif-display text-4xl md:text-5xl text-gray-900 mb-3">
             {searchParams.get('collection') ? searchParams.get('collection')?.replace('-', ' ').toUpperCase() : 'All Collections'}
          </h1>
          <p className="text-gray-500">Find your new obsession.</p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 relative">
        
        {/* Sticky Filter Bar */}
        <div className="sticky top-[64px] z-40 bg-stone-50/95 backdrop-blur-md border-b border-gray-200 py-4 mb-8 -mx-4 px-4 sm:mx-0 sm:px-0 sm:bg-transparent sm:backdrop-blur-none sm:static sm:border-b-0 sm:py-8 sm:mb-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                
                {/* Horizontal Scroll Categories */}
                <div className="w-full md:w-auto overflow-x-auto no-scrollbar">
                    <div className="flex items-center gap-2">
                        {filters.map((filter) => (
                            <button
                                key={filter}
                                onClick={() => handleFilterChange(filter)}
                                className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 border ${
                                    activeFilter === filter 
                                    ? 'bg-black text-white border-black shadow-lg transform scale-105' 
                                    : 'bg-white text-gray-500 border-gray-200 hover:border-pink-300 hover:text-pink-500'
                                }`}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Sort & Stats */}
                <div className="w-full md:w-auto flex justify-between md:justify-end items-center gap-4 border-t md:border-t-0 border-gray-200 pt-3 md:pt-0">
                    <span className="text-sm text-gray-400 font-medium">
                        {filteredProducts.length} Results
                    </span>
                    
                    <div className="relative group">
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                            <ChevronDown size={14} />
                        </div>
                        <select 
                            className="appearance-none bg-white border border-gray-200 rounded-full pl-5 pr-10 py-2 text-sm font-bold text-gray-900 focus:outline-none focus:border-black cursor-pointer shadow-sm hover:shadow-md transition-shadow"
                            value={activeSort}
                            onChange={(e) => setActiveSort(e.target.value as any)}
                        >
                            <option value="newest">Newest In</option>
                            <option value="price-low">Price: Low to High</option>
                            <option value="price-high">Price: High to Low</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>

        {/* Product Grid */}
        <div className="min-h-[400px]">
             {filteredProducts.length > 0 ? (
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
                 {filteredProducts.map((product) => (
                   <ProductCard key={product.id} product={product} />
                 ))}
               </div>
             ) : (
                <div className="text-center py-24 text-gray-400 flex flex-col items-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <SlidersHorizontal size={24} className="opacity-50" />
                  </div>
                  <p className="text-xl font-serif-display text-gray-900 mb-2">No items found</p>
                  <p className="text-sm text-gray-500 mb-6">Try adjusting your filters or category.</p>
                  <button onClick={() => handleFilterChange('All')} className="text-pink-600 font-bold underline hover:text-black transition-colors">
                    View All Items
                  </button>
                </div>
             )}
        </div>
      </div>
    </div>
  );
};