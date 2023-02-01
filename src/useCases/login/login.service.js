import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../../prisma/client.js";

export const loginService = async ({ email, password }) => {
  try {
    const formatedEmail = email.trim().toLowerCase();

    const hashedPassword = await prisma.user.findUnique({
      where: {
        email: formatedEmail,
      },
      select: {
        password: true,
      },
    });
    if (
      hashedPassword &&
      bcrypt.compareSync(password, hashedPassword.password)
    ) {
      return jwt.sign({ email: email }, process.env.TOKEN_SECRET);
    } else {
      throw { status: 401, message: "Email ou senha inválidos" };
    }
  } catch (err) {
    throw new Error(err);
  }
};
