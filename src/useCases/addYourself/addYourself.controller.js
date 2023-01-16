import { addYourselfService } from "./addYourself.service.js";

export const addYourselfController = async (req, res) => {
  try {
    const { id } = req.params.id;
    const { user_id } = req.body;

    const updatedSurgery = await addYourselfService({
      user_id,
      surgery_id: id,
    });
    if (!updatedSurgery) {
      throw { status: 404, message: "Surgery not found" };
    }

    return res.status(200).json(updatedSurgery);
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message } || err);
  }
};
