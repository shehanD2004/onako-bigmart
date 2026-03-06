const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sku: { type: String, unique: true, sparse: true },
  category: { type: String },
  price: { type: Number, default: 0 },
  stock: { type: Number, default: 0 },
  unit: { type: String, default: 'pcs' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Product', productSchema);