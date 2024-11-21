const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const options = {
            retryWrites: true,
            w: 'majority',
            maxPoolSize: 10,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        };

        const conn = await mongoose.connect(process.env.MONGODB_URI, options);
        console.log(`MongoDB Connected: ${conn.connection.host}`);

        mongoose.connection.on('error', err => {
            console.error(`MongoDB connection error: ${err}`);
        });

        mongoose.connection.on('disconnected', () => {
            console.log('MongoDB disconnected. Attempting to reconnect...');
        });

    } catch (error) {
        console.error(`MongoDB connection error: ${error.message}`);
        if (process.env.NODE_ENV === 'production') {
            setTimeout(connectDB, 5000);
        } else {
            process.exit(1);
        }
    }
};

module.exports = connectDB;