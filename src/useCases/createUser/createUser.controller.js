import { AppError, handleError } from "../../errors/appError.js";
import { createUserService } from "./createUser.service.js";

export const createUserController = async (req, res) => {
  try {
    const { password, name, email, institution, profile } = req.body;
    const newUser = await createUserService({
      name,
      email,
      password,
      institution,
      profile,
    });

    return res.status(200).json(newUser);
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};
