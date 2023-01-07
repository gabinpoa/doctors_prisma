import { AppError } from "../../errors/appError.js";
import { createSurgeryService } from "./createSurgery.service.js";

export const createSurgeryController = async (req, res) => {
  try {
    const {
      institution,
      label = undefined,
      start_date,
      room,
      patient_name,
      patient_health_plan,
    } = req.body;
    let { membersIds } = req.body;

    const newSurgery = await createSurgeryService({
      institution,
      label,
      start_date,
      room,
      patient_name,
      patient_health_plan,
      membersIds,
    });

    return res.status(201).json({ surgery: newSurgery });
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};
