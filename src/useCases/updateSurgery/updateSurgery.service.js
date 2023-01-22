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
      const formatedPatientName = body.patient_name
        .trim()
        .split(" ")
        .map((item) => item[0].toUpperCase() + item.slice(1))
        .join(" ");
      const formatedHealthPlan =
        body.patient_health_plan
          .trim()
          .split(" ")
          .map((item) => item[0].toUpperCase() + item.slice(1))
          .join(" ") || null;
      const newSurgerysData = {
        label: body.label.trim() || null,
        start_time: body.start_time,
        patient_name: formatedPatientName,
        patient_health_plan: formatedHealthPlan || null,
        room: body.room.trim(),
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
