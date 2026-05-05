import { X, Trash2, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CartItem } from '../types';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemoveItem: (id: string) => void;
  onUpdateQuantity: (id: string, q: number) => void;
  onCheckout: () => void;
}

export default function Cart({ isOpen, onClose, items, onRemoveItem, onUpdateQuantity, onCheckout }: CartProps) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full sm:w-[450px] bg-white z-[70] shadow-2xl flex flex-col"
          >
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-xl font-serif font-bold uppercase tracking-tight">Votre Panier ({items.length})</h2>
              <button onClick={onClose} className="p-2 hover:bg-gray-50 rounded-full transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center">
                    <X className="w-8 h-8 text-gray-300" />
                  </div>
                  <p className="text-gray-500 font-medium italic">Votre panier est vide</p>
                  <button 
                    onClick={onClose}
                    className="text-sm font-bold uppercase tracking-widest underline underline-offset-4 hover:text-brand-accent transition-colors"
                  >
                    Continuer vos achats
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-24 aspect-[3/4] rounded-md overflow-hidden bg-gray-100">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex justify-between">
                        <h3 className="font-medium text-sm sm:text-base">{item.name}</h3>
                        <button 
                          onClick={() => onRemoveItem(item.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-xs text-gray-400 uppercase tracking-widest">{item.category}</p>
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center border border-gray-200 rounded-md">
                          <button 
                            onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            className="px-2 py-1 hover:bg-gray-50"
                          >
                            -
                          </button>
                          <span className="px-3 py-1 text-sm">{item.quantity}</span>
                          <button 
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="px-2 py-1 hover:bg-gray-50"
                          >
                            +
                          </button>
                        </div>
                        <p className="font-serif font-bold text-sm">{item.price * item.quantity} FCFA</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 bg-gray-50 border-t border-gray-100 space-y-4">
                <div className="flex justify-between text-lg font-serif font-bold">
                  <span>Total</span>
                  <span>{total} FCFA</span>
                </div>
                <p className="text-xs text-gray-400">Toutes taxes comprises. Frais de livraison calculés lors de l'étape suivante.</p>
                <button 
                  onClick={onCheckout}
                  className="w-full bg-brand-primary text-white py-4 rounded-lg flex items-center justify-center gap-2 font-bold uppercase tracking-widest hover:bg-gray-900 transition-colors"
                >
                  Passer la commande
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
