const express = require('express');
const router = express.Router();
const {
  getSuppliers,
  getSupplierById,
  createSupplier,
  updateSupplier,
  deleteSupplier
} = require('../controllers/supplier/supplierController');

// Supplier base routes
router.route('/')
  .get(getSuppliers)
  .post(createSupplier);

router.route('/:id')
  .get(getSupplierById)
  .put(updateSupplier)
  .delete(deleteSupplier);

// You can add nested routes here for supplier-specific resources
// e.g., router.get('/:supplierId/products', getSupplierProducts);

module.exports = router;