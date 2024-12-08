const jwt = require('jsonwebtoken');
const User = require('../models/User')

const protect = async (req, res, next) => {
    try {
        //Get token from header
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({
                success: false,
                error: 'Not authorized, no token'
            })
        }

        //verify token
        const decode = jwt.verify(token, process.env.JWT_SECRET);

        //get user from token
        const user = await User.findById(decode.userId).select('-otp');
        if (!user) {
            return res.status(401).json({
                success: false,
                error: 'User not found'
            })
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            error: 'Not authorized'
        })
    }
}

module.exports = protect; 