import express, { Request, Response } from "express";
import connectMongoDB from "./config/nosql-config";
import cors from "cors";
import logger from "./config/logger";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.MONGO_PORT || 3151;

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
