import { prisma } from "../../prisma/client.js";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const createUserService = async ({
  name,
  email,
  password,
  profile,
  institution,
  token,
}) => {
  try {
    const userWithTheSameEmail = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (userWithTheSameEmail) {
      throw { status: 400, message: "User already exists." };
    }
    const decodedCreatorEmail = jwt.decode(
      token,
      process.env.TOKEN_SECRET
    ).email;

    const creator = !institution
      ? await prisma.user.findUnique({
          where: { email: decodedCreatorEmail },
          select: { institution: true },
        })
      : undefined;
    const formatedName = name
      .trim()
      .split(" ")
      .map((item) => item[0].toUpperCase() + item.slice(1))
      .join(" ");
    const formatedEmail = email.trim().toLowerCase();
    const trimPassword = password.trim();
    const hashedPassword = bcrypt.hashSync(trimPassword, 10);
    const user = await prisma.user.create({
      data: {
        name: formatedName,
        email: formatedEmail,
        password: hashedPassword,
        institution: institution || creator.institution,
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
  } catch (err) {
    throw new Error(err);
  }
};
