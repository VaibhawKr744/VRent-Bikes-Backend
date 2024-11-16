const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const bikeRoutes = require('./routes/bikeRoutes');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/bikes', bikeRoutes);

// Test route
app.get('/api/test', (req, res) => {
    res.json({ message: 'Backend is working!' });
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});