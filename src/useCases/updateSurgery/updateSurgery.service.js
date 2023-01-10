import { prisma } from "../../prisma/client.js";

export const updateSurgeryService = async ({ body, surgeryId }) => {
  try {
    const membersIdsToAdd =
      body.membersIdsToAdd.map((id) => {
        return { id: id };
      }) || null;
    const membersIdsToRemove =
      body.membersIdsToRemove.map((id) => {
        return { id: id };
      }) || null;

    const surgeryToUpdate = {
      label: body.label || null,
      start_time: body.start_time,
      patient_name: body.patient_name,
      patient_health_plan: body.patient_health_plan || null,
      room: body.room,
      institution: body.institution,
      members: {
        connect: membersIdsToAdd,
        disconnect: membersIdsToRemove,
      },
    };
    const updatedSurgery = await prisma.surgery.update({
      where: {
        id: surgeryId,
      },
      data: surgeryToUpdate,
    });
    return updatedSurgery;
  } catch (err) {
    throw new Error(err);
  }
};
