import { prisma } from "../../prisma/client.js";
import jwt from "jsonwebtoken";

export const createSurgeryService = async ({
  token,
  membersIds,
  label = null,
  start_date,
  room,
  patient_name,
  patient_health_plan = null,
}) => {
  try {
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
        id: true,
      },
    });

    const formatedPatientName = patient_name
      .trim()
      .split(" ")
      .map((item) => item[0].toUpperCase() + item.slice(1))
      .join(" ");
    const formatedHealthPlan = patient_health_plan
      .trim()
      .split(" ")
      .map((item) => item[0].toUpperCase() + item.slice(1))
      .join(" ");

    const newSurgery = await prisma.surgery.create({
      data: {
        patient_name: formatedPatientName,
        patient_health_plan: formatedHealthPlan,
        room: room,
        start_date: toIsoStartDate,
        label: label,
        institution: creatorUser.institution,
        members: {
          connect: newMembers,
        },
        created_by: decodedEmail,
      },
    });
    return newSurgery;
  } catch (err) {
    throw new Error(err);
  }
};
