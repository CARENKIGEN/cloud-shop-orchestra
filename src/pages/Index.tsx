
import { useState } from 'react';
import ProductCatalog from '@/components/ecommerce/ProductCatalog';
import ShoppingCart from '@/components/ecommerce/ShoppingCart';
import Header from '@/components/ecommerce/Header';
import { CartProvider } from '@/context/CartContext';

const Index = () => {
  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              <ProductCatalog />
            </div>
            <div className="lg:col-span-1">
              <ShoppingCart />
            </div>
          </div>
        </main>
      </div>
    </CartProvider>
  );
};

export default Index;
