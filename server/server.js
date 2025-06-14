const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Razorpay = require('razorpay');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/teaorders', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Order Schema
const orderSchema = new mongoose.Schema({
  items: [
    {
      product: {
        id: String,
        name: String,
        price: Number,
        image: String,
        // Add other product properties if necessary for tracking page display
      },
      quantity: Number,
    },
  ],
  subtotal: Number,
  shipping: Number,
  total: Number,
  customerInfo: Object,
  shippingMethod: String,
  paymentMethod: String,
  status: String,
  createdAt: { type: Date, default: Date.now },
  paymentStatus: { type: String, default: 'unpaid' },
  paymentId: String,
});

const Order = mongoose.model('Order', orderSchema);

const razorpay = new Razorpay({
  key_id: 'rzp_test_NyLZPzYHIYtxqW',
  key_secret: 'OixhI108NMwzhJIAkNrHx5jx',
});

// Create Order
app.post('/api/orders', async (req, res) => {
  const order = new Order(req.body);
  await order.save();
  res.status(201).json(order);
});

// Get All Orders
app.get('/api/orders', async (req, res) => {
  const orders = await Order.find().sort({ createdAt: -1 });
  res.json(orders);
});

// Get Order by ID
app.get('/api/orders/:id', async (req, res) => {
  try {
    // First try to find by MongoDB _id
    let order = await Order.findById(req.params.id);
    
    // If not found, try to find by orderId
    if (!order) {
      order = await Order.findOne({ orderId: req.params.id });
    }
    
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    res.json(order);
  } catch (err) {
    res.status(404).json({ error: 'Order not found' });
  }
});

// Update Order Status
app.patch('/api/orders/:id', async (req, res) => {
  const { status } = req.body;
  const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
  res.json(order);
});

// Create Razorpay Order
app.post('/api/create-razorpay-order', async (req, res) => {
  const { amount, currency = 'INR', receipt } = req.body;
  try {
    const options = {
      amount: amount * 100, // amount in paise
      currency,
      receipt,
    };
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create Razorpay order' });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});