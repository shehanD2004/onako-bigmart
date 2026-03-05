const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  supplier: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier', required: true },
  purchaseOrder: { type: mongoose.Schema.Types.ObjectId, ref: 'PurchaseOrder' }, // optional
  invoiceNumber: String,
  amount: { type: Number, required: true, min: 0 },
  paymentDate: { type: Date, default: Date.now },
  paymentMethod: String,   // e.g., "bank transfer", "cheque"
  status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
  notes: String,
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);