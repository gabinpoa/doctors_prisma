import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AppError } from "../../errors/appError.js";
import { prisma } from "../../prisma/client.js";

export const loginService = async ({ email, password }) => {
  const hashedPassword = await prisma.user.findUnique({
    where: {
      email: email,
    },
    select: {
      password: true,
    },
  });
  if (hashedPassword && bcrypt.compareSync(password, hashedPassword.password)) {
    return jwt.sign({ email: email }, process.env.TOKEN_SECRET);
  } else {
    throw new AppError(401, "Email ou senha inválidos");
  }
};
