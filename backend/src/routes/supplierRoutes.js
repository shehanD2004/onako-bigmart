const express = require('express');
const router = express.Router();
const supplierController = require('../controllers/supplier/supplierController');

// Purchase Order routes (MUST be before /:id to avoid route conflicts)
router.post('/purchase-orders', supplierController.createPurchaseOrder);
router.get('/purchase-orders', supplierController.getPurchaseOrders);
router.get('/purchase-orders/:id', supplierController.getPurchaseOrderById);
router.put('/purchase-orders/:id', supplierController.updatePurchaseOrder);
router.delete('/purchase-orders/:id', supplierController.deletePurchaseOrder);

// Supplier Product routes
router.post('/supplier-products', supplierController.createSupplierProduct);
router.get('/supplier-products', supplierController.getSupplierProducts);
router.get('/supplier-products/:id', supplierController.getSupplierProductById);
router.put('/supplier-products/:id', supplierController.updateSupplierProduct);
router.delete('/supplier-products/:id', supplierController.deleteSupplierProduct);

// Delivery routes
router.post('/deliveries', supplierController.createDelivery);
router.get('/deliveries', supplierController.getDeliveries);
router.get('/deliveries/:id', supplierController.getDeliveryById);
router.put('/deliveries/:id', supplierController.updateDelivery);
router.delete('/deliveries/:id', supplierController.deleteDelivery);

// Payment routes
router.post('/payments', supplierController.createPayment);
router.get('/payments', supplierController.getPayments);
router.get('/payments/:id', supplierController.getPaymentById);
router.put('/payments/:id', supplierController.updatePayment);
router.delete('/payments/:id', supplierController.deletePayment);

// Supplier base routes (AFTER sub-resource routes to prevent /:id conflicts)
router.route('/')
  .get(supplierController.getSuppliers)
  .post(supplierController.createSupplier);

router.route('/:id')
  .get(supplierController.getSupplierById)
  .put(supplierController.updateSupplier)
  .delete(supplierController.deleteSupplier);

module.exports = router;