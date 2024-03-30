// Middleware to verify token
const User = require('../Models/User')
const jwt = require('jsonwebtoken')

const protect = async (req, res, next) => {
    let token = req.headers.authorization;

    // Check for token

    if (!token || !token.startsWith("Bearer")) {
        return res.status(400).json({ Message: "Not authorized, no token" });
    }

    try {
        token = token.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        req.user = await User.findById(decoded.id).select("-password");
        next();
    } catch (error) {
        return res.status(400).json({ Message: "Not authorized, token failed" });
    }

};

module.exports = { protect };