const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Mock data for products
const mockProducts = [
  { id: '1', name: 'Classic Aviator Sunglasses', price: 149.99 },
  { id: '2', name: 'Round Frame Glasses', price: 89.99 },
  { id: '3', name: 'Sport Performance Glasses', price: 199.99 },
  { id: '4', name: 'Designer Reading Glasses', price: 299.99 },
  { id: '5', name: 'Kids Sunglasses', price: 49.99 },
  { id: '6', name: 'Blue Light Blocking Glasses', price: 129.99 },
  { id: '7', name: 'Cat Eye Sunglasses', price: 79.99 },
  { id: '8', name: 'Polarized Driving Glasses', price: 249.99 }
];

// In-memory cart storage (in a real app, this would be in a database)
let cart = [];

// Routes

// GET /api/products: 5-10 mock items (id, name, price)
app.get('/api/products', (req, res) => {
  res.json(mockProducts);
});

// POST /api/cart: Add {productId, qty}
app.post('/api/cart', (req, res) => {
  const { productId, qty } = req.body;
  
  // Validate input
  if (!productId || !qty) {
    return res.status(400).json({ error: 'productId and qty are required' });
  }
  
  // Check if product exists
  const product = mockProducts.find(p => p.id === productId);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  
  // Convert qty to number
  const quantity = parseInt(qty);
  if (isNaN(quantity) || quantity <= 0) {
    return res.status(400).json({ error: 'Invalid quantity' });
  }
  
  // Check if item is already in cart
  const existingItem = cart.find(item => item.productId === productId);
  
  if (existingItem) {
    // Update quantity
    existingItem.qty += quantity;
  } else {
    // Add new item to cart
    cart.push({ productId, qty: quantity });
  }
  
  res.status(201).json({ message: 'Item added to cart', cart });
});

// DELETE /api/cart/:id: Remove item
app.delete('/api/cart/:id', (req, res) => {
  const productId = req.params.id;
  
  // Check if item is in cart
  const itemIndex = cart.findIndex(item => item.productId === productId);
  
  if (itemIndex === -1) {
    return res.status(404).json({ error: 'Item not found in cart' });
  }
  
  // Remove item from cart
  cart.splice(itemIndex, 1);
  
  res.json({ message: 'Item removed from cart', cart });
});

// GET /api/cart: Get cart + total
app.get('/api/cart', (req, res) => {
  // Calculate total
  let total = 0;
  
  // Map cart items with product details
  const cartItems = cart.map(item => {
    const product = mockProducts.find(p => p.id === item.productId);
    if (product) {
      const subtotal = product.price * item.qty;
      total += subtotal;
      return {
        ...item,
        product: {
          id: product.id,
          name: product.name,
          price: product.price
        },
        subtotal: subtotal
      };
    }
    return null;
  }).filter(item => item !== null);
  
  res.json({ cartItems, total: total.toFixed(2) });
});

// POST /api/checkout: {cartItems} → mock receipt (total, timestamp)
app.post('/api/checkout', (req, res) => {
  const { name, email } = req.body;
  
  // Validate input
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }
  
  // Get cart items and total
  let total = 0;
  const cartItems = cart.map(item => {
    const product = mockProducts.find(p => p.id === item.productId);
    if (product) {
      const subtotal = product.price * item.qty;
      total += subtotal;
      return {
        productId: product.id,
        name: product.name,
        price: product.price,
        qty: item.qty,
        subtotal: subtotal
      };
    }
    return null;
  }).filter(item => item !== null);
  
  // Create mock receipt
  const receipt = {
    id: `receipt_${Date.now()}`,
    name,
    email,
    items: cartItems,
    total: parseFloat(total.toFixed(2)),
    timestamp: new Date().toISOString()
  };
  
  // Clear cart after checkout
  cart = [];
  
  res.json(receipt);
});

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ message: 'E-commerce Backend API is running!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;