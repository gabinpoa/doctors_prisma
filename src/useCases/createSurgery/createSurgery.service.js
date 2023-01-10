import { prisma } from "../../prisma/client.js";
import jwt from "jsonwebtoken";

export const createSurgeryService = async ({
  token,
  membersIds,
  label = null,
  start_date,
  room,
  patient_name,
  patient_health_plan,
}) => {
  const decodedEmail = jwt.decode(token, process.env.TOKEN_SECRET).email;
  const newMembers = membersIds.map((ids) => {
    return {
      id: ids,
    };
  });
  const toIsoStartDate = new Date(start_date).toISOString();
  const creatorUser = await prisma.user.findUnique({
    where: {
      email: decodedEmail,
    },
    select: {
      institution: true,
    },
  });
  const newSurgery = await prisma.surgery.create({
    data: {
      patient_name: patient_name,
      patient_health_plan: patient_health_plan,
      room: room,
      start_date: toIsoStartDate,
      label: label,
      institution: creatorUser.institution,
      members: {
        connect: newMembers,
      },
    },
  });
  return newSurgery;
};
