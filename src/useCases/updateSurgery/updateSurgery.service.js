import { prisma } from "../../prisma/client.js";
import jwt from "jsonwebtoken";

export const updateSurgeryService = async ({ body, surgeryId, token }) => {
  try {
    const decodedEmail = jwt.decode(token, process.env.TOKEN_SECRET).email;

    const surgeryToUpdate = await prisma.surgery.findUnique({
      where: {
        id: surgeryId,
      },
      select: {
        created_by: true,
      },
    });

    if (surgeryToUpdate.created_by === decodedEmail) {
      console.log("hi");
      const membersIdsToAdd =
        (body.membersIdsToAdd &&
          body.membersIdsToAdd.map((id) => {
            return { id: id };
          })) ||
        null;
      const membersIdsToRemove =
        (body.membersIdsToRemove &&
          body.membersIdsToRemove.map((id) => {
            return { id: id };
          })) ||
        null;

      const newSurgerysData = {
        label: body.label || null,
        start_time: body.start_time,
        patient_name: body.patient_name,
        patient_health_plan: body.patient_health_plan || null,
        room: body.room,
        institution: body.institution,
        members: {
          connect: membersIdsToAdd || [],
          disconnect: membersIdsToRemove || [],
        },
      };
      const updatedSurgery = await prisma.surgery.update({
        where: {
          id: surgeryId,
        },
        data: newSurgerysData,
      });

      return updatedSurgery;
    } else {
      throw "User cannot update this surgery";
    }
  } catch (err) {
    throw new Error(err);
  }
};
