const asyncHandler = require("express-async-handler");
const prisma = require("../../prisma/prismaClient");
const { verifyToken } = require("../utils/jwtToke");

// Protect routes

const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];
      //  Verify token
      const decode = verifyToken(token);
      // Check if token is valid
      if (!decode) {
        res.status(401).message("not authorized");
      }
      // Check if token is expired
      if (decode.iat > decode.exp) {
        res.status(401).message("not authorized expired token");
      }
      //  Find user
      const user = await prisma.user.findUnique({
        where: { id: decode.userId },
        select: { id: true, email: true, name: true },
      });
      // Check if user exist
      if (!user) {
        res.status(401).message("not authorized no user");
      }
      // Set user in the req object
      req.user = user;

      //  go to the next function
      next();
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
  }
});

module.exports = { protect };
