const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  supplier: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier', required: true },
  purchaseOrder: { type: mongoose.Schema.Types.ObjectId, ref: 'PurchaseOrder' },
  invoiceNumber: { type: String, required: true },
  amount: { type: Number, required: true },
  paymentDate: { type: Date },
  paymentMethod: { type: String },
  status: { type: String, enum: ['Pending', 'Paid', 'Voided', 'pending', 'completed', 'failed'], default: 'pending' },
  notes: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Payment', paymentSchema);