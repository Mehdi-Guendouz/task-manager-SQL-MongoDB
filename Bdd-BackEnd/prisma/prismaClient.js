import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default prisma.user; // Expose the user model
