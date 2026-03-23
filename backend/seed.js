const mongoose = require('mongoose');
const dotenv = require('dotenv');


const Order = require('./src/models/orders'); 

dotenv.config();

const sampleOrders = [
  {
    customer: "Amal Perera",
    landmark: "Near the Big Mango Tree",
    total: 4250,
    status: "Packing",
    items: [
      { id: 1, name: "Fresh Milk 1L", qty: 2, shelf: "Dairy-01" },
      { id: 2, name: "Red Rice 5kg", qty: 1, shelf: "Grains-04" }
    ]
  },
  {
    customer: "Samanthi Silva",
    landmark: "Opposite Temple Gate",
    total: 1800,
    status: "Received",
    items: [
      { id: 3, name: "Ceylon Tea 200g", qty: 1, shelf: "Beverage-02" }
    ]
  }
];

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("🌱 Connected to Atlas. Seeding Onako Big Mart data...");
    await Order.deleteMany({}); // Clears empty/old data
    await Order.insertMany(sampleOrders);
    console.log("✅ Successfully added neighborhood orders!");
    process.exit();
  })
  .catch(err => {
    console.error("❌ Seeding failed. Check your MONGO_URI in .env:", err.message);
    process.exit(1);
  });