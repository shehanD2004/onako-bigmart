const mongoose = require('mongoose');

const supplierProductSchema = new mongoose.Schema({
  supplier: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier', required: true },
  product: { type: String, required: true },
  price: { type: Number, required: true },
  currency: { type: String, default: 'LKR' },
  minimumOrderQuantity: { type: Number, default: 1 },
  leadTime: { type: Number },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('SupplierProduct', supplierProductSchema);