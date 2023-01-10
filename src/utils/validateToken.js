import jwt from "jsonwebtoken";

export const validateToken = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    jwt.verify(token, process.env.TOKEN_SECRET);

    next();
  } catch (err) {
    return res.status(err.status).json({ message: err.message });
  }
};
