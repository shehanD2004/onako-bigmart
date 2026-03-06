const mongoose = require('mongoose');

const deliverySchema = new mongoose.Schema({
  supplier: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier', required: true },
  deliveryDate: { type: Date, required: true },
  receivedQuantities: { type: Number },
  receivedBy: { type: String },
  items: [{
    product: { type: String },
    quantityReceived: { type: Number, default: 0 },
    condition: { type: String, enum: ['good', 'damaged', 'partial'], default: 'good' },
    notes: { type: String },
  }],
  status: { type: String, enum: ['pending', 'completed', 'partial'], default: 'pending' },
  qualityNotes: { type: String },
  notes: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Delivery', deliverySchema);