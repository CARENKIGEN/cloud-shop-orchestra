
import { useState } from 'react';
import ProductCard from './ProductCard';
import ProductFilters from './ProductFilters';
import { Product } from '@/context/CartContext';

// Mock data - in real app this would come from your Spring Boot inventory service
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Wireless Headphones',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',
    description: 'High-quality wireless headphones with noise cancellation',
    category: 'Electronics',
    stock: 50
  },
  {
    id: '2',
    name: 'Laptop Computer',
    price: 1299.99,
    image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=300&h=300&fit=crop',
    description: 'Powerful laptop for work and gaming',
    category: 'Electronics',
    stock: 25
  },
  {
    id: '3',
    name: 'Coffee Maker',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&h=300&fit=crop',
    description: 'Automatic coffee maker with programmable features',
    category: 'Home',
    stock: 30
  },
  {
    id: '4',
    name: 'Running Shoes',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop',
    description: 'Comfortable running shoes for daily exercise',
    category: 'Sports',
    stock: 75
  },
  {
    id: '5',
    name: 'Smartphone',
    price: 899.99,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=300&fit=crop',
    description: 'Latest smartphone with advanced camera features',
    category: 'Electronics',
    stock: 40
  },
  {
    id: '6',
    name: 'Backpack',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop',
    description: 'Durable backpack for travel and daily use',
    category: 'Fashion',
    stock: 60
  }
];

const ProductCatalog = () => {
  const [products] = useState<Product[]>(mockProducts);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(mockProducts);

  const handleFilterChange = (filters: { category: string; priceRange: [number, number]; searchTerm: string }) => {
    let filtered = products;

    if (filters.category && filters.category !== 'all') {
      filtered = filtered.filter(product => 
        product.category.toLowerCase() === filters.category.toLowerCase()
      );
    }

    if (filters.searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(filters.searchTerm.toLowerCase())
      );
    }

    filtered = filtered.filter(product =>
      product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
    );

    setFilteredProducts(filtered);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Products</h2>
        <p className="text-gray-600">{filteredProducts.length} products found</p>
      </div>
      
      <ProductFilters onFilterChange={handleFilterChange} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default ProductCatalog;
