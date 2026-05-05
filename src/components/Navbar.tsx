import { ShoppingBag, User, Search, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onNavigate: (page: 'home' | 'catalog') => void;
}

export default function Navbar({ cartCount, onOpenCart, onNavigate }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex items-center gap-4 lg:hidden">
          <button onClick={() => setIsMenuOpen(true)}>
            <Menu className="w-6 h-6" />
          </button>
        </div>

        <div className="hidden lg:flex items-center gap-8">
          <button 
            onClick={() => onNavigate('home')}
            className="text-sm font-medium tracking-widest uppercase hover:text-brand-accent transition-colors"
          >
            Accueil
          </button>
          <button 
            onClick={() => onNavigate('catalog')}
            className="text-sm font-medium tracking-widest uppercase hover:text-brand-accent transition-colors"
          >
            Collection
          </button>
        </div>

        <button 
          onClick={() => onNavigate('home')}
          className="text-2xl font-serif font-bold tracking-tighter absolute left-1/2 -translate-x-1/2"
        >
          ELITESHOP
        </button>

        <div className="flex items-center gap-6">
          <button className="hidden sm:block hover:text-brand-accent transition-colors">
            <Search className="w-5 h-5" />
          </button>
          <button className="hidden sm:block hover:text-brand-accent transition-colors">
            <User className="w-5 h-5" />
          </button>
          <button 
            onClick={onOpenCart}
            className="relative hover:text-brand-accent transition-colors"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-brand-primary text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
            />
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-80 bg-white z-50 p-8 flex flex-col"
            >
              <div className="flex justify-end mb-12">
                <button onClick={() => setIsMenuOpen(false)}>
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="flex flex-col gap-6">
                <button 
                  onClick={() => { onNavigate('home'); setIsMenuOpen(false); }}
                  className="text-2xl font-serif text-left hover:text-brand-accent transition-colors"
                >
                  Accueil
                </button>
                <button 
                  onClick={() => { onNavigate('catalog'); setIsMenuOpen(false); }}
                  className="text-2xl font-serif text-left hover:text-brand-accent transition-colors"
                >
                  Collection
                </button>
                <div className="h-px bg-gray-100 my-4" />
                <button className="text-lg font-medium text-left">Homme</button>
                <button className="text-lg font-medium text-left">Femme</button>
                <button className="text-lg font-medium text-left">Accessoires</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
