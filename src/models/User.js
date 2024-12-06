const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    phone: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    otp: {
        code: String,
        expiry: Date
    },
    name: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);