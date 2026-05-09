const mongoose = require('mongoose');
const Order = require('./src/models/Order');
const Staff = require('./src/models/Staff');

// Connection String
const MONGO_URI = 'Enter your URI';

const seedData = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB for seeding...");

    // 1. Clear existing data to avoid duplicates
    await Order.deleteMany({});
    await Staff.deleteMany({});

    // 2. Create Staff (Drivers)
    const staff = await Staff.insertMany([
      {
        staffID: "STF-001",
        name: "Saman Kumara",
        role: "Driver",
        licenseNumber: "B1234567",
        vehicleType: "Motorbike",
        phone: "071-555-0001"
      },
      {
        staffID: "STF-002",
        name: "Arjun Perera",
        role: "Driver",
        licenseNumber: "B7654321",
        vehicleType: "Tuk-Tuk",
        phone: "077-555-0002"
      }
    ]);

    console.log("✅ Staff seeded");

    // 3. Create a Sample Order
    const newOrder = new Order({
      orderID: "ORD-2026-001",
      customer: {
        name: "Alex Johnson",
        phoneNumber: "077-123-4567",
        address: {
          houseNumber: "No. 45",
          street: "Station Road, Wattala",
          landMark: "Opposite the Clock Tower"
        }
      },
      items: [
        { productID: "P-001", name: "Fresh Milk 1L", quantity: 2, unitPriceAtSale: 450, isPacked: false },
        { productID: "P-042", name: "Sunlight Soap", quantity: 3, unitPriceAtSale: 90, isPacked: false },
        { productID: "P-102", name: "Red Rice 5kg", quantity: 1, unitPriceAtSale: 1100, isPacked: false }
      ],
      totalAmount: 2180.00,
      status: "Pending",
      paymentType: "Cash on Delivery"
    });

    await newOrder.save();
    console.log("✅ Sample Order seeded");

    console.log("DB Seeded Successfully! Press Ctrl+C to exit.");
  } catch (err) {
    console.error("Error seeding data:", err);
  }
};

seedData();
