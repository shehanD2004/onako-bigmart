const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customer: { type: String, required: true },
  landmark: { type: String, required: true },
  total: { type: Number, required: true },
  status: { type: String, default: 'Received' },
  items: [
    {
      id: Number,
      name: String,
      qty: Number,
      shelf: String
    }
  ]
});

module.exports = mongoose.model('Order', orderSchema);