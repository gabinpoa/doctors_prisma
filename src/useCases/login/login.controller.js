import { loginService } from "./login.service.js";

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const token = await loginService({ email, password });
    return res.status(200).json({ token: token });
  } catch (err) {
    return res.status(err.status).json({ message: err.message });
  }
};
