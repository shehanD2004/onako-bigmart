require("dotenv").config();
const app = require("./src/app");
const connectDB = require("./src/config/db");

const PORT = process.env.PORT || 5000;

// Start Express server first, then connect to database
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Connect Database (non-blocking — server still runs if DB is temporarily down)
connectDB();