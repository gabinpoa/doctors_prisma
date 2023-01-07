import { AppError } from "../../errors/appError.js";
import { prisma } from "../../prisma/client.js";
import * as bcrypt from "bcrypt";

export const createUserService = async ({
  name,
  email,
  password,
  institution,
  profile,
}) => {
  const userWithTheSameEmail = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (userWithTheSameEmail) {
    throw new AppError(400, "E-mail já existe");
  } else {
    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        institution,
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
};
