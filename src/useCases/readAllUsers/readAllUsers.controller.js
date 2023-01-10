import { readAllUsersService } from "./readAllUsers.service.js";

export const readAllUsersController = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    const users = await readAllUsersService(token);

    return res.status(200).json({ users });
  } catch (err) {
    return res.status(err.status).json({ message: err.message });
  }
};
