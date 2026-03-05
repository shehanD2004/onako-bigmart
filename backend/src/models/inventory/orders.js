const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customer: { type: String, required: true }, // For neighborhood customers
  address: {
    line: String,
    landmark: String, // Vital for local delivery
    phone: String
  },
  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    name: String,
    quantity: Number,
    price: Number // Storing price at time of sale
  }],
  totalAmount: Number,
  status: {
    type: String,
    enum: ['Received', 'Packing', 'Ready', 'Out for Delivery', 'Delivered'],
    default: 'Received'
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);