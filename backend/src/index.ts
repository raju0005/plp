import express, { Request, Response } from "express";
import dotenv from "dotenv";
import connectDB from "./db";
import userRoutes from "./routes/userRoutes";
import bodyParser from "body-parser";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 7000;

app.use(bodyParser.json());
connectDB();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from Express + TypeScript!");
});
app.use("/api", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
