const mongoose = require('mongoose');

const OrderItemSchema = new mongoose.Schema({
  productID: { type: String, required: true },
  name: { type: String, required: true }, // Added for UI display
  quantity: { type: Number, required: true },
  unitPriceAtSale: { type: Number, required: true },
  isPacked: { type: Boolean, default: false } // For PackingList.jsx checklist
});

const OrderSchema = new mongoose.Schema({
  orderID: { type: String, required: true, unique: true },
  orderDate: { type: Date, default: Date.now },
  customer: {
    name: String,
    phoneNumber: String,
    address: {
      houseNumber: String,
      street: String,
      landMark: String
    }
  },
  items: [OrderItemSchema],
  totalAmount: { type: Number, required: true },
  status: {
    type: String,
    enum: ['Pending', 'Packing', 'Out for Delivery', 'Delivered'],
    default: 'Pending'
  },
  paymentType: { type: String, required: true },
  assignedStaff: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff' }
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);