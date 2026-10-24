
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const authRoutes = require('./routes/authRoutes');
const foodRoutes = require('./routes/foodRoutes');
const orderRoutes = require('./routes/orderRoutes');

// Load environment variables before anything else
dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: [
    'http://localhost:8080',
    'http://192.168.41.147:8080',
    'http://localhost:5173',
    'https://food-fusion-gamma.vercel.app',
    'https://food-fusion-backend-ovw0.onrender.com'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'x-auth-token', 'Authorization'],
  credentials: true
}));

app.use(express.json());

// Log environment variables (remove in production)
console.log('MongoDB URI:', process.env.MONGO_URI ? 'Set' : 'Not set');
console.log('PORT:', process.env.PORT || 5000);

// Database connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/food', foodRoutes);
app.use('/api/orders', orderRoutes);



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});