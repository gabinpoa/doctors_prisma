import { createUserService } from "./createUser.service.js";

export const createUserController = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const { password, name, email, institution, profile } = req.body;
    const newUser = await createUserService({
      name,
      email,
      password,
      profile,
      token,
    });

    return res.status(200).json(newUser);
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message } || err);
  }
};
