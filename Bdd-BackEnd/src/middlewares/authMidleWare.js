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
      const user = await prisma.user.findUnique({
        where: { id: decode.id },
        select: {
          id: true,
          email: true,
          name: true,
          createdAt: true,
          updatedAt: true,
        },
      });
      req.user = user;
      //  go to the next function
      next();
    } catch (error) {
      res.status(404);
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("not authorized no token");
  }
});

module.exports = { protect };
