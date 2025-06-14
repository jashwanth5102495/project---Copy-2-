import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Check, Star, ShoppingBag } from 'lucide-react';
import { getProductById } from '../data/products';
import { useCart } from '../context/CartContext';
import QuantitySelector from '../components/QuantitySelector';
import ProductReview from '../components/ProductReview';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = id ? getProductById(id) : undefined;
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center bg-[#18181b] text-gray-100">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Product not found</h2>
          <Link 
            to="/products" 
            className="text-[#D4AF37] hover:underline flex items-center justify-center"
          >
            <ArrowLeft className="mr-2" /> Return to products
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="min-h-screen pt-20 bg-[#18181b] text-gray-100">
      {/* Back to products */}
      <div className="container mx-auto px-4 py-4">
        <Link 
          to="/products" 
          className="text-gray-300 hover:text-[#D4AF37] transition-colors flex items-center"
        >
          <ArrowLeft className="mr-2" /> Back to products
        </Link>
      </div>

      {/* Product Details */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="relative rounded-lg overflow-hidden shadow-xl" style={{ height: '500px', background: '#23232a' }}>
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover"
            />
            <div 
              className="absolute bottom-0 left-0 w-full h-1/4 bg-gradient-to-t from-black/80 to-transparent"
            ></div>
          </div>

          {/* Product Info */}
          <div>
            <div 
              className="w-20 h-1 mb-6"
              style={{ backgroundColor: product.themeColor }}
            ></div>
            <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2 text-gray-100">{product.name}</h1>
            <div className="text-2xl font-bold mb-6" style={{ color: product.themeColor }}>
              ₹{product.price.toFixed(2)}
            </div>
            <p className="text-gray-300 mb-6">{product.description}</p>
            
            {/* Highlights */}
            <div className="mb-8">
              <h3 className="text-lg font-bold text-gray-100 mb-2">Highlights</h3>
              <ul className="space-y-2 text-gray-300">
                {product.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start">
                    <Check 
                      className="mr-2 mt-1 flex-shrink-0" 
                      size={16} 
                      style={{ color: product.themeColor }}
                    />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Ingredients */}
            <div className="mb-8">
              <h3 className="text-lg font-bold text-gray-100 mb-2">Ingredients</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-300">
                {product.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </div>
            
            {/* Add to Cart */}
            <div className="mt-8 flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-4">
              <QuantitySelector
                quantity={quantity}
                onChange={setQuantity}
              />
              
              <button
                onClick={handleAddToCart}
                className={`px-8 py-3 rounded-md font-bold flex items-center transition-all ${
                  isAdded 
                    ? 'bg-green-600 text-white' 
                    : `bg-[${product.themeColor}] text-white hover:opacity-90`
                }`}
                style={{ 
                  backgroundColor: isAdded ? '' : product.themeColor,
                  color: 'white'
                }}
              >
                {isAdded ? (
                  <span className="flex items-center"><Check className="w-5 h-5 mr-2" /> Added to Cart!</span>
                ) : (
                  <span className="flex items-center"><ShoppingBag className="w-5 h-5 mr-2" /> Add to Cart</span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="container mx-auto px-4 py-12 border-t border-gray-700 mt-16">
        <ProductReview productId={product.id} />
      </div>
    </div>
  );
};

export default ProductDetailPage;