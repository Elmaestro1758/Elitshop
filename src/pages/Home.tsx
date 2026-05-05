import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';

interface HomeProps {
  featuredProducts: Product[];
  onNavigateToCatalog: () => void;
  onAddToCart: (p: Product) => void;
  onProductClick: (p: Product) => void;
}

export default function Home({ featuredProducts, onNavigateToCatalog, onAddToCart, onProductClick }: HomeProps) {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=2070" 
            alt="Elite Hero" 
            className="w-full h-full object-cover scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="max-w-2xl text-white"
          >
            <h1 className="text-6xl md:text-8xl font-serif font-bold leading-tight tracking-tighter mb-6">
              L'Élégance <br /> Redéfinie.
            </h1>
            <p className="text-lg md:text-xl font-light tracking-wide mb-10 opacity-90 leading-relaxed">
              Découvrez une collection exclusive conçue pour ceux qui ne font aucun compromis sur le style et la qualité.
            </p>
            <button 
              onClick={onNavigateToCatalog}
              className="bg-white text-brand-primary px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm flex items-center gap-3 hover:bg-brand-accent hover:text-white transition-all group"
            >
              Découvrir la collection
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-end mb-16">
          <div className="space-y-4">
            <h2 className="text-sm uppercase tracking-[0.3em] font-bold text-brand-accent">Collection Vedette</h2>
            <h3 className="text-4xl font-serif font-bold">Sélectionnés pour vous</h3>
          </div>
          <button 
            onClick={onNavigateToCatalog}
            className="hidden md:flex items-center gap-2 text-sm font-bold uppercase tracking-widest hover:text-brand-accent transition-colors underline underline-offset-8"
          >
            Tout voir
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {featuredProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={onAddToCart}
              onClick={onProductClick}
            />
          ))}
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="bg-gray-50 py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-10">
            <h2 className="text-5xl font-serif font-bold leading-[1.1]">
              Un savoir-faire incomparable, une esthétique intemporelle.
            </h2>
            <p className="text-gray-600 leading-relaxed text-lg italic">
              "Nous croyons que chaque pièce doit raconter une histoire. Nos articles sont sélectionnés avec le plus grand soin pour refléter l'excellence du design moderne."
            </p>
            <div className="grid grid-cols-2 gap-8 text-center sm:text-left">
              <div>
                <h4 className="text-3xl font-serif font-bold mb-2">15+</h4>
                <p className="text-xs uppercase tracking-widest text-gray-400">Années d'expertise</p>
              </div>
              <div>
                <h4 className="text-3xl font-serif font-bold mb-2">100%</h4>
                <p className="text-xs uppercase tracking-widest text-gray-400">Qualité Premium</p>
              </div>
            </div>
          </div>
          <div className="relative">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              className="aspect-square relative z-10 rounded-2xl overflow-hidden shadow-2xl"
            >
              <img 
                src="https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&q=80&w=2070" 
                alt="Expertise" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-accent/20 rounded-full blur-3xl z-0" />
            <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-brand-primary/5 rounded-full blur-3xl z-0" />
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 max-w-4xl mx-auto px-4 text-center space-y-8">
        <h2 className="text-4xl font-serif font-bold">Inscrivez-vous à l'Exclusivité</h2>
        <p className="text-gray-500 font-light">Recevez nos dernières collections et offres spéciales directement dans votre boîte mail.</p>
        <form className="flex flex-col sm:flex-row gap-4" onSubmit={(e) => e.preventDefault()}>
          <input 
            type="email" 
            placeholder="Votre adresse email" 
            className="flex-1 px-6 py-4 rounded-full border border-gray-200 focus:border-brand-primary outline-none transition-colors"
          />
          <button className="bg-brand-primary text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-brand-accent transition-all">
            S'abonner
          </button>
        </form>
      </section>
    </div>
  );
}
