require('dotenv').config();  // Ensure dotenv is loaded to access .env variables
const mongoose = require('mongoose');
const Product = require('./models/Product');  // Adjust path based on your project structure

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB!');

    // Sample product data
    const products = [
      {
        name: 'Laptop',
        description: 'A high-performance laptop with 16GB RAM and 512GB SSD.',
        price: 1200,
        imageUrl: 'laptop.jpg',
        category: 'Electronics',
      },
      {
        name: 'Smartphone',
        description: 'A modern smartphone with 5G connectivity.',
        price: 800,
        imageUrl: 'smartphone.jpg',
        category: 'Electronics',
      },
      {
        name: 'Headphones',
        description: 'Wireless over-ear headphones with noise cancellation.',
        price: 150,
        imageUrl: 'headphones.jpg',
        category: 'Accessories',
      },
      {
        name: 'Coffee Maker',
        description: 'A high-quality coffee maker with multiple brewing options.',
        price: 100,
        imageUrl: 'coffeemaker.jpg',
        category: 'Home Appliances',
      },
    ];

    // Insert sample products into the database
    Product.insertMany(products)
      .then(() => {
        console.log('Sample products added!');
        mongoose.connection.close();  // Close connection after insertion
      })
      .catch((err) => {
        console.error('Error inserting sample data:', err);
        mongoose.connection.close();
      });
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

