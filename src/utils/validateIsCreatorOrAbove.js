import { AppError, handleError } from "../errors/appError.js";
import { prisma } from "../prisma/client.js";
import jwt from "jsonwebtoken";

export const validateIsCreatorOrAbove = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    const decodedEmail = jwt.decode(token, process.env.TOKEN_SECRET).email;

    const userProfile = await prisma.user.findUnique({
      where: {
        email: decodedEmail,
      },
      select: {
        profile: true,
      },
    });

    if (userProfile.profile === "admin" || userProfile.profile === "creator") {
      next();
    } else {
      throw new AppError(401, "User cannot perform this action");
    }
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};
