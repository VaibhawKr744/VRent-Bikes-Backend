const Bike = require('../models/Bike');

// Get all bikes
exports.getBikes = async (req, res) => {
    try {
        const bikes = await Bike.find();
        res.status(200).json({
            success: true,
            count: bikes.length,
            data: bikes
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

// Get single bike
exports.getBike = async (req, res) => {
    try {
        const bike = await Bike.findById(req.params.id);
        if (!bike) {
            return res.status(404).json({
                success: false,
                error: 'Bike not found'
            });
        }
        res.status(200).json({
            success: true,
            data: bike
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

// Create new bike
exports.createBike = async (req, res) => {
    try {
        const bike = await Bike.create(req.body);
        res.status(201).json({
            success: true,
            data: bike
        });
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                success: false,
                error: messages
            });
        }
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};