import { prisma } from "../../prisma/client.js";
import jwt from "jsonwebtoken";

export const readAllUsersService = async (token) => {
  try {
    const decodedReaderEmail = jwt.decode(token, process.env.TOKEN_SECRET).email;
  
    const readerUser = await prisma.user.findUnique({
      where: {
        email: decodedReaderEmail,
      },
      select: {
        institution: true,
      },
    });
  
    const users = await prisma.user.findMany({
      where: {
        institution: readerUser.institution,
      },
    });
  
    return users;

  } catch (err) {
    throw new Error(err)
  }
};
