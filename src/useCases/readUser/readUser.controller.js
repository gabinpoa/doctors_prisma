import { AppError, handleError } from "../../errors/appError.js";
import { readUserService } from "./readUser.service.js";

export const readUserController = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    const user = await readUserService(token);

    return res.status(200).json({ user: user });
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};
