export default function Footer() {
  return (
    <footer className="bg-brand-primary text-white pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="space-y-6">
            <h2 className="text-2xl font-serif font-bold tracking-tighter">ELITESHOP</h2>
            <p className="text-gray-400 font-light text-sm leading-relaxed max-w-xs">
              Votre destination de choix pour la mode de luxe et le style de vie raffiné. Nous apportons l'élégance à votre porte.
            </p>
          </div>
          
          <div className="space-y-6">
            <h4 className="text-xs uppercase tracking-[0.3em] font-bold">Shopping</h4>
            <ul className="space-y-4 text-sm text-gray-400 font-light">
              <li><a href="#" className="hover:text-brand-accent transition-colors">Nouveautés</a></li>
              <li><a href="#" className="hover:text-brand-accent transition-colors">Homme</a></li>
              <li><a href="#" className="hover:text-brand-accent transition-colors">Femme</a></li>
              <li><a href="#" className="hover:text-brand-accent transition-colors">Accessoires</a></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-xs uppercase tracking-[0.3em] font-bold">Aide</h4>
            <ul className="space-y-4 text-sm text-gray-400 font-light">
              <li><a href="#" className="hover:text-brand-accent transition-colors">Livraison & Retours</a></li>
              <li><a href="#" className="hover:text-brand-accent transition-colors">Suivi de commande</a></li>
              <li><a href="#" className="hover:text-brand-accent transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-brand-accent transition-colors">Contactez-nous</a></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-xs uppercase tracking-[0.3em] font-bold">Légal</h4>
            <ul className="space-y-4 text-sm text-gray-400 font-light">
              <li><a href="#" className="hover:text-brand-accent transition-colors">Mentions Légales</a></li>
              <li><a href="#" className="hover:text-brand-accent transition-colors">Confidentialité</a></li>
              <li><a href="#" className="hover:text-brand-accent transition-colors">Conditions Générales</a></li>
              <li><a href="#" className="hover:text-brand-accent transition-colors">Cookies</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-gray-500 uppercase tracking-widest">
            © 2026 EliteShop. Tous droits réservés.
          </p>
          <div className="flex gap-6 text-gray-500">
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
            <a href="#" className="hover:text-white transition-colors">Facebook</a>
            <a href="#" className="hover:text-white transition-colors">Pinterest</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
