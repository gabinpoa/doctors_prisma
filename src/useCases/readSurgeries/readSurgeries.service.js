import { prisma } from "../../prisma/client.js";
import jwt from "jsonwebtoken";

export const readSurgeriesService = async (token) => {
  try {
    const decodedEmail = jwt.decode(token, process.env.TOKEN_SECRET).email;

    const user = await prisma.user.findUnique({
      where: {
        email: decodedEmail,
      },
      select: {
        institution: true,
      },
    });

    const timeNow = Date.now();
    const thirtyMinutesAgoToIsoString = new Date(timeNow - 60000 * 30);

    const surgeries = await prisma.surgery.findMany({
      sortBy: {
        start_date: "asc",
      },
      where: {
        institution: user.institution,
        start_date: {
          gte: thirtyMinutesAgoToIsoString,
        },
      },
      include: {
        members: true,
      },
    });

    return { institution: user.institution, surgeries: surgeries };
  } catch (err) {
    throw new Error(err);
  }
};
