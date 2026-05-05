import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, ShieldCheck, Smartphone, Landmark, Loader2 } from 'lucide-react';
import { CartItem } from '../types';

interface CheckoutProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  total: number;
  onSuccess: () => void;
}

type PaymentMethod = 'wave' | 'moov' | 'orange' | 'card';

export default function Checkout({ isOpen, onClose, items, total, onSuccess }: CheckoutProps) {
  const [step, setStep] = useState<'details' | 'payment' | 'processing' | 'success'>('details');
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('wave');
  const [phoneNumber, setPhoneNumber] = useState('0103550289');

  const handleProcessPayment = () => {
    setStep('processing');
    // Simulate payment processing
    setTimeout(() => {
      setStep('success');
    }, 3000);
  };

  const handleFinish = () => {
    onSuccess();
    setStep('details');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[80]"
          />
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-2xl bg-white z-[90] rounded-2xl shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-serif font-bold uppercase tracking-tight">Finaliser la commande</h2>
                <p className="text-gray-400 text-sm">Paiement sécurisé par agrégateur certifié</p>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-gray-50 rounded-full transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8">
              {step === 'details' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="font-bold text-sm uppercase tracking-widest text-gray-400">Informations de livraison</h3>
                      <div className="space-y-3">
                        <input type="text" placeholder="Nom complet" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-lg focus:ring-2 focus:ring-brand-accent focus:outline-none" />
                        <input type="email" placeholder="Email" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-lg focus:ring-2 focus:ring-brand-accent focus:outline-none" />
                        <input type="text" placeholder="Ville (ex: Abidjan)" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-lg focus:ring-2 focus:ring-brand-accent focus:outline-none" />
                        <textarea placeholder="Adresse précise" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-lg focus:ring-2 focus:ring-brand-accent focus:outline-none h-24" />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h3 className="font-bold text-sm uppercase tracking-widest text-gray-400">Résumé de commande</h3>
                      <div className="bg-gray-50 p-4 rounded-xl space-y-3 max-h-64 overflow-y-auto">
                        {items.map(item => (
                          <div key={item.id} className="flex justify-between text-sm">
                            <span className="text-gray-600">{item.name} (x{item.quantity})</span>
                            <span className="font-bold">{item.price * item.quantity} FCFA</span>
                          </div>
                        ))}
                      </div>
                      <div className="pt-4 border-t border-gray-200">
                        <div className="flex justify-between text-xl font-serif font-bold">
                          <span>Total</span>
                          <span>{total} FCFA</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => setStep('payment')}
                    className="w-full bg-brand-primary text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-gray-900 transition-all flex items-center justify-center gap-2"
                  >
                    Aller au paiement
                  </button>
                </div>
              )}

              {step === 'payment' && (
                <div className="space-y-8">
                  <div className="text-center space-y-2">
                    <h3 className="text-xl font-serif font-bold">Choix de la méthode de paiement</h3>
                    <p className="text-gray-400 flex items-center justify-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-green-500" />
                      Transactions hautement sécurisées
                    </p>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <button 
                      onClick={() => setSelectedMethod('wave')}
                      className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-3 ${selectedMethod === 'wave' ? 'border-brand-accent bg-brand-accent/5' : 'border-gray-100 hover:border-gray-200'}`}
                    >
                      <div className="w-12 h-12 bg-[#1A8DCD] rounded-full flex items-center justify-center text-white font-bold text-xl italic">W</div>
                      <span className="text-xs font-bold uppercase tracking-wider">Wave CI</span>
                    </button>
                    <button 
                      onClick={() => setSelectedMethod('moov')}
                      className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-3 ${selectedMethod === 'moov' ? 'border-brand-accent bg-brand-accent/5' : 'border-gray-100 hover:border-gray-200'}`}
                    >
                      <div className="w-12 h-12 bg-[#0055A4] rounded-full flex items-center justify-center relative overflow-hidden">
                        <span className="text-white font-bold text-sm">Moov</span>
                      </div>
                      <span className="text-xs font-bold uppercase tracking-wider">Moov Money</span>
                    </button>
                    <button 
                      onClick={() => setSelectedMethod('orange')}
                      className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-3 ${selectedMethod === 'orange' ? 'border-brand-accent bg-brand-accent/5' : 'border-gray-100 hover:border-gray-200'}`}
                    >
                      <div className="w-12 h-12 bg-[#FF7900] rounded-full flex items-center justify-center">
                        < Smartphone className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-xs font-bold uppercase tracking-wider">Orange Money</span>
                    </button>
                    <button 
                      onClick={() => setSelectedMethod('card')}
                      className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-3 ${selectedMethod === 'card' ? 'border-brand-accent bg-brand-accent/5' : 'border-gray-100 hover:border-gray-200'}`}
                    >
                      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                        <Landmark className="w-6 h-6 text-gray-600" />
                      </div>
                      <span className="text-xs font-bold uppercase tracking-wider">Carte Bancaire</span>
                    </button>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-2xl space-y-4">
                    {selectedMethod !== 'card' && (
                      <>
                        <label className="text-sm font-bold uppercase tracking-widest text-gray-500">Numéro de téléphone mobile</label>
                        <div className="relative">
                          <input 
                            type="tel" 
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            placeholder="07 00 00 00 00" 
                            className="w-full px-4 py-4 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-accent focus:outline-none text-xl font-mono tracking-widest" 
                          />
                        </div>
                        <p className="text-xs text-brand-primary/60 flex items-start gap-2 italic">
                          <span>•</span>
                          {selectedMethod === 'wave' && "Vous recevrez une notification dans l'app Wave pour confirmer."}
                          {selectedMethod === 'moov' && "Saisissez votre code PIN Moov Money après l'invite sur votre téléphone."}
                          {selectedMethod === 'orange' && "Récupérez votre code de paiement via #144*82# avant de valider."}
                        </p>
                      </>
                    )}
                    {selectedMethod === 'card' && (
                      <p className="text-sm text-center py-4 text-gray-500">Vous allez être redirigé vers l'interface sécurisée de notre partenaire de paiement.</p>
                    )}
                  </div>

                  <div className="flex gap-4">
                    <button 
                      onClick={() => setStep('details')}
                      className="flex-1 px-6 py-4 border border-gray-200 rounded-xl font-bold uppercase tracking-widest hover:bg-gray-50 transition-colors"
                    >
                      Retour
                    </button>
                    <button 
                      onClick={handleProcessPayment}
                      className="flex-[2] bg-brand-primary text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-gray-900 transition-all shadow-lg"
                    >
                      Payer {total} FCFA
                    </button>
                  </div>
                </div>
              )}

              {step === 'processing' && (
                <div className="h-full flex flex-col items-center justify-center space-y-6 py-12">
                  <div className="relative">
                    <Loader2 className="w-20 h-20 text-brand-accent animate-spin" />
                    <Smartphone className="w-8 h-8 text-brand-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                  </div>
                  <div className="text-center space-y-2">
                    <h3 className="text-xl font-serif font-bold animate-pulse">Communication avec les services mobiles...</h3>
                    <p className="text-gray-400">Veuillez vérifier votre téléphone pour valider l'opération via votre code PIN.</p>
                  </div>
                </div>
              )}

              {step === 'success' && (
                <div className="h-full flex flex-col items-center justify-center space-y-6 py-12">
                  <motion.div 
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center"
                  >
                    <CheckCircle2 className="w-16 h-16 text-green-500" />
                  </motion.div>
                  <div className="text-center space-y-3">
                    <h3 className="text-3xl font-serif font-bold text-brand-primary">Paiement Réussi !</h3>
                    <p className="text-gray-500 max-w-sm mx-auto">Votre commande a été validée avec succès. Vous recevrez un SMS et un email de confirmation d'ici quelques instants.</p>
                  </div>
                  <div className="pt-6 w-full max-w-xs mx-auto">
                    <button 
                      onClick={handleFinish}
                      className="w-full bg-brand-primary text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-gray-900 transition-all"
                    >
                      Retour à la boutique
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Footer Secure Info */}
            {step !== 'success' && (
              <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-center gap-3 text-[10px] uppercase font-bold tracking-widest text-gray-400">
                <span>Certifié PCI DSS</span>
                <span className="w-1 h-1 bg-gray-300 rounded-full" />
                <span>SSL 256 bits</span>
                <span className="w-1 h-1 bg-gray-300 rounded-full" />
                <span>Protection contre la fraude intégrée</span>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
