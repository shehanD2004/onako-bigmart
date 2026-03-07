const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/db');
const orderRoutes = require('./src/routes/orderRoutes');
const staffRoutes = require('./src/routes/staffRoutes');

const app = express();

// Connect to MongoDB Atlas
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/orders', orderRoutes);
app.use('/api/staff', staffRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Onako Big Mart Server running on port ${PORT}`));