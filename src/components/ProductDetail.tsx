import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, Truck, ShieldCheck, RefreshCw } from 'lucide-react';
import { Product } from '../types';

interface ProductDetailProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (p: Product) => void;
}

export default function ProductDetail({ product, onClose, onAddToCart }: ProductDetailProps) {
  if (!product) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center sm:p-4"
      >
        <div 
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />
        
        <motion.div 
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className="relative w-full max-w-6xl h-full sm:h-auto max-h-[95vh] bg-white sm:rounded-2xl shadow-3xl overflow-hidden flex flex-col md:flex-row"
        >
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 z-10 bg-white/80 p-2 rounded-full hover:bg-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="w-full md:w-3/5 bg-gray-100 overflow-hidden">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover transition-transform duration-1000 transform hover:scale-105"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="w-full md:w-2/5 p-8 sm:p-12 overflow-y-auto flex flex-col">
            <div className="flex-1 space-y-8">
              <div className="space-y-4">
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-brand-accent">
                  {product.category}
                </p>
                <h2 className="text-4xl font-serif font-bold tracking-tight leading-tight">
                  {product.name}
                </h2>
                <p className="text-3xl font-serif font-bold text-gray-900 border-b border-gray-100 pb-6">
                  {product.price.toLocaleString()} FCFA
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-widest">Description</h3>
                <p className="text-gray-600 leading-relaxed font-light">
                  {product.description}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-8 border-t border-gray-100 text-[10px] uppercase tracking-widest font-bold text-gray-500">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-50 rounded-full">
                    <Truck className="w-4 h-4" />
                  </div>
                  Livraison gratuite
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-50 rounded-full">
                    <RefreshCw className="w-4 h-4" />
                  </div>
                  Retours sous 30 jours
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-50 rounded-full">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  Paiement sécurisé
                </div>
              </div>
            </div>

            <div className="pt-8 space-y-4">
              <button 
                onClick={() => onAddToCart(product)}
                className="w-full bg-brand-primary text-white py-5 rounded-full flex items-center justify-center gap-4 font-bold uppercase tracking-[0.2em] hover:bg-gray-900 transition-all shadow-xl hover:shadow-2xl translate-y-0 hover:-translate-y-1"
              >
                <ShoppingBag className="w-5 h-5" />
                Ajouter au panier
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
