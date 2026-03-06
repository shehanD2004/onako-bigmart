const Supplier = require('../../models/supplier/Supplier');
const PurchaseOrder = require('../../models/supplier/PurchaseOrder');
const SupplierProduct = require('../../models/supplier/SupplierProduct');
const Delivery = require('../../models/supplier/Delivery');
const Payment = require('../../models/supplier/Payment');

// @desc    Get all suppliers
// @route   GET /api/suppliers
exports.getSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    res.json(suppliers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single supplier by ID
// @route   GET /api/suppliers/:id
exports.getSupplierById = async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id);
    if (!supplier) return res.status(404).json({ message: 'Supplier not found' });
    res.json(supplier);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new supplier
// @route   POST /api/suppliers
exports.createSupplier = async (req, res) => {
  try {
    const { name, contact, terms, rating } = req.body;
    
    // Validate required fields
    if (!name || !contact || !terms) {
      return res.status(400).json({ message: 'Name, contact, and terms are required' });
    }

    const supplier = new Supplier({ name, contact, terms, rating });
    const saved = await supplier.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update supplier
// @route   PUT /api/suppliers/:id
exports.updateSupplier = async (req, res) => {
  try {
    const supplier = await Supplier.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!supplier) return res.status(404).json({ message: 'Supplier not found' });
    res.json(supplier);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete supplier
// @route   DELETE /api/suppliers/:id
exports.deleteSupplier = async (req, res) => {
  try {
    const supplier = await Supplier.findByIdAndDelete(req.params.id);
    if (!supplier) return res.status(404).json({ message: 'Supplier not found' });
    res.json({ message: 'Supplier deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Purchase Order CRUD
exports.createPurchaseOrder = async (req, res) => {
  try {
    const purchaseOrder = new PurchaseOrder(req.body);
    const savedOrder = await purchaseOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getPurchaseOrders = async (req, res) => {
  try {
    const orders = await PurchaseOrder.find().populate('supplier items.product');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPurchaseOrderById = async (req, res) => {
  try {
    const order = await PurchaseOrder.findById(req.params.id).populate('supplier items.product');
    if (!order) return res.status(404).json({ message: 'Purchase Order not found' });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updatePurchaseOrder = async (req, res) => {
  try {
    const updatedOrder = await PurchaseOrder.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedOrder) return res.status(404).json({ message: 'Purchase Order not found' });
    res.json(updatedOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deletePurchaseOrder = async (req, res) => {
  try {
    const deletedOrder = await PurchaseOrder.findByIdAndDelete(req.params.id);
    if (!deletedOrder) return res.status(404).json({ message: 'Purchase Order not found' });
    res.json({ message: 'Purchase Order deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Supplier Product CRUD
exports.createSupplierProduct = async (req, res) => {
  try {
    const supplierProduct = new SupplierProduct(req.body);
    const savedProduct = await supplierProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getSupplierProducts = async (req, res) => {
  try {
    const products = await SupplierProduct.find().populate('supplier');
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getSupplierProductById = async (req, res) => {
  try {
    const product = await SupplierProduct.findById(req.params.id).populate('supplier');
    if (!product) return res.status(404).json({ message: 'Supplier Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateSupplierProduct = async (req, res) => {
  try {
    const updatedProduct = await SupplierProduct.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedProduct) return res.status(404).json({ message: 'Supplier Product not found' });
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteSupplierProduct = async (req, res) => {
  try {
    const deletedProduct = await SupplierProduct.findByIdAndDelete(req.params.id);
    if (!deletedProduct) return res.status(404).json({ message: 'Supplier Product not found' });
    res.json({ message: 'Supplier Product deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delivery CRUD
exports.createDelivery = async (req, res) => {
  try {
    const delivery = new Delivery(req.body);
    const savedDelivery = await delivery.save();
    res.status(201).json(savedDelivery);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getDeliveries = async (req, res) => {
  try {
    const deliveries = await Delivery.find().populate('supplier');
    res.json(deliveries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getDeliveryById = async (req, res) => {
  try {
    const delivery = await Delivery.findById(req.params.id).populate('supplier');
    if (!delivery) return res.status(404).json({ message: 'Delivery not found' });
    res.json(delivery);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateDelivery = async (req, res) => {
  try {
    const updatedDelivery = await Delivery.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedDelivery) return res.status(404).json({ message: 'Delivery not found' });
    res.json(updatedDelivery);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteDelivery = async (req, res) => {
  try {
    const deletedDelivery = await Delivery.findByIdAndDelete(req.params.id);
    if (!deletedDelivery) return res.status(404).json({ message: 'Delivery not found' });
    res.json({ message: 'Delivery deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Payment CRUD
exports.createPayment = async (req, res) => {
  try {
    const payment = new Payment(req.body);
    const savedPayment = await payment.save();
    res.status(201).json(savedPayment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getPayments = async (req, res) => {
  try {
    const payments = await Payment.find().populate('supplier');
    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id).populate('supplier');
    if (!payment) return res.status(404).json({ message: 'Payment not found' });
    res.json(payment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updatePayment = async (req, res) => {
  try {
    const updatedPayment = await Payment.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedPayment) return res.status(404).json({ message: 'Payment not found' });
    res.json(updatedPayment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deletePayment = async (req, res) => {
  try {
    const deletedPayment = await Payment.findByIdAndDelete(req.params.id);
    if (!deletedPayment) return res.status(404).json({ message: 'Payment not found' });
    res.json({ message: 'Payment deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};