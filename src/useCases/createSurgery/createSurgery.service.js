import { prisma } from "../../prisma/client.js";

export const createSurgeryService = async ({
  institution,
  membersIds,
  label,
  start_date,
  room,
  patient_name,
  patient_health_plan,
}) => {
  const newMembers = membersIds.map((ids) => {
    return {
      id: ids,
    };
  });
  const toIsoStartDate = new Date(start_date).toISOString();
  const newSurgery = await prisma.surgery.create({
    data: {
      patient_name: patient_name,
      patient_health_plan: patient_health_plan,
      room: room,
      start_date: toIsoStartDate,
      label: label,
      institution: institution,
      members: {
        connect: newMembers,
      },
    },
  });
  return newSurgery;
};
