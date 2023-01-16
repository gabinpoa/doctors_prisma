import jwt from "jsonwebtoken";
import { prisma } from "../../prisma/client.js";

export const addYourselfService = async ({ user_id, surgery_id }) => {
  try {
    console.log(surgery_id);
    const updatedSurgery = await prisma.surgery.update({
      where: {
        id: surgery_id,
      },
      data: {
        members: {
          connect: { id: user_id },
        },
      },
    });

    return updatedSurgery;
  } catch (err) {
    throw new Error(err);
  }
};
