const express = require('express');
const router = express.Router();
const Order = require('../models/orders'); // Double-check if this is order or orders!

// READ: Get all orders from MongoDB Atlas
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error: error.message });
  }
});

// UPDATE: Change status (The 'U' in CRUD)
router.put('/:id', async (req, res) => {
  try {
    const { status } = req.body;
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id, 
      { status }, 
      { new: true }
    );
    if (!updatedOrder) return res.status(404).json({ message: "Order not found" });
    res.json(updatedOrder);
  } catch (error) {
    res.status(400).json({ message: "Error updating order", error: error.message });
  }
});

module.exports = router;