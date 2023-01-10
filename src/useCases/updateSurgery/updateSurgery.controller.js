import { updateSurgeryService } from "./updateSurgery.service.js";

export const updateSurgeryController = async (req, res) => {
  try {
    const surgeryId = req.params.id;
    const body = req.body;

    const updatedSurgery = await updateSurgeryService({ surgeryId, body });
    if (!updatedSurgery) {
      throw { status: 404, message: "Surgery not found" };
    }

    return res.status(200).json(updatedSurgery);
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message } || err);
  }
};
