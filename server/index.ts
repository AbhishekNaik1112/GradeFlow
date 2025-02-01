import express, { Request, Response } from "express";
import connectMongoDB from "./config/nosql-config";
import cors from "cors";
import logger from "./config/logger";
import dotenv from "dotenv";
dotenv.config();

const serverPORT = process.env.SERVER_PORT || 9000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
    credentials: true,
  }),
);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

connectMongoDB();

app.listen(serverPORT, () => {
  logger.info(`Server is running on http://localhost:${serverPORT}`);
});