const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Staff = require('../models/Staff');

// @desc    Get all active orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().populate('assignedStaff');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @desc    Update Order Status (The Stepper Logic)
router.put('/:id/status', async (req, res) => {
  const { status, staffId } = req.body;
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    order.status = status;
    
    // Logic: If status is 'Out for Delivery', assign a staff member
    if (status === 'Out for Delivery' && staffId) {
      order.assignedStaff = staffId;
    }

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// @desc    Toggle item packing status (The Checklist Logic)
router.put('/:id/pack-item/:itemIdx', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    const itemIdx = req.params.itemIdx;
    
    order.items[itemIdx].isPacked = !order.items[itemIdx].isPacked;
    await order.save();
    res.json(order);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;