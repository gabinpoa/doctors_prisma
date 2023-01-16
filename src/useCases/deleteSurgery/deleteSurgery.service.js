import { prisma } from "../../prisma/client.js";
import jwt from "jsonwebtoken";

export const deleteSurgeryService = async ({ token, surgeryId }) => {
  try {
    const deletorUserEmail = jwt.decode(token).email;
    const deletorUser = await prisma.user.findUnique({
      where: {
        email: deletorUserEmail,
      },
    });
    const surgeryToDelete = await prisma.surgery.findUnique({
      where: {
        id: surgeryId,
      },
      include: {
        members: true,
      },
    });
    if (
      deletorUser.profile === "admin" ||
      surgeryToDelete.created_by === deletorUserEmail
    ) {
      const deletedSurgery = await prisma.surgery.delete({
        where: {
          id: surgeryId,
        },
      });
      return deletedSurgery;
    } else {
      throw { status: 401, message: "User cannot delete this surgery." };
    }
  } catch (err) {
    throw new Error(err);
  }
};
