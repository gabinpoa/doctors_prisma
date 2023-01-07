import { prisma } from "../../prisma/client.js";

export const readAllUsersService = async () => {
  const users = await prisma.user.findMany();

  return users;
};
