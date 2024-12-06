const User = require('../models/User');
const otpService = require('../services/otpService');
const jwt = require('jsonwebtoken');

const authController = {
    async sendOTP(req, res) {
        try {
            const { phone } = req.body;
            const otpResponse = await otpService.sendOTP(phone);

            let user = await User.findOne({ phone });
            if (!user) {
                user = await User.create({ phone })
            }

            res.status(200).json({
                success: true,
                sessionId: otpResponse.Details,
                message: 'OTP sent successfully'
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                error: error.message
            })
        }
    },

    async verifyOTP(req, res) {
        try {
            const { sessionId, otp, phone } = req.body;
            const verifyResponse = await otpService.verifyOTP(sessionId, otp);

            if (verifyResponse.Status === "Success") {
                const user = await User.findOne({ phone });
                user.isVerified = true;
                await user.save();

                const token = jwt.sign(
                    { userId: user._id },
                    process.env.JWT_SECRET,
                    { expiresIn: '7d' }
                );

                res.status(200).json({
                    success: true,
                    token,
                    user
                });
            } else {
                res.status(400).json({
                    success: false,
                    error: 'Invalid OTP'
                });
            }

        } catch (error) {
            res.status(500).json({
                success: false,
                error: error.message
            });
        }


    }
}

module.exports = authController;
