const axios = require('axios');

const otpService = {
    apiKey: process.env.TWO_FACTOR_KEY,
  
    async sendOTP(phone) {
        console.log("api key", process.env.TWO_FACTOR_KEY)
        try {
            const response = await axios.get(`https://2factor.in/API/V1/${process.env.TWO_FACTOR_KEY}/SMS/${phone}/AUTOGEN/OTP1`);
            return response.data;
        } catch (error) {
            throw new Error('Error sending OTP: ' + error.message);
        }
    },

    async verifyOTP(sessionId, otp) {
        try {
            const response = await axios.get(`https://2factor.in/API/V1/${process.env.TWO_FACTOR_KEY}/SMS/VERIFY/${sessionId}/${otp}`);
            return response.data;
        } catch (error) {
            throw new Error('Error verifying OTP: ' + error.message);
        }
    }
};

module.exports = otpService;