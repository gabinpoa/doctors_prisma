import express from "express";
import { AppError } from "./errors/appError.js";
import { routes } from "./routes/user.routes.js";

const app = express();

app.use(express.json());

app.use(routes);

app.use((err, req, res) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }
  return res.status(500).json({
    status: "error",
    message: "Internal server error",
  });
});

app.listen(process.env.PORT || 3000);
