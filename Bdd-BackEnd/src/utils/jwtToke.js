const jwt = require("jsonwebtoken");

// Assuming environment variables are loaded using a library like 'dotenv'
require("dotenv").config();

function generateToken(userId) {
  const payload = { userId };
  const secret = process.env.JWT_SECRET; // Access environment variable

  if (!secret) {
    throw new Error("JWT_SECRET environment variable is not set");
  }

  return jwt.sign(payload, secret, { expiresIn: "10d" }); // Adjust expiration as needed
}

function verifyToken(token) {
  const secret = process.env.JWT_SECRET; // Access environment variable

  if (!secret) {
    throw new Error("JWT_SECRET environment variable is not set");
  }

  try {
    const decoded = jwt.verify(token, secret);
    return decoded;
  } catch (error) {
    console.error("Error verifying token:", error);
    return null;
  }
}

module.exports = { generateToken, verifyToken };
