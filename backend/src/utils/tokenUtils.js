const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.JWT_SECRET || "asDMsdfkq4ogfd24fdsa2324123klmdk";

const generateToken = (user) => {
    return jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: "365d" });
};

module.exports = { generateToken };
