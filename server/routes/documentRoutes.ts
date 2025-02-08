import { Router } from "express";
import {
  addDocument,
  searchDocuments,
  getDocuments,
  deleteDocument,
  updateDocument,
} from "../controllers/documentController";

const router = Router();

router.post("/addtasks", addDocument);
router.put("/updatetasks/:id", updateDocument);
router.delete("/deletetasks", deleteDocument);
router.post("/searchtasks", searchDocuments);
router.get("/gettasks", getDocuments);

export default router;
