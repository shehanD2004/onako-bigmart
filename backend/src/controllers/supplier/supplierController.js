const Supplier = require('../../models/supplier/Supplier');

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
    const { name, email, ...rest } = req.body;
    // Check if supplier with same email exists
    const existing = await Supplier.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already exists' });

    const supplier = new Supplier({ name, email, ...rest });
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