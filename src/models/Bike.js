const mongoose = require('mongoose');

const bikeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Bike name is required'],
        trim: true
    },
    model: {
        type: String,
        required: [true, 'Bike model is required'],
        trim: true
    },
    
}, {
    timestamps: true
});

module.exports = mongoose.model('Bike', bikeSchema);