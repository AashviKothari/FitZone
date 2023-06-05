// routes/orders.js

const express = require('express');
const router = express.Router();

const Order = require('../models/Order');
const Product = require('../models/Product.js');

// Get all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new order
router.post('/', async (req, res) => {
  const order = new Order({
    userId: req.body.userId,
    products: req.body.products,
    // Add more fields as needed
  });

  try {
    // Validate the products in the order
    const productIds = req.body.products.map((product) => product.productId);
    const products = await Product.find({ _id: { $in: productIds } });
    if (productIds.length !== products.length) {
      return res.status(400).json({ message: 'Invalid products in the order' });
    }

    const newOrder = await order.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get a specific order
router.get('/:id', getOrder, (req, res) => {
  res.json(res.order);
});

// Middleware function to get an order by ID
async function getOrder(req, res, next) {
  try {
    const order = await Order.findById(req.params.id);
    if (order === null) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.order = order;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

// Delete an order
router.delete('/:id', getOrder, async (req, res) => {
  try {
    await res.order.remove();
    res.json({ message: 'Order deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update an order
router.patch('/:id', getOrder, async (req, res) => {
  if (req.body.products != null) {
    res.order.products = req.body.products;
  }
  // Update more fields as needed

  try {
    const updatedOrder = await res.order.save();
    res.json(updatedOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
