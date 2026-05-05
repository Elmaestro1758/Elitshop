import { Product } from '../types';
import { Plus } from 'lucide-react';
import { motion } from 'motion/react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (p: Product) => void;
  onClick: (p: Product) => void;
  key?: string | number;
}

export default function ProductCard({ product, onAddToCart, onClick }: ProductCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group cursor-pointer"
      onClick={() => onClick(product)}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 rounded-lg">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(product);
          }}
          className="absolute bottom-4 right-4 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:bg-brand-primary hover:text-white"
        >
          <Plus className="w-5 h-5" />
        </button>
        {product.featured && (
          <span className="absolute top-4 left-4 bg-brand-primary text-white text-[10px] uppercase tracking-widest px-2 py-1 font-semibold">
            Nouveau
          </span>
        )}
      </div>
      <div className="mt-4 space-y-1">
        <h3 className="text-sm font-medium tracking-tight group-hover:text-brand-accent transition-colors">
          {product.name}
        </h3>
        <p className="text-xs text-gray-500 uppercase tracking-widest">
          {product.category}
        </p>
        <p className="font-serif font-semibold">
          {product.price.toLocaleString()} FCFA
        </p>
      </div>
    </motion.div>
  );
}
