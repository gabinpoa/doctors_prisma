import { deleteSurgeryService } from "./deleteSurgery.service.js";

export const deleteSurgeryController = async (req, res) => {
  try {
    const surgeryId = req.params.id;
    const token = req.headers.authorization.split(" ")[1];

    const deletedSurgery = await deleteSurgeryService({ surgeryId, token });

    return res.status(200).json(deletedSurgery);
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message } || err);
  }
};
