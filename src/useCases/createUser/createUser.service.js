import { prisma } from "../../prisma/client.js";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const createUserService = async ({ name, email, password, profile }) => {
  try {
    const decodedCreatorEmail = jwt.decode(email, process.env.TOKEN_SECRET).email;
  
    const creator = await prisma.user.findUnique({
      where: { email: decodedCreatorEmail },
      select: { institution: true },
    });
  
    const userWithTheSameEmail = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (userWithTheSameEmail) {
      throw { status: 400, message: "User already exists." };
    } else {
      const hashedPassword = bcrypt.hashSync(password, 10);
      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          institution: creator.institution,
          profile,
        },
        select: {
          name: true,
          email: true,
          institution: true,
          profile: true,
          id: true,
        },
      });
      return user;
    }

  } catch (err) {
    throw new Error(err)
  }
};
