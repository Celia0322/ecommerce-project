require('dotenv').config(); // Load environment variables
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import Routes
const productRoutes = require('./routes/productRoutes'); // Import product routes
const authRoutes = require("./routes/authRoutes"); // Import authentication routes

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON bodies

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Define API routes
app.use('/products', productRoutes); // Use product routes

// Define authentication routes
app.use("/auth", authRoutes); // Register authentication routes (register/login)

// Define a simple route
app.get('/', (req, res) => {
  res.send('Welcome to the E-commerce API!');
});

// Checkout API route (example)
app.post("/api/checkout", async (req, res) => {
    try {
      const { userInfo, items } = req.body;
      console.log("Processing order for:", userInfo);
      console.log("Items:", items);
  
      // Simulate order processing (in real app, save to database)
      res.status(200).json({ message: "Order placed successfully!" });
    } catch (error) {
      res.status(500).json({ message: "Checkout failed", error });
    }
});   

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
