#!/usr/bin/env node

/**
 * Local API server for development
 * This mimics the Vercel serverless functions locally
 */

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/eka-store';

async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ MongoDB connected:', MONGODB_URI);
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
}

// Order Schema (same as api/orders.ts)
const orderSchema = new mongoose.Schema({
  items: [
    {
      id: String,
      name: String,
      price: Number,
      quantity: Number,
    },
  ],
  customer: {
    name: String,
    email: String,
    phone: String,
  },
  shippingAddress: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
  },
  notes: String,
  totalAmount: Number,
  status: { type: String, default: 'created' },
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model('Order', orderSchema);

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'API working' });
});

app.post('/api/orders', async (req, res) => {
  try {
    const { items, customer, shippingAddress, notes } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    const totalAmount = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const order = await Order.create({
      items,
      customer,
      shippingAddress,
      notes,
      totalAmount,
      status: 'created',
    });

    return res.status(201).json({ message: 'Order stored', orderId: order._id });
  } catch (error) {
    console.error('Order error:', error);
    return res.status(500).json({ message: 'Failed to create order', error: error.message });
  }
});

app.get('/api/orders', async (req, res) => {
  try {
    const orders = await Order.find().limit(10).sort({ createdAt: -1 });
    return res.status(200).json(orders);
  } catch (error) {
    console.error('Fetch orders error:', error);
    return res.status(500).json({ message: 'Failed to fetch orders' });
  }
});

// Start server
async function start() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`\n🚀 Local API server running on http://localhost:${PORT}`);
    console.log(`📝 POST orders: http://localhost:${PORT}/api/orders`);
    console.log(`📊 GET orders: http://localhost:${PORT}/api/orders\n`);
  });
}

start();
