import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log:
    process.env.NODE_ENV === "development"
      ? ["query", "error", "warn"]
      : ["error"],
});

const connectDb = async () => {
  try {
    console.log("db connect via prisma");
    await prisma.$connect();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

const disconnectDb = async () => {
  await prisma.$disconnect();
  process.exit(0);
};


export { prisma, connectDb, disconnectDb }