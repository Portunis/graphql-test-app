const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key";

const generateToken = (user) => {
    return jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: "1h" });
};

module.exports = { generateToken };
