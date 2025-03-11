const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.JWT_SECRET || "asDMsdfkq4ogfd24fdsa2324123klmdk";


const authMiddleware = (req) => {

    const token = req.cookies.token

    if (!token) return null;
    try {
        return jwt.verify(token, SECRET_KEY);
    } catch {
        return null;
    }
};

module.exports = authMiddleware;
