import { AppError, handleError } from "../../errors/appError.js";
import { createUserService } from "./createUser.service.js";

export const createUserController = async (request, response) => {
  try {
    const {
      password,
      name,
      email,
      institution,
      is_super_user = false,
    } = request.body;

    const newUser = await createUserService({
      name,
      email,
      password,
      institution,
      is_super_user,
    });

    return response.status(200).json(newUser);
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, response);
    }
  }
};
