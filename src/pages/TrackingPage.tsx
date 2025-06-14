import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Truck, AlertCircle, Mail, CheckCircle, Cog, PackageCheck, Loader2 } from 'lucide-react';
import axios from 'axios';

interface OrderItem {
  product?: {
    id?: string;
    name?: string;
    price?: number;
    image?: string;
  };
  quantity?: number;
}

interface CustomerInfo {
  name: string;
  address: string;
  pincode: string;
  landmark: string;
  state: string;
  city: string;
  mobile: string;
}

interface Order {
  _id: string;
  orderId?: string;
  status: string;
  createdAt: string;
  items: OrderItem[];
  customerInfo: CustomerInfo;
  shippingMethod: string;
  paymentMethod: string;
  shippingCost: number;
  total: number;
}

const TrackingPage: React.FC = () => {
  const navigate = useNavigate();
  const { orderId: urlOrderId } = useParams<{ orderId: string }>();
  const [orderId, setOrderId] = useState(urlOrderId || '');
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (urlOrderId) {
      fetchOrderDetails(urlOrderId);
    }
  }, [urlOrderId]);

  // Add a periodic check for status updates
  useEffect(() => {
    if (order) {
      const interval = setInterval(() => {
        fetchOrderDetails(order._id);
      }, 30000); // Check every 30 seconds
      return () => clearInterval(interval);
    }
  }, [order]);

  const fetchOrderDetails = async (id: string) => {
    try {
      setIsLoading(true);
      const response = await axios.get(`http://localhost:5000/api/orders/${id}`);
      if (response.data) {
        setOrder(response.data);
      } else {
        setError('Order not found. Please check your order ID.');
      }
    } catch (err: any) {
      console.error('Error fetching order details:', err);
      if (err.response?.status === 404) {
        setError('Order not found. Please check your order ID.');
      } else if (err.response?.status === 500) {
        setError('Server error. Please try again later.');
      } else {
        setError('Failed to fetch order details. Please try again later.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleTrackOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await axios.get(`http://localhost:5000/api/orders/${orderId}`);
      if (response.data) {
        setOrder(response.data);
        // Navigate to the order details view with the order ID
        navigate(`/track-order/${response.data._id}`);
      } else {
        setError('Order not found. Please check your order ID.');
      }
    } catch (err: any) {
      console.error('Error tracking order:', err);
      if (err.response?.status === 404) {
        setError('Order not found. Please check your order ID.');
      } else if (err.response?.status === 500) {
        setError('Server error. Please try again later.');
      } else {
        setError('Failed to track order. Please try again later.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 bg-[#18181b] text-gray-100">
      {/* Hero Banner */}
      <div className="relative bg-[#23232a] text-gray-100 py-16">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/322207/pexels-photo-322207.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)'
          }}
        ></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Order Tracking</h1>
            <div className="w-24 h-1 bg-[#D4AF37] mb-6"></div>
            {order && (
              <div className="mb-8">
                <div className="flex items-center">
                  {order.status === 'pending' && <CheckCircle className="w-5 h-5 text-yellow-400" />}
                  {order.status === 'processing' && <Cog className="w-5 h-5 text-blue-400" />}
                  {order.status === 'shipped' && <Truck className="w-5 h-5 text-blue-500" />}
                  {order.status === 'delivered' && <PackageCheck className="w-5 h-5 text-green-500" />}
                  {order.status === 'cancelled' && <AlertCircle className="w-5 h-5 text-red-500" />}
                  <span className={`ml-2 font-bold ${
                    order.status === 'pending' ? 'text-yellow-400' :
                    order.status === 'processing' ? 'text-blue-400' :
                    order.status === 'shipped' ? 'text-blue-500' :
                    order.status === 'delivered' ? 'text-green-500' :
                    order.status === 'cancelled' ? 'text-red-500' :
                    'text-gray-300'
                  }`}>
                    {order.status === 'pending' ? 'Order Placed' :
                    order.status === 'processing' ? 'Processing' :
                    order.status === 'shipped' ? 'Shipped' :
                    order.status === 'delivered' ? 'Delivered' :
                    order.status === 'cancelled' ? 'Cancelled' :
                    order.status}
                  </span>
                </div>
                <p className="text-sm text-gray-300 mt-1">Placed on: {new Date(order.createdAt).toLocaleDateString()}</p>
              </div>
            )}
            <p className="text-lg mb-6">
              Track the status of your Aura Tea order. Enter your order ID below to get the latest updates.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-xl mx-auto bg-[#23232a] rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-serif font-bold mb-6 text-center">Find Your Order</h2>
          <form onSubmit={handleTrackOrder} className="space-y-4">
            <div>
              <label htmlFor="orderId" className="block text-gray-300 font-medium mb-2">Order ID</label>
              <input
                type="text"
                id="orderId"
                className="w-full px-4 py-2 border border-gray-700 rounded-md bg-[#121212] text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                placeholder="Enter your order ID"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#D4AF37] text-black font-bold py-2 px-4 rounded-md hover:bg-[#c4a030] transition-colors flex items-center justify-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <svg className="animate-spin h-5 w-5 mr-3 text-black" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <Truck className="mr-2 w-5 h-5" />
              )}
              {isLoading ? 'Tracking...' : 'Track Order'}
            </button>
          </form>

          {error && (
            <div className="mt-6 bg-red-800 text-red-200 p-4 rounded-md flex items-center">
              <AlertCircle className="w-5 h-5 mr-3" />
              <p>{error}</p>
            </div>
          )}
        </div>

        {order && (
          <div className="mt-8 bg-[#23232a] rounded-lg shadow-md p-8">
            <div className="mb-8">
              <div className="flex items-center justify-center">
                <div className="flex flex-col items-center">
                  {order.status === 'pending' && <CheckCircle className="w-10 h-10 text-yellow-400 mb-2" />}
                  {order.status === 'processing' && <Cog className="w-10 h-10 text-blue-400 mb-2" />}
                  {order.status === 'shipped' && <Truck className="w-10 h-10 text-blue-500 mb-2" />}
                  {order.status === 'delivered' && <PackageCheck className="w-10 h-10 text-green-500 mb-2" />}
                  {order.status === 'cancelled' && <AlertCircle className="w-10 h-10 text-red-500 mb-2" />}
                  <span className={`text-2xl font-bold ${
                    order.status === 'pending' ? 'text-yellow-400' :
                    order.status === 'processing' ? 'text-blue-400' :
                    order.status === 'shipped' || order.status === 'delivered' ? 'text-green-500' :
                    order.status === 'cancelled' ? 'text-red-500' :
                    'text-gray-300'
                  }`}>
                    {order.status === 'pending' ? 'Order Placed' :
                    order.status === 'processing' ? 'Processing' :
                    order.status === 'shipped' || order.status === 'delivered' ? 'Shipped' :
                    order.status === 'cancelled' ? 'Cancelled' :
                    order.status}
                  </span>
                </div>
              </div>
              <p className="text-center text-sm text-gray-300 mt-4">Placed on: {new Date(order.createdAt).toLocaleDateString()}</p>
            </div>

            {/* Status Timeline */}
            <div className="mt-8">
              <h3 className="text-xl font-serif font-bold mb-4 border-b border-gray-700 pb-3">Order Timeline</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-center">
                  <div className={`w-3 h-3 rounded-full ${
                    order.status === 'pending' ? 'bg-yellow-400' :
                    order.status === 'processing' ? 'bg-blue-400' :
                    order.status === 'shipped' || order.status === 'delivered' ? 'bg-green-500' :
                    order.status === 'cancelled' ? 'bg-red-500' :
                    'bg-gray-300'
                  }`}>
                  </div>
                  <div className={`ml-3 ${
                    order.status === 'pending' ? 'text-yellow-400' :
                    order.status === 'processing' ? 'text-blue-400' :
                    order.status === 'shipped' || order.status === 'delivered' ? 'text-green-500' :
                    order.status === 'cancelled' ? 'text-red-500' :
                    'text-gray-300'
                  }`}>
                    Order Placed
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <div className={`w-3 h-3 rounded-full ${
                    order.status === 'processing' ? 'bg-blue-400' :
                    order.status === 'shipped' || order.status === 'delivered' ? 'bg-green-500' :
                    order.status === 'cancelled' ? 'bg-red-500' :
                    'bg-gray-300'
                  }`}>
                  </div>
                  <div className={`ml-3 ${
                    order.status === 'processing' ? 'text-blue-400' :
                    order.status === 'shipped' || order.status === 'delivered' ? 'text-green-500' :
                    order.status === 'cancelled' ? 'text-red-500' :
                    'text-gray-300'
                  }`}>
                    Processing
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <div className={`w-3 h-3 rounded-full ${
                    order.status === 'shipped' || order.status === 'delivered' ? 'bg-green-500' :
                    order.status === 'cancelled' ? 'bg-red-500' :
                    'bg-gray-300'
                  }`}>
                  </div>
                  <div className={`ml-3 ${
                    order.status === 'shipped' || order.status === 'delivered' ? 'text-green-500' :
                    order.status === 'cancelled' ? 'text-red-500' :
                    'text-gray-300'
                  }`}>
                    Shipped
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <div className={`w-3 h-3 rounded-full ${
                    order.status === 'delivered' ? 'bg-green-500' :
                    order.status === 'cancelled' ? 'bg-red-500' :
                    'bg-gray-300'
                  }`}>
                  </div>
                  <div className={`ml-3 ${
                    order.status === 'delivered' ? 'text-green-500' :
                    order.status === 'cancelled' ? 'text-red-500' :
                    'text-gray-300'
                  }`}>
                    Delivered
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div className="bg-[#121212] text-gray-100 py-16 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold mb-4">Need Help?</h2>
          <p className="text-lg max-w-2xl mx-auto mb-8 text-gray-300">
            If you have any questions about your order or tracking, please don't hesitate to contact our customer support.
          </p>
          <a 
            href="/contact"
            className="inline-flex items-center px-8 py-3 bg-[#D4AF37] text-black font-bold rounded-md hover:bg-[#c4a030] transition-colors"
          >
            <Mail className="mr-2 w-5 h-5" /> Contact Support
          </a>
        </div>
      </div>
    </div>
  );
};

export default TrackingPage; 