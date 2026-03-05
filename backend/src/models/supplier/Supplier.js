const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contactPerson: String,
  email: { type: String, required: true, unique: true },
  phone: String,
  address: String,
  paymentTerms: String,   // e.g., "Net 30"
  rating: { type: Number, min: 0, max: 5, default: 0 },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  notes: String,
}, { timestamps: true });

module.exports = mongoose.model('Supplier', supplierSchema);