import { AppError } from "../../errors/appError.js";
import { loginService } from "./login.service.js";

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const token = await loginService({ email, password });
    return res.status(200).json({ token: token });
  } catch (err) {
    if (err instanceof AppError) {
      return res.status(400).json({
        error: err.name,
        message: err.message,
      });
    }
  }
};
