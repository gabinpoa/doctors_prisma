import * as yup from "yup";

export const createSurgerySchema = yup.object().shape({
  institution: yup.string().required(),
  label: yup.string(),
  start_date: yup.date().required(),
  room: yup.string().required(),
  patient_name: yup.string().required(),
  patient_health_plan: yup.string(),
  membersIds: yup.array().required(),
});

export const validateCreateSurgery = (schema) => async (req, res, next) => {
  try {
    const data = req.body;
    await schema.validate(data);

    next();
  } catch (err) {
    return res.status(400).json({ error: err.errors.join(", ") });
  }
};
