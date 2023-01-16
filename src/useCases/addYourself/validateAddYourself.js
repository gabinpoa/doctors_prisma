import * as yup from "yup";

export const addYourselfSchema = yup.object().shape({
  user_id: yup.string().required(),
});

export const validateAddYourself = (schema) => async (req, res, next) => {
  try {
    const data = req.body;
    await schema.validate(data);

    next();
  } catch (err) {
    return res.status(400).json({ error: err.errors.join(", ") });
  }
};
