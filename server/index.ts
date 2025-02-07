import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/nosql-config";
import logger from "./config/logger";
import documentRouter from "./routes/documentRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


app.use(express.json());
app.use(cors()); 


app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});


app.get("/", (req, res) => {
  res.status(200).json({ message: "Server is running!" });
});


app.use("/api", documentRouter);


app.use((err: any, req: any, res: any, next: any) => {
  logger.error(err.message);
  res.status(500).json({ error: "Internal Server Error" });
});


const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
    });
  } catch (error) {
    logger.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
