/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useCallback, useMemo } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import ProductDetail from './components/ProductDetail';
import Footer from './components/Footer';
import { PRODUCTS } from './constants';
import { Product, CartItem } from './types';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'catalog'>('home');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const cartTotal = useMemo(() => 
    cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
  [cartItems]);

  const totalCartItems = useMemo(() => 
    cartItems.reduce((acc, item) => acc + item.quantity, 0), 
  [cartItems]);

  const addToCart = useCallback((product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    setCartItems(prev => prev.map(item => 
      item.id === id ? { ...item, quantity } : item
    ));
  }, []);

  const featuredProducts = useMemo(() => 
    PRODUCTS.filter(p => p.featured).slice(0, 3), 
  []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar 
        cartCount={totalCartItems} 
        onOpenCart={() => setIsCartOpen(true)}
        onNavigate={setCurrentPage}
      />

      <main>
        {currentPage === 'home' ? (
          <Home 
            featuredProducts={featuredProducts}
            onNavigateToCatalog={() => {
              setCurrentPage('catalog');
              window.scrollTo(0, 0);
            }}
            onAddToCart={addToCart}
            onProductClick={setSelectedProduct}
          />
        ) : (
          <Catalog 
            products={PRODUCTS}
            onAddToCart={addToCart}
            onProductClick={setSelectedProduct}
          />
        )}
      </main>

      <Footer />

      <Cart 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemoveItem={removeFromCart}
        onUpdateQuantity={updateQuantity}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      <Checkout 
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        total={cartTotal}
        onSuccess={() => setCartItems([])}
      />

      <ProductDetail 
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={(p) => {
          addToCart(p);
          setSelectedProduct(null);
        }}
      />
    </div>
  );
}

