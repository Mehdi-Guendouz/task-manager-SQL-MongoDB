const bcrypt = require("bcrypt");
const prisma = require("../../prisma/prismaClient");
const { generateToken } = require("../utils/jwtToke");
const { hashPassword } = require("../utils/hashPassword");
const Joi = require("joi");

const schemaRegister = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "email must be a valid email",
    "any.required": "email is required",
  }),
  password: Joi.string().min(6).required().messages({
    "string.min": "password must be at least 6 characters",
    "any.required": "password is required",
  }),
  name: Joi.string().required().messages({
    "any.required": "name is required",
  }),
});

const schemaLogin = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "email must be a valid email",
    "any.required": "email is required",
  }),
  password: Joi.string().min(6).required().messages({
    "string.min": "password must be at least 6 characters",
    "any.required": "password is required",
  }),
});

async function registerUser(req, res) {
  const data = req.body;
  const hashedPassword = await hashPassword(data.password);

  const { error } = schemaRegister.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: data.email },
    });
    if (user) {
      res.status(400).json({ message: "User with this email already exists" });
      return;
    }

    const name = await prisma.user.findUnique({
      where: { name: data.name },
    });
    if (name) {
      res.status(400).json({ message: "the name is already taken" });
      return;
    }

    console.log("user doest exist");
    const newUser = await prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        name: data.name,
      },
    });

    if (newUser) {
      const token = generateToken(newUser.id);

      if (token) {
        res.status(200).json({
          message: "User logged in successfully",
          data: {
            token,
            user: {
              id: newUser.id,
              email: newUser.email,
              name: newUser.name,
            },
          },
        });
        return;
      }
    }
    res.status(400).json({ message: "something went wrong" });
  } catch (error) {
    res.status(500).json({ message: "Failed to log in" });
    console.error("Error logging in:", error);
  }
}

async function login(req, res) {
  const { email, password } = req.body;

  const { error } = schemaLogin.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }

    const token = generateToken(user.id);

    res.status(200).json({
      message: "User logged in successfully",
      data: {
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
      },
    });
    return;
  } catch (error) {
    res.status(500).json({ message: "Failed to log in" });
    // console.error("Error logging in:", error);
  }
}

module.exports = { registerUser, login };
