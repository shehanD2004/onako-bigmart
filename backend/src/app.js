const express = require("express");
const cors = require("cors");

const app = express();

//Middleware
app.use(cors());
app.use(express.json());

// Import supllier routes
const supplierRoutes = require("./routes/supplierRoutes");

//Use supplier routes with prefix /api/suppliers
app.use("/api/suppliers", supplierRoutes);

//Test route
app.get("/", (req, res) => {
  res.send("API is running");
});

module.exports = app;