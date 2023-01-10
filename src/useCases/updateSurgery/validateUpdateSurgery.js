import * as yup from "yup";

export const updateSurgerySchema = yup.object().shape({
  label: yup.string().nullable(),
  start_date: yup.date().required(),
  room: yup.string().required(),
  patient_name: yup.string().required(),
  patient_health_plan: yup.string().nullable(),
  membersIdsToAdd: yup.array().required(),
  membersIdsToRemove: yup.array().required(),
});

export const validateUpdateSurgery = (schema) => async (req, res, next) => {
  try {
    const data = req.body;
    await schema.validate(data);

    next();
  } catch (err) {
    return res.status(400).json({ error: err.errors.join(", ") });
  }
};
