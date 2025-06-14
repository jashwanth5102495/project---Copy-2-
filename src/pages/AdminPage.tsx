import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Order {
  _id: string;
  items: any[];
  subtotal: number;
  shipping: number;
  total: number;
  customerInfo: {
    name: string;
    mobile: string;
    address: string;
    pincode: string;
    landmark: string;
    state: string;
    city: string;
  };
  shippingMethod: string;
  paymentMethod: string;
  status: string;
  paymentStatus: string;
  paymentId: string;
  createdAt: string;
}

const ADMIN_PASSWORD = 'admin123'; // Change this to your desired password

const AdminPage: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/orders');
      setOrders(response.data);
    } catch (err) {
      alert('Failed to fetch orders');
    }
    setLoading(false);
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchOrders();
    }
  }, [isLoggedIn]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsLoggedIn(true);
    } else {
      alert('Incorrect password');
    }
  };

  const updateOrderStatus = async (orderId: string, status: string) => {
    try {
      await axios.patch(`http://localhost:5000/api/orders/${orderId}`, { status });
      setOrders(orders.map(order => 
        order._id === orderId ? { ...order, status } : order
      ));
      alert('Status updated successfully');
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to update order status');
    }
  };

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      await axios.patch(`http://localhost:5000/api/orders/${orderId}`, { status: newStatus });
      setOrders(orders.map(order => 
        order._id === orderId ? { ...order, status: newStatus } : order
      ));
      alert('Status updated successfully');
    } catch (error: any) {
      alert(error.response?.data?.message || 'Failed to update order status');
    }
  };

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleDeleteOrder = async (orderId: string) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      try {
        await axios.delete(`http://localhost:5000/api/orders/${orderId}`);
        setOrders(orders.filter(order => order._id !== orderId));
      } catch (error) {
        console.error('Error deleting order:', error);
      }
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#18181b] text-gray-100">
        <form onSubmit={handleLogin} className="bg-[#23232a] p-8 rounded shadow-md w-80">
          <h2 className="text-2xl font-bold mb-4 text-center">Admin Login</h2>
          <input
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-700 rounded mb-4 bg-[#121212] text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
            required
          />
          <button
            type="submit"
            className="w-full bg-[#D4AF37] text-black font-bold py-2 rounded hover:bg-[#c4a030] transition-colors"
          >
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#18181b] text-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8">Admin Panel - Orders</h1>
      <button
        onClick={fetchOrders}
        className="mb-4 px-4 py-2 bg-[#D4AF37] text-black font-bold rounded hover:bg-[#c4a030] transition-colors"
      >
        Refresh
      </button>
      {loading ? (
        <div className="text-center text-gray-400">Loading orders...</div>
      ) : orders.length === 0 ? (
        <div className="text-center text-gray-400">No orders found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-[#121212]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Payment</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-[#23232a] divide-y divide-gray-700">
              {orders.map((order) => (
                <tr key={order._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{order._id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{order.customerInfo.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">₹{order.total}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                      className="bg-[#121212] text-gray-300 border border-gray-700 rounded px-2 py-1 text-sm cursor-pointer"
                      title="Change order status"
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col">
                      <span className={`text-sm ${order.paymentStatus === 'paid' ? 'text-green-500' : 'text-red-500'}`}>
                        {order.paymentStatus === 'paid' ? 'Paid' : 'Unpaid'}
                      </span>
                      {order.paymentId && (
                        <span className="text-xs text-gray-400">ID: {order.paymentId}</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    <button
                      onClick={() => handleViewOrder(order)}
                      className="text-[#D4AF37] hover:text-[#c4a030] mr-3"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleDeleteOrder(order._id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Order Details Modal */}
      {isModalOpen && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-[#23232a] rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Order Details</h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-gray-200"
                >
                  ✕
                </button>
              </div>

              {/* Customer Information */}
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-3">Customer Information</h3>
                <div className="bg-[#121212] p-4 rounded-md">
                  <p><strong>Name:</strong> {selectedOrder.customerInfo.name}</p>
                  <p><strong>Mobile:</strong> {selectedOrder.customerInfo.mobile}</p>
                  <p><strong>Address:</strong> {selectedOrder.customerInfo.address}</p>
                  <p><strong>Landmark:</strong> {selectedOrder.customerInfo.landmark}</p>
                  <p><strong>City:</strong> {selectedOrder.customerInfo.city}</p>
                  <p><strong>State:</strong> {selectedOrder.customerInfo.state}</p>
                  <p><strong>Pincode:</strong> {selectedOrder.customerInfo.pincode}</p>
                </div>
              </div>

              {/* Order Items */}
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-3">Order Items</h3>
                <div className="space-y-4">
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className="flex items-center justify-between bg-[#121212] p-4 rounded-md">
                      <div className="flex items-center">
                        {item.product?.image && (
                          <img
                            src={item.product.image}
                            alt={item.product.name || 'Product'}
                            className="w-16 h-16 object-cover rounded-md mr-4"
                          />
                        )}
                        <div>
                          <p className="font-bold">{item.product?.name || 'Unknown Product'}</p>
                          <p className="text-sm text-gray-400">Quantity: {item.quantity}</p>
                        </div>
                      </div>
                      <p className="font-bold">
                        ₹{typeof item.product?.price === 'number' && typeof item.quantity === 'number'
                          ? (item.product.price * item.quantity).toFixed(2)
                          : 'N/A'}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-3">Order Summary</h3>
                <div className="bg-[#121212] p-4 rounded-md">
                  <p><strong>Subtotal:</strong> ₹{selectedOrder.subtotal}</p>
                  <p><strong>Shipping:</strong> ₹{selectedOrder.shipping}</p>
                  <p><strong>Total:</strong> ₹{selectedOrder.total}</p>
                  <p><strong>Payment Method:</strong> {selectedOrder.paymentMethod}</p>
                  <p><strong>Shipping Method:</strong> {selectedOrder.shippingMethod}</p>
                  <p><strong>Order Status:</strong> {selectedOrder.status}</p>
                  <p><strong>Payment Status:</strong> {selectedOrder.paymentStatus}</p>
                  {selectedOrder.paymentId && (
                    <p><strong>Payment ID:</strong> {selectedOrder.paymentId}</p>
                  )}
                  <p><strong>Order Date:</strong> {new Date(selectedOrder.createdAt).toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage; 