const mongoose = require('mongoose');

const purchaseOrderSchema = new mongoose.Schema({
  orderNumber: { type: String, required: true, unique: true },
  supplier: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier', required: true },
  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true, min: 1 },
    unitPrice: { type: Number, required: true, min: 0 },
    totalPrice: { type: Number, required: true, min: 0 } // quantity * unitPrice
  }],
  orderDate: { type: Date, default: Date.now },
  expectedDeliveryDate: Date,
  actualDeliveryDate: Date,
  status: {
    type: String,
    enum: ['draft', 'sent', 'confirmed', 'shipped', 'delivered', 'cancelled'],
    default: 'draft'
  },
  totalAmount: { type: Number, required: true, min: 0 },
  notes: String,
}, { timestamps: true });

module.exports = mongoose.model('PurchaseOrder', purchaseOrderSchema);