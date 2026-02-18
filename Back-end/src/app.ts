import dotenv from "dotenv";
dotenv.config();

import express from "express";
import messageRouter from "./routes/message.route";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // allow all origins in dev
app.use(express.json()); // Middleware to parse JSON bodies

app.get("/health", (_req, res) => {
  res.status(200).send("ok");
});

app.use("/api/message", messageRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
