import hashPassword from "../utils/hashPassword";
import User from "../../prisma/prismaClient";

export async function registerUser(data) {
  const hashedPassword = await hashPassword(data.password);

  try {
    const newUser = await User.create(data);
    return newUser; // Optionally return the created user
  } catch (error) {
    // Handle Prisma errors (e.g., unique constraint violations)
    if (error.code === "P2002") {
      // Duplicate email error
      throw new Error("User with this email already exists");
    } else {
      console.error("Error creating user:", error);
      throw error;
    }
  }
}

export async function login(email, password) {
  try {
    const user = await User.findUnique({ where: { email } });
    if (!user) {
      throw new Error("Invalid username or password");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new Error("Invalid username or password");
    }

    return user; // Return the authenticated user
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error; // Re-throw for handling in API endpoint
  }
}
