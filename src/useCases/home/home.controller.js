import { homeService } from "./home.service.js";

export const homeController = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    const homeData = await homeService(token);
    res.status(200).json(homeData);
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message } || err);
  }
};
