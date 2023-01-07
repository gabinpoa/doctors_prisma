import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export const validateLogin = (schema) => async (req, res, next) => {
  try {
    const data = req.body;
    await schema.validate(data);
    next();
  } catch (err) {
    return res.status(400).json({ error: err.errors.join(", ") });
  }
};
