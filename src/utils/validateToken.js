import jwt from "jsonwebtoken";
import { AppError } from "../errors/appError.js";
import dotenv from "dotenv";

export const validateToken = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    jwt.verify(token, process.env.TOKEN_SECRET);

    next();
  } catch (err) {
    throw new AppError(401, "Invalid ");
  }
};
