const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/db');
const { PORT } = require('./src/config/env');
const orderRoutes = require('./src/routes/orders'); 

const app = express();

// Middleware
app.use(cors()); // Critical for Frontend-Backend communication
app.use(express.json());

// Connect Database
connectDB();

// Routes
app.use('/api/orders', orderRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});