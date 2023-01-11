import express from "express";
import dotenv from "dotenv";
import { routes } from "./routes/user.routes.js";

const app = express();

app.use(express.json());

app.use(routes);

app.use((err, req, res, next) => {
  if (!err.status) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error ",
    });
  }
  return next(err);
});

app.listen(process.env.PORT || 3000);
