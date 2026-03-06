const express = require("express");
const cors = require("cors");

const app = express();

//Middleware
app.use(cors());
app.use(express.json());

// Import supllier routes
const supplierRoutes = require("./routes/supplierRoutes");

//Test route
app.get("/", (req, res) => {
  res.send("API is running");
});

//API health check
app.get("/api", (req, res) => {
  res.json({ message: "API is running", status: "ok" });
});

//Use supplier routes with prefix /api/suppliers
app.use("/api/suppliers", supplierRoutes);

module.exports = app;