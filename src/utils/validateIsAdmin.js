import jwt from "jsonwebtoken";
import { prisma } from "../prisma/client.js";

export const validateIsAdmin = async (req, res, next) => {
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

    if (userProfile.profile !== "admin") {
      throw { status: 401, message: "User is not admin" };
    }

    next();
  } catch (err) {
    return res.status(err.status).json({ message: err.message });
  }
};
