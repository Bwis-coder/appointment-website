import { prisma } from "../config/db.js";
import jwt from "jsonwebtoken";

const authMiddleWare = (req, res, next) => {
  const token = res.cookie.jwt;

  if 

};
