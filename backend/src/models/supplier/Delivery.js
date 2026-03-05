const mongoose = require('mongoose');

const deliverySchema = new mongoose.Schema({
  purchaseOrder: { type: mongoose.Schema.Types.ObjectId, ref: 'PurchaseOrder', required: true },
  deliveryDate: { type: Date, default: Date.now },
  receivedBy: String,
  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantityReceived: { type: Number, required: true, min: 0 },
    condition: String,   // e.g., "good", "damaged"
    notes: String
  }],
  status: { type: String, enum: ['pending', 'completed', 'partial'], default: 'pending' },
  notes: String,
}, { timestamps: true });

module.exports = mongoose.model('Delivery', deliverySchema);