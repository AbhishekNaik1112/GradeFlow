import { Router } from "express";
import {
  addDocument,
  searchDocuments,
  getDocuments,
  deleteDocument,
  updateDocument,
  searchDocumentsbyID,
  getTaskById,
} from "../controllers/documentController";

const router = Router();

router.get("/gettasks", getDocuments);
router.get("/findtask/:id", getTaskById);

router.post("/addtasks", addDocument);
router.post("/searchtasks", searchDocuments);
router.post("/findtasks", searchDocumentsbyID);

router.put("/updatetasks/:id", updateDocument);

router.delete("/deletetasks/:id", deleteDocument);

export default router;
