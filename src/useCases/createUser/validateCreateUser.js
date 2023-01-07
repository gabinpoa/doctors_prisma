import * as yup from "yup";

const profiles = ["reader", "creator", "admin"];

export const createUserSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
  institution: yup.string().required(),
  profile: yup
    .string()
    .test((value, cpx) => {
      if (!profiles.includes(value)) {
        cpx.createError({ message: "Invalid profile" });
      } else {
        return true;
      }
    })
    .required(),
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
