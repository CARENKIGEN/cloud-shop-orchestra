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
  },
  {
    id: '7',
    name: 'Gaming Mouse',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=300&fit=crop',
    description: 'High-precision gaming mouse with RGB lighting',
    category: 'Electronics',
    stock: 45
  },
  {
    id: '8',
    name: 'Yoga Mat',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=300&fit=crop',
    description: 'Non-slip yoga mat for home workouts',
    category: 'Sports',
    stock: 80
  },
  {
    id: '9',
    name: 'Bluetooth Speaker',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&h=300&fit=crop',
    description: 'Portable Bluetooth speaker with superior sound quality',
    category: 'Electronics',
    stock: 35
  },
  {
    id: '10',
    name: 'Winter Jacket',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&h=300&fit=crop',
    description: 'Warm winter jacket with waterproof material',
    category: 'Fashion',
    stock: 20
  },
  {
    id: '11',
    name: 'Electric Kettle',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=300&h=300&fit=crop',
    description: 'Fast-boiling electric kettle with temperature control',
    category: 'Home',
    stock: 55
  },
  {
    id: '12',
    name: 'Desk Lamp',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop',
    description: 'Adjustable LED desk lamp with USB charging port',
    category: 'Home',
    stock: 40
  },
  {
    id: '13',
    name: 'Wireless Earbuds',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=300&h=300&fit=crop',
    description: 'True wireless earbuds with noise cancellation',
    category: 'Electronics',
    stock: 65
  },
  {
    id: '14',
    name: 'Tennis Racket',
    price: 189.99,
    image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=300&h=300&fit=crop',
    description: 'Professional tennis racket for competitive play',
    category: 'Sports',
    stock: 15
  },
  {
    id: '15',
    name: 'Sunglasses',
    price: 159.99,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300&h=300&fit=crop',
    description: 'Stylish sunglasses with UV protection',
    category: 'Fashion',
    stock: 50
  },
  {
    id: '16',
    name: 'Mechanical Keyboard',
    price: 169.99,
    image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=300&h=300&fit=crop',
    description: 'RGB mechanical keyboard for gaming and typing',
    category: 'Electronics',
    stock: 30
  },
  {
    id: '17',
    name: 'Air Fryer',
    price: 119.99,
    image: 'https://images.unsplash.com/photo-1585515656376-f3a0d77edecd?w=300&h=300&fit=crop',
    description: 'Healthy air fryer for oil-free cooking',
    category: 'Home',
    stock: 25
  },
  {
    id: '18',
    name: 'Fitness Tracker',
    price: 249.99,
    image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=300&h=300&fit=crop',
    description: 'Advanced fitness tracker with heart rate monitoring',
    category: 'Sports',
    stock: 45
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
