const mongoose = require('mongoose');

const supplierProductSchema = new mongoose.Schema({
  supplier: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier', required: true },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  price: { type: Number, required: true, min: 0 },
  currency: { type: String, default: 'USD' },
  minimumOrderQuantity: { type: Number, default: 1 },
  leadTimeDays: Number,   // days from order to delivery
}, { timestamps: true });

// Ensure a supplier can have only one price per product
supplierProductSchema.index({ supplier: 1, product: 1 }, { unique: true });

module.exports = mongoose.model('SupplierProduct', supplierProductSchema);