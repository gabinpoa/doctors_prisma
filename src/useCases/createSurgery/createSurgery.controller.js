import { createSurgeryService } from "./createSurgery.service.js";

export const createSurgeryController = async (req, res) => {
  try {
    const {
      label = undefined,
      start_date,
      room,
      patient_name,
      patient_health_plan = undefined,
      membersIds,
    } = req.body;
    const token = req.headers.authorization.split("Bearer ")[1];

    const newSurgery = await createSurgeryService({
      token,
      label,
      start_date,
      room,
      patient_name,
      patient_health_plan,
      membersIds,
    });

    return res.status(201).json(newSurgery);
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message } || err);
  }
};
