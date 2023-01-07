import jwt from "jsonwebtoken";
import { AppError } from "../errors/appError.js";
import { prisma } from "../prisma/client.js";

export const validateIsAdmin = async (req, res, next) => {
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

  if (userProfile.profile !== "admin") {
    throw new AppError(401, "User is not admin");
  }

  next();
};
