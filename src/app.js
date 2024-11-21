const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const bikeRoutes = require('./routes/bikeRoutes');
const cors = require('cors');  // Add this

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());  // Add this
app.use(express.json());

// Routes
app.use('/api/bikes', bikeRoutes);
app.get('/api/test', (req, res) => {
    res.json({ message: 'Backend is working!' });
});

const PORT = process.env.PORT || 8081;  // Change to 8081

// Modified server startup
const server = app.listen(PORT, '0.0.0.0', () => {  // Add host binding
    console.log(`Server is running on port ${PORT}`);
});

// Error handling
process.on('unhandledRejection', (err) => {
    console.log('Unhandled Rejection:', err);
    server.close(() => process.exit(1));
});