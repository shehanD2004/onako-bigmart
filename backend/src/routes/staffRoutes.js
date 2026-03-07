const express = require('express');
const Staff = require('../models/Staff');

const router = express.Router();

// @desc    Get all staff members (used to list drivers)
// @route   GET /api/staff
router.get('/', async (req, res) => {
  try {
    const staff = await Staff.find();
    res.json(staff);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

