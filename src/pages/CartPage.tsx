import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, ArrowRight, Trash2, CreditCard } from 'lucide-react';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';

const CartPage: React.FC = () => {
  const { items, updateQuantity, removeFromCart, subtotal, clearCart } = useCart();
  const navigate = useNavigate();

  const handleUpdateQuantity = (productId: string, newQuantity: number) => {
    updateQuantity(productId, newQuantity);
  };

  const handleRemoveItem = (productId: string) => {
    removeFromCart(productId);
  };

  const handleClearCart = () => {
    clearCart();
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen pt-20 bg-[#18181b] text-gray-100">
      {/* Hero Banner */}
      <div className="relative bg-[#23232a] text-gray-100 py-16">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/1036069/pexels-photo-1036069.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)'
          }}
        ></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Your Shopping Cart</h1>
            <div className="w-24 h-1 bg-[#D4AF37] mb-6"></div>
            <p className="text-lg mb-6">
              Review your selected teas and proceed to checkout.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {items.length === 0 ? (
          <div className="bg-[#23232a] p-8 rounded-lg shadow-md text-center">
            <p className="text-xl font-semibold text-gray-300 mb-4">Your cart is empty.</p>
            <button
              onClick={() => navigate('/products')}
              className="px-6 py-3 bg-[#D4AF37] text-black font-bold rounded-md hover:bg-[#c4a030] transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 bg-[#23232a] rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-serif font-bold mb-6 border-b border-gray-700 pb-4">Items in Cart</h2>
              <div className="space-y-6">
                {items.map(item => (
                  <div key={item.product.id} className="flex items-center border-b border-gray-800 pb-6 last:border-b-0">
                    <img 
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-24 h-24 object-cover rounded-md mr-6 border border-gray-700"
                    />
                    <div className="flex-grow">
                      <h3 className="text-lg font-bold text-gray-100 mb-2">{item.product.name}</h3>
                      <p className="text-gray-300">Price: ₹{item.product.price.toFixed(2)}</p>
                      <div className="flex items-center mt-3">
                        <label htmlFor={`quantity-${item.product.id}`} className="sr-only">Quantity</label>
                        <input
                          type="number"
                          id={`quantity-${item.product.id}`}
                          min="1"
                          value={item.quantity}
                          onChange={(e) => handleUpdateQuantity(item.product.id, parseInt(e.target.value))}
                          className="w-20 px-3 py-1 border border-gray-700 rounded-md bg-[#121212] text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                        />
                        <button
                          onClick={() => handleRemoveItem(item.product.id)}
                          className="ml-4 text-red-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                    <p className="font-bold text-xl text-gray-100">₹{(item.product.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex justify-end">
                <button
                  onClick={handleClearCart}
                  className="px-6 py-2 border border-red-500 text-red-400 rounded-md hover:bg-red-900 hover:text-red-300 transition-colors"
                >
                  Clear Cart
                </button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1 bg-[#23232a] rounded-lg shadow-md p-6 h-fit sticky top-24">
              <h2 className="text-2xl font-serif font-bold mb-6 border-b border-gray-700 pb-4">Order Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center text-lg">
                  <span className="text-gray-300">Subtotal:</span>
                  <span className="font-bold text-gray-100">₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-lg">
                  <span className="text-gray-300">Shipping:</span>
                  <span className="font-bold text-gray-100">FREE</span>
                </div>
                <div className="border-t border-gray-700 pt-4 mt-4">
                  <div className="flex justify-between items-center text-xl font-bold">
                    <span className="text-gray-100">Total:</span>
                    <span className="text-gray-100">₹{subtotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full mt-6 px-6 py-3 bg-[#D4AF37] text-black font-bold rounded-md hover:bg-[#c4a030] transition-colors flex items-center justify-center"
              >
                <CreditCard className="mr-2 w-5 h-5" /> Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;