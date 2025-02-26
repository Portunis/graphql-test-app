const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key";

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        try {
            const token = authHeader.split(" ")[1];
            req.user = jwt.verify(token, SECRET_KEY);
        } catch (err) {
            req.user = null;
        }
    } else {
        req.user = null;
    }
    next();
};

module.exports = authMiddleware;
