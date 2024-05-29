const authController = {};
const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

authController.authenticate = (req, res, next) => {
    try {
        const tokenString = req.headers.authorization;
        if (!tokenString) {
            throw new Error("토큰이 만료됐거나 존재하지 않습니다.");
        }
        const token = tokenString.replace("Bearer ", "");
        jwt.verify(token, JWT_SECRET_KEY, (err, payload) => {
            if (err) {
                throw new Error("토큰이 만료됐거나 존재하지 않습니다.");
            } else {
                req.userId = payload._id;
            }
        });

        next();
    } catch (err) {
        res.status(400).json({ status: "fail", message: err.message });
    }
};

module.exports = authController;
