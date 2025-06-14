import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, Package, ArrowRight, Truck, ShoppingBag } from 'lucide-react';

const OrderConfirmationPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;
  
  useEffect(() => {
    // If there's no order data, redirect to home
    if (!state) {
      navigate('/');
    }
  }, [state, navigate]);
  
  if (!state) {
    return (
      <div className="min-h-screen pt-20 bg-[#18181b] text-gray-100 flex items-center justify-center">
        <p>No order details found. Please go through the checkout process.</p>
      </div>
    );
  }
  
  const { orderId, customerInfo, shippingMethod, paymentMethod, items, subtotal, shippingCost, discountAmount, giftWrap, total } = state;
  const expectedDelivery = new Date();
  expectedDelivery.setDate(expectedDelivery.getDate() + (shippingMethod === 'express' ? 2 : 5));
  
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
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Order Confirmed!</h1>
            <div className="w-24 h-1 bg-[#D4AF37] mb-6"></div>
            <p className="text-lg mb-6">
              Thank you for your purchase. Your order #{orderId} has been successfully placed.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="bg-[#23232a] rounded-lg shadow-md p-8 text-center mb-12">
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
          <h2 className="text-3xl font-serif font-bold mb-4">Your Order is Confirmed!</h2>
          <p className="text-xl text-gray-300 mb-2">Order ID: <span className="font-semibold text-[#D4AF37]">{orderId}</span></p>
          <p className="text-gray-300">You will receive an email confirmation shortly with details of your order.</p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link 
              to={`/track-order/${orderId}`}
              className="px-8 py-3 bg-[#D4AF37] text-black font-bold rounded-md hover:bg-[#c4a030] transition-colors flex items-center justify-center"
            >
              <Truck className="mr-2 w-5 h-5" /> Track Order
            </Link>
            <Link 
              to="/products"
              className="px-8 py-3 border border-gray-700 text-gray-300 font-bold rounded-md hover:bg-gray-800 transition-colors flex items-center justify-center"
            >
              <ShoppingBag className="mr-2 w-5 h-5" /> Continue Shopping
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Details */}
          <div className="lg:col-span-2 bg-[#23232a] rounded-lg shadow-md p-8">
            <h3 className="text-2xl font-serif font-bold mb-6 border-b border-gray-700 pb-4">Order Details</h3>
            
            <div className="mb-6">
              <p className="text-lg font-semibold text-gray-100 mb-2">Customer Information</p>
              <div className="bg-[#121212] p-4 rounded-md border border-gray-800 text-gray-300">
                <p><strong>{customerInfo.name}</strong></p>
                <p>{customerInfo.address}, {customerInfo.landmark}</p>
                <p>{customerInfo.city}, {customerInfo.state} - {customerInfo.pincode}</p>
                <p>Mobile: {customerInfo.mobile}</p>
              </div>
            </div>

            <div className="mb-6">
              <p className="text-lg font-semibold text-gray-100 mb-2">Order Summary</p>
              <div className="space-y-4">
                {items.map((item: any, index: number) => (
                  <div key={index} className="flex justify-between items-center pb-4 border-b border-gray-800 last:border-b-0">
                    <div className="flex items-center">
                      <img 
                        src={item.product.image} 
                        alt={item.product.name} 
                        className="w-16 h-16 object-cover rounded-md mr-4 border border-gray-700"
                      />
                      <div>
                        <p className="font-bold text-gray-100">{item.product.name}</p>
                        <p className="text-sm text-gray-300">Quantity: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="font-bold text-gray-100">₹{(item.product.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#121212] p-4 rounded-md shadow-sm border border-gray-800">
                <h4 className="text-xl font-serif font-bold mb-3 text-gray-100">Shipping</h4>
                <p className="text-gray-300">Method: <span className="font-semibold capitalize">{shippingMethod}</span></p>
                <p className="text-gray-300">Cost: <span className="font-bold">{shippingCost === 0 ? 'FREE' : `₹${shippingCost.toFixed(2)}`}</span></p>
              </div>
              <div className="bg-[#121212] p-4 rounded-md shadow-sm border border-gray-800">
                <h4 className="text-xl font-serif font-bold mb-3 text-gray-100">Payment</h4>
                <p className="text-gray-300">Method: <span className="font-semibold capitalize">{paymentMethod}</span></p>
                <p className="text-gray-300">Total Paid: <span className="font-bold text-[#D4AF37]">₹{total.toFixed(2)}</span></p>
              </div>
            </div>
          </div>

          {/* Grand Total */}
          <div className="lg:col-span-1 bg-[#23232a] rounded-lg shadow-md p-8 h-fit sticky top-24">
            <h3 className="text-2xl font-serif font-bold mb-6 border-b border-gray-700 pb-4">Grand Total</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-lg text-gray-300">
                <span>Subtotal:</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg text-gray-300">
                <span>Shipping:</span>
                <span>{shippingCost === 0 ? 'FREE' : `₹${shippingCost.toFixed(2)}`}</span>
              </div>
              {giftWrap && (
                <div className="flex justify-between text-lg text-gray-300">
                  <span>Gift Wrap:</span>
                  <span>₹50.00</span>
                </div>
              )}
              {discountAmount > 0 && (
                <div className="flex justify-between text-lg text-green-500">
                  <span>Discount:</span>
                  <span>-₹{discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="border-t border-gray-700 pt-4 mt-4 flex justify-between items-center text-2xl font-bold">
                <span className="text-gray-100">Total:</span>
                <span className="text-gray-100">₹{total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;