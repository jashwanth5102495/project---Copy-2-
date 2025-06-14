import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { ShoppingBag } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product, 1); // Add 1 quantity of the product to cart
  };

  return (
    <div className="bg-[#23232a] rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-105 border border-gray-700">
      <Link to={`/products/${product.id}`}>
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-56 object-cover"
        />
      </Link>
      <div className="p-4">
        <Link to={`/products/${product.id}`}>
          <h3 className="font-bold text-lg text-gray-100 mb-2 hover:text-[#D4AF37] transition-colors">{product.name}</h3>
        </Link>
        <p className="text-gray-300 text-sm mb-3">{product.shortDescription}</p>
        <p className="font-bold text-2xl text-[#D4AF37] mb-4">₹{product.price.toFixed(2)}</p>
        <button
          onClick={handleAddToCart}
          className="w-full bg-[#D4AF37] text-black font-bold py-2 rounded-md hover:bg-[#c4a030] transition-colors flex items-center justify-center"
        >
          <ShoppingBag className="w-5 h-5 mr-2" /> Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;