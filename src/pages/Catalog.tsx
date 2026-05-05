import { useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';

interface CatalogProps {
  products: Product[];
  onAddToCart: (p: Product) => void;
  onProductClick: (p: Product) => void;
}

export default function Catalog({ products, onAddToCart, onProductClick }: CatalogProps) {
  const [activeCategory, setActiveCategory] = useState<'Tous' | 'Homme' | 'Femme' | 'Accessoires'>('Tous');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['Tous', 'Homme', 'Femme', 'Accessoires'];

  const filteredProducts = products.filter((product) => {
    const matchesCategory = activeCategory === 'Tous' || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div className="space-y-4">
          <h1 className="text-5xl font-serif font-bold tracking-tight">La Collection</h1>
          <p className="text-gray-500 max-w-md italic">
            Parcourez notre sélection rigoureuse d'articles de créateurs pour une garde-robe d'exception.
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Rechercher..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-6 py-3 rounded-full border border-gray-100 bg-gray-50 focus:bg-white focus:border-brand-primary outline-none transition-all w-64"
            />
          </div>
          <button className="p-3 border border-gray-100 rounded-full hover:bg-gray-50 transition-colors">
            <SlidersHorizontal className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat as any)}
            className={`px-8 py-3 rounded-full text-sm font-bold uppercase tracking-widest transition-all ${
              activeCategory === cat 
                ? 'bg-brand-primary text-white' 
                : 'bg-white border border-gray-100 text-gray-500 hover:border-brand-primary hover:text-brand-primary'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={onAddToCart}
              onClick={onProductClick}
            />
          ))
        ) : (
          <div className="col-span-full py-32 text-center">
            <p className="text-xl text-gray-400 italic">Aucun produit ne correspond à votre recherche.</p>
          </div>
        )}
      </div>
    </div>
  );
}
