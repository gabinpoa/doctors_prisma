import { readAllUsersService } from "./readAllUsers.service.js";

export const readAllUsersController = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    const users = await readAllUsersService();

    return res.status(200).json({ users });
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};
