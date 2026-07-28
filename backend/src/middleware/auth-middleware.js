import { prisma } from "../config/db.js";
import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  console.log("auth middleware reached");

  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({
        status: "error",
        message: "token not found",
      });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);

    const user = await prisma.user.findUnique({
      where: {
        id: decode.id,
      },
    });

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "internal service error",
    });
  }
};

export default authMiddleware;
