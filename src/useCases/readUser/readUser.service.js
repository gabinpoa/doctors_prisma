import { prisma } from "../../prisma/client.js";

export const readUserService = async (token) => {
  const user = await prisma.user.findUnique({
    select: {
      name: true,
      id: true,
      institution: true,
      email: true,
      profile: true,
      surgeries: true,
    },
    include: {
      surgeries: true,
    },
  });

  return user;
};
