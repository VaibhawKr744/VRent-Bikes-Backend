const axios = require('axios');

const otpService = {
    apiKey: process.env.TWO_FACTOR_KEY,
    async sendOTP(phone) {
        try {
            const response = await axios.get(`https://2factor.in/API/V1/${this.apiKey}/SMS/${phone}/AUTOGEN/OTP1`);
            return response.data;
        } catch (error) {
            throw new Error('Error sending OTP: ' + error.message);
        }
    },

    async verifyOTP(sessionId, otp) {
        try {
            const response = await axios.get(`https://2factor.in/API/V1/${this.apiKey}/SMS/VERIFY/${sessionId}/${otp}`);
            return response.data;
        } catch (error) {
            throw new Error('Error verifying OTP: ' + error.message);
        }
    }
};

exports = otpService;