import bcrypt from "bcrypt";

async function hashPassword(password) {
  const saltRounds = 10; // Adjust cost factor as needed
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

export default hashPassword;
