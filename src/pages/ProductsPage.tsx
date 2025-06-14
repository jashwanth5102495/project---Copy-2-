import React from 'react';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';

const ProductsPage: React.FC = () => {
  return (
    <div className="min-h-screen pt-20 bg-[#18181b] text-gray-100">
      {/* Hero Banner */}
      <div className="relative bg-[#23232a] text-gray-100 py-16">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/1417945/pexels-photo-1417945.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)'
          }}
        ></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Our Tea Collection</h1>
            <div className="w-24 h-1 bg-[#D4AF37] mb-6"></div>
            <p className="text-lg mb-6">
              Explore our exquisite range of premium teas, carefully curated for every palate.
            </p>
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;