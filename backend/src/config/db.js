const mongoose = require('mongoose');
const { MONGO_URI } = require('./env');

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB Atlas Connected: Onako Big Mart Cluster");
  } catch (err) {
    console.error("❌ Database Connection Failed:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;