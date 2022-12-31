import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AppError } from "../../errors/appError.js";
import { prisma } from "../../prisma/client.js";

export const loginService = async ({ email, password }) => {
  const userMatchesEmail = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (
    userMatchesEmail &&
    bcrypt.compareSync(password, userMatchesEmail.password)
  ) {
    return jwt.sign({ email: email }, "@llTheLe@ves@reBrown");
  } else {
    throw new AppError(401, "Email ou senha inválidos");
  }
};
