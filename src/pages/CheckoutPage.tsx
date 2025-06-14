import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import axios from 'axios';
import { CreditCard } from 'lucide-react';

type ShippingMethod = 'standard' | 'express';
type PaymentMethod = 'upi' | 'card' | 'cod';

interface CustomerInfo {
  name: string;
  mobile: string;
  address: string;
  pincode: string;
  landmark: string;
  state: string;
  city: string;
}

const indianStates = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 
  'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 
  'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 
  'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Puducherry'
];

declare global {
  interface Window {
    Razorpay: any;
  }
}

const CheckoutPage: React.FC = () => {
  const { items, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: '',
    mobile: '',
    address: '',
    pincode: '',
    landmark: '',
    state: '',
    city: '',
  });
  
  const [shippingMethod, setShippingMethod] = useState<ShippingMethod>('standard');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('upi');
  const [giftWrap, setGiftWrap] = useState(false);
  const [discountCode, setDiscountCode] = useState('');
  const [isDiscountApplied, setIsDiscountApplied] = useState(false);
  
  const shippingCost = shippingMethod === 'express' ? 49 : 0;
  const discountAmount = isDiscountApplied ? Math.round(subtotal * 0.1) : 0;
  const total = subtotal + shippingCost - discountAmount + (giftWrap ? 50 : 0);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({ ...prev, [name]: value }));
  };
  
  const applyDiscount = () => {
    if (discountCode.toUpperCase() === 'FIRSTCUP10') {
      setIsDiscountApplied(true);
    } else {
      alert('Invalid discount code');
    }
  };
  
  const handleRazorpayPayment = async () => {
    try {
      // 1. Create order on backend
      const response = await axios.post('http://localhost:5000/api/create-razorpay-order', {
        amount: total, // total amount in INR
        currency: 'INR',
        receipt: 'order_rcptid_' + Math.floor(Math.random() * 1000000),
      });
      const order = response.data;

      // 2. Open Razorpay Checkout
      const options = {
        key: 'rzp_test_NyLZPzYHIYtxqW',
        amount: order.amount,
        currency: order.currency,
        name: 'AURA',
        description: 'Tea Order Payment',
        order_id: order.id,
        handler: async function (response: { razorpay_payment_id: string }) {
          try {
            // Create order in our database after successful payment
            const orderId = 'ORD' + Math.floor(100000 + Math.random() * 900000);
            const newOrder = {
              items,
              subtotal,
              shipping: shippingCost,
              total,
              customerInfo,
              shippingMethod,
              paymentMethod,
              status: 'confirmed',
              paymentStatus: 'paid',
              paymentId: response.razorpay_payment_id,
              createdAt: new Date().toISOString(),
            };

            const orderResponse = await axios.post('http://localhost:5000/api/orders', newOrder);
            
            // Navigate to confirmation page
            navigate('/order-confirmation', { 
              state: { 
                orderId: orderResponse.data._id || orderId,
                customerInfo,
                shippingMethod,
                paymentMethod,
                items,
                subtotal,
                shippingCost,
                discountAmount,
                giftWrap: giftWrap ? 50 : 0,
                total,
                paymentId: response.razorpay_payment_id
              } 
            });
            
            // Clear the cart
            clearCart();
          } catch (err) {
            alert('Order created but failed to save payment details. Please contact support.');
          }
        },
        prefill: {
          name: customerInfo.name,
          email: '', // Optionally add email
          contact: customerInfo.mobile,
        },
        theme: {
          color: '#D4AF37',
        },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      alert('Failed to initialize payment. Please try again.');
    }
  };
  
  return (
    <div className="min-h-screen pt-24 bg-[#18181b] text-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-serif font-bold mb-8">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Customer Information */}
          <div className="lg:col-span-2">
            <div className="bg-[#23232a] rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-bold mb-4">Delivery Address</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 mb-1">Full Name*</label>
                  <input
                    type="text"
                    name="name"
                    value={customerInfo.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-700 rounded-md bg-[#121212] text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-1">Mobile Number*</label>
                  <input
                    type="tel"
                    name="mobile"
                    value={customerInfo.mobile}
                    onChange={handleInputChange}
                    pattern="[0-9]{10}"
                    required
                    className="w-full px-4 py-2 border border-gray-700 rounded-md bg-[#121212] text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-gray-300 mb-1">Address*</label>
                  <textarea
                    name="address"
                    value={customerInfo.address}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-700 rounded-md bg-[#121212] text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                    rows={3}
                  ></textarea>
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-1">Pincode*</label>
                  <input
                    type="text"
                    name="pincode"
                    value={customerInfo.pincode}
                    onChange={handleInputChange}
                    pattern="[0-9]{6}"
                    required
                    className="w-full px-4 py-2 border border-gray-700 rounded-md bg-[#121212] text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-1">Landmark</label>
                  <input
                    type="text"
                    name="landmark"
                    value={customerInfo.landmark}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-700 rounded-md bg-[#121212] text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-1">State*</label>
                  <select
                    name="state"
                    value={customerInfo.state}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-700 rounded-md bg-[#121212] text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                  >
                    <option value="">Select State</option>
                    {indianStates.map(state => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-1">City*</label>
                  <input
                    type="text"
                    name="city"
                    value={customerInfo.city}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-700 rounded-md bg-[#121212] text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                  />
                </div>
              </div>
            </div>
            
            <div className="bg-[#23232a] rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-bold mb-4">Shipping Method</h2>
              
              <div className="space-y-3">
                <label className="flex items-center space-x-3 bg-[#121212] p-4 rounded-md border border-gray-700 cursor-pointer">
                  <input
                    type="radio"
                    name="shippingMethod"
                    value="standard"
                    checked={shippingMethod === 'standard'}
                    onChange={() => setShippingMethod('standard')}
                    className="form-radio h-5 w-5 text-[#D4AF37]"
                  />
                  <div className="flex justify-between items-center w-full">
                    <span className="text-lg text-gray-100">Standard Shipping (2-5 business days)</span>
                    <span className="font-bold text-gray-100">FREE</span>
                  </div>
                </label>
                <label className="flex items-center space-x-3 bg-[#121212] p-4 rounded-md border border-gray-700 cursor-pointer">
                  <input
                    type="radio"
                    name="shippingMethod"
                    value="express"
                    checked={shippingMethod === 'express'}
                    onChange={() => setShippingMethod('express')}
                    className="form-radio h-5 w-5 text-[#D4AF37]"
                  />
                  <div className="flex justify-between items-center w-full">
                    <span className="text-lg text-gray-100">Express Shipping (1-2 business days)</span>
                    <span className="font-bold text-gray-100">₹49</span>
                  </div>
                </label>
              </div>
            </div>
            
            <div className="bg-[#23232a] rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-bold mb-4">Payment Method</h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="upi"
                    name="paymentMethod"
                    value="upi"
                    checked={paymentMethod === 'upi'}
                    onChange={() => setPaymentMethod('upi')}
                    className="w-4 h-4 text-[#D4AF37] bg-gray-700 border-gray-600 focus:ring-[#D4AF37]"
                  />
                  <label htmlFor="upi" className="ml-2 text-gray-300">UPI</label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="card"
                    name="paymentMethod"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                    className="w-4 h-4 text-[#D4AF37] bg-gray-700 border-gray-600 focus:ring-[#D4AF37]"
                  />
                  <label htmlFor="card" className="ml-2 text-gray-300">Credit / Debit Card</label>
                </div>
              </div>
            </div>
            
            <div className="bg-[#23232a] rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">Additional Options</h2>
              
              <div className="flex items-center justify-between mb-4">
                <label htmlFor="giftWrap" className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    id="giftWrap"
                    checked={giftWrap}
                    onChange={(e) => setGiftWrap(e.target.checked)}
                    className="form-checkbox h-5 w-5 text-[#D4AF37] rounded focus:ring-[#D4AF37]"
                  />
                  <span className="text-gray-100">Gift wrap this order (₹50)</span>
                </label>
              </div>

              <div className="mb-4">
                <label htmlFor="discountCode" className="block text-gray-300 mb-1">Discount Code</label>
                <div className="flex">
                  <input
                    type="text"
                    id="discountCode"
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                    placeholder="Enter discount code"
                    className="w-full px-4 py-2 border border-gray-700 rounded-l-md bg-[#121212] text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                  />
                  <button
                    type="button"
                    onClick={applyDiscount}
                    className="bg-[#D4AF37] text-black font-bold px-4 py-2 rounded-r-md hover:bg-[#c4a030] transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {isDiscountApplied && <p className="text-green-500 text-sm mt-2">Discount Applied! (10% off)</p>}
              </div>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1 bg-[#23232a] rounded-lg shadow-md p-6 h-fit sticky top-24">
            <h2 className="text-2xl font-serif font-bold mb-6 border-b border-gray-700 pb-4">Order Summary</h2>
            
            {items.length === 0 ? (
              <p className="text-gray-300">Your cart is empty.</p>
            ) : (
              <div className="space-y-4">
                {items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center pb-4 border-b border-gray-800 last:border-b-0">
                    <div className="flex items-center">
                      <img 
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-20 h-20 object-cover rounded-md mr-4 border border-gray-700"
                      />
                      <div>
                        <p className="font-bold text-gray-100">{item.product.name}</p>
                        <p className="text-sm text-gray-300">Quantity: {item.quantity}</p>
                        <p className="text-sm text-gray-300">Price: ₹{item.product.price.toFixed(2)}</p>
                      </div>
                    </div>
                    <p className="font-semibold text-gray-100">₹{(item.product.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}

                <div className="py-4 border-y border-gray-700">
                  <div className="flex justify-between text-gray-300 mb-2">
                    <span>Subtotal:</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-300 mb-2">
                    <span>Shipping:</span>
                    <span>{shippingCost === 0 ? 'FREE' : `₹${shippingCost.toFixed(2)}`}</span>
                  </div>
                  {giftWrap && (
                    <div className="flex justify-between text-gray-300 mb-2">
                      <span>Gift Wrap:</span>
                      <span>₹50.00</span>
                    </div>
                  )}
                  {isDiscountApplied && (
                    <div className="flex justify-between text-green-500 mb-2">
                      <span>Discount:</span>
                      <span>-₹{discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-center text-xl font-bold text-gray-100 pt-4">
                  <span>Total:</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>

                <button
                  type="button"
                  onClick={handleRazorpayPayment}
                  disabled={items.length === 0}
                  className="w-full mt-6 px-6 py-3 bg-[#D4AF37] text-black font-bold rounded-md hover:bg-[#c4a030] transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <CreditCard className="w-5 h-5 mr-2" />
                  Pay ₹{total} with Razorpay
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;