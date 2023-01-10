import { readSurgeriesService } from "./readSurgeries.service.js";

export const readSurgeriesController = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    const surgeries = await readSurgeriesService(token);
    res.status(200).json(surgeries);
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message } || err);
  }
};
