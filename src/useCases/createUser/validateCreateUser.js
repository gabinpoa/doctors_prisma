import * as yup from "yup";

export const createUserSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
  institution: yup.string().required(),
  is_super_user: yup.boolean(),
});

export const validateCreateUser = (schema) => async (req, res, next) => {
  try {
    const data = req.body;
    await schema.validate(data);

    next();
  } catch (err) {
    return res.status(400).json({ error: err.errors.join(", ") });
  }
};
