const mongoose = require('mongoose');

const StaffSchema = new mongoose.Schema({
  staffID: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  role: { type: String, enum: ['Driver', 'Packer'], default: 'Driver' },
  licenseNumber: String,
  vehicleType: String,
  phone: String,
  isAvailable: { type: Boolean, default: true }
});

module.exports = mongoose.model('Staff', StaffSchema);