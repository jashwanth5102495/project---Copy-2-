import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { CheckCircle, Cog, Truck, PackageCheck, Mail, Loader2, AlertCircle, ArrowLeft } from 'lucide-react';
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

const OrderTrackingPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderId) {
        setError('No order ID provided.');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(`http://localhost:5000/api/orders/${orderId}`);
        
        if (response.data) {
          setOrder(response.data);
        } else {
          setError('Order not found. Please check your order ID.');
        }
      } catch (err: any) {
        console.error("Error fetching order:", err);
        if (err.response?.status === 404) {
          setError('Order not found. Please check your order ID.');
        } else if (err.response?.status === 500) {
          setError('Server error. Please try again later.');
        } else {
          setError('Failed to fetch order details. Please try again later.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (loading) {
    return (
      <div className="min-h-screen pt-20 bg-[#18181b] text-gray-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="animate-spin w-12 h-12 text-[#D4AF37] mx-auto mb-4" />
          <p className="text-lg">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-20 bg-[#18181b] text-gray-100">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-xl mx-auto bg-[#23232a] rounded-lg shadow-md p-8 text-center">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-serif font-bold mb-4 text-red-300">Error</h2>
            <p className="text-gray-300 mb-6">{error}</p>
            <div className="space-y-4">
              <button
                onClick={() => navigate('/track-order')}
                className="inline-flex items-center px-6 py-3 bg-[#D4AF37] text-black font-bold rounded-md hover:bg-[#c4a030] transition-colors"
              >
                <ArrowLeft className="mr-2 w-5 h-5" /> Back to Tracking
              </button>
              <button
                onClick={() => navigate('/contact')}
                className="inline-flex items-center px-6 py-3 bg-[#23232a] text-gray-100 font-bold rounded-md hover:bg-[#2a2a32] transition-colors border border-gray-700"
              >
                <Mail className="mr-2 w-5 h-5" /> Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen pt-20 bg-[#18181b] text-gray-100">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-xl mx-auto bg-[#23232a] rounded-lg shadow-md p-8 text-center">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-serif font-bold mb-4 text-red-300">Order Not Found</h2>
            <p className="text-gray-300 mb-6">The order ID you provided could not be found in our system.</p>
            <button
              onClick={() => navigate('/track-order')}
              className="inline-flex items-center px-6 py-3 bg-[#D4AF37] text-black font-bold rounded-md hover:bg-[#c4a030] transition-colors"
            >
              <ArrowLeft className="mr-2 w-5 h-5" /> Back to Tracking
            </button>
          </div>
        </div>
      </div>
    );
  }

  const statusSteps = [
    { status: 'confirmed', icon: <CheckCircle /> },
    { status: 'processing', icon: <Cog /> },
    { status: 'shipped', icon: <Truck /> },
    { status: 'out_for_delivery', icon: <Truck /> },
    { status: 'delivered', icon: <PackageCheck /> },
  ];

  const getStatusDisplay = (status: string) => {
    const statusMap: { [key: string]: string } = {
      'confirmed': 'Order Placed',
      'processing': 'Processing',
      'shipped': 'Shipped',
      'out_for_delivery': 'Out for Delivery',
      'delivered': 'Delivered'
    };
    return statusMap[status] || status;
  };

  const currentStatusIndex = statusSteps.findIndex(step => step.status.toLowerCase() === order.status.toLowerCase());

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
            <p className="text-lg mb-6">
              Track your order status and estimated delivery.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto bg-[#23232a] rounded-lg shadow-md p-8">
          <h2 className="text-3xl font-serif font-bold mb-6 border-b border-gray-700 pb-4">Order #{order.orderId || order._id}</h2>
          
          <div className="mb-8">
            <p className="text-lg text-gray-300">Current Status: <span className="font-bold text-[#D4AF37]">{getStatusDisplay(order.status)}</span></p>
            <p className="text-sm text-gray-300 mt-1">Placed on: {new Date(order.createdAt).toLocaleDateString()}</p>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center justify-between mb-8 relative">
            {statusSteps.map((step, index) => (
              <React.Fragment key={index}>
                <div className="flex flex-col items-center">
                  <div 
                    className={`w-10 h-10 rounded-full flex items-center justify-center z-10 
                      ${index <= currentStatusIndex ? 'bg-[#D4AF37] text-black' : 'bg-gray-700 text-gray-400'}
                    `}
                  >
                    {step.icon}
                  </div>
                  <p 
                    className={`text-center text-sm mt-2 
                      ${index <= currentStatusIndex ? 'text-gray-100 font-semibold' : 'text-gray-300'}
                    `}
                  >{getStatusDisplay(step.status)}</p>
                </div>
                {index < statusSteps.length - 1 && (
                  <div 
                    className={`flex-grow h-1 mx-2 
                      ${index < currentStatusIndex ? 'bg-[#D4AF37]' : 'bg-gray-700'}
                      absolute top-5 left-[calc(${index * (100 / (statusSteps.length - 1))}%) + 20px] right-[calc(${((statusSteps.length - 1 - index) * (100 / (statusSteps.length - 1)))}%) + 20px]
                      transform -translate-y-1/2
                    `}
                  ></div>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Order Items */}
          <div className="mt-8">
            <h3 className="text-xl font-serif font-bold mb-4 border-b border-gray-700 pb-3">Items in Your Order</h3>
            <div className="space-y-4">
              {order.items.map((item: OrderItem, index: number) => (
                <div key={index} className="flex items-center justify-between bg-[#121212] p-4 rounded-md border border-gray-800">
                  <div className="flex items-center">
                    {item.product?.image && (
                      <img 
                        src={item.product.image} 
                        alt={item.product.name || 'Product Image'} 
                        className="w-16 h-16 object-cover rounded-md mr-4 border border-gray-700"
                      />
                    )}
                    <div>
                      <p className="font-bold text-gray-100">{item.product?.name || 'Unknown Product'}</p>
                      {typeof item.quantity === 'number' && (
                        <p className="text-sm text-gray-300">Quantity: {item.quantity}</p>
                      )}
                    </div>
                  </div>
                  <p className="font-bold text-gray-100">
                    ₹{
                      typeof item.product?.price === 'number' && typeof item.quantity === 'number'
                        ? (item.product.price * item.quantity).toFixed(2)
                        : 'N/A'
                    }
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery Address */}
          <div className="mt-8">
            <h3 className="text-xl font-serif font-bold mb-4 border-b border-gray-700 pb-3">Delivery Address</h3>
            <div className="bg-[#121212] p-4 rounded-md border border-gray-800 text-gray-300">
              <p><strong>{order.customerInfo.name}</strong></p>
              <p>{order.customerInfo.address}, {order.customerInfo.landmark}</p>
              <p>{order.customerInfo.city}, {order.customerInfo.state} - {order.customerInfo.pincode}</p>
              <p>Mobile: {order.customerInfo.mobile}</p>
            </div>
          </div>

          {/* Payment & Shipping Summary */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#121212] p-4 rounded-md shadow-sm border border-gray-800">
              <h3 className="text-xl font-serif font-bold mb-3 text-gray-100">Payment Details</h3>
              <p className="text-gray-300">Method: <span className="font-semibold capitalize">{order.paymentMethod}</span></p>
              <p className="text-gray-300">Total Paid: <span className="font-bold text-[#D4AF37]">₹{order.total.toFixed(2)}</span></p>
            </div>
            <div className="bg-[#121212] p-4 rounded-md shadow-sm border border-gray-800">
              <h3 className="text-xl font-serif font-bold mb-3 text-gray-100">Shipping Details</h3>
              <p className="text-gray-300">Method: <span className="font-semibold capitalize">{order.shippingMethod}</span></p>
              <p className="text-gray-300">Cost: <span className="font-bold">{order.shippingCost === 0 ? 'FREE' : `₹${order.shippingCost.toFixed(2)}`}</span></p>
            </div>
          </div>

          {/* Need Help CTA */}
          <div className="mt-8 text-center">
            <p className="text-gray-300 mb-4">Have a question about your order?</p>
            <Link 
              to="/contact"
              className="inline-flex items-center px-6 py-3 bg-[#D4AF37] text-black font-bold rounded-md hover:bg-[#c4a030] transition-colors"
            >
              <Mail className="mr-2 w-5 h-5" /> Contact Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTrackingPage; 