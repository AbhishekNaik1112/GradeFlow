import { Router } from "express";
import {
  addDocument,
  searchDocuments,
  getDocuments,
  deleteDocument,
  updateDocument,
  searchDocumentsbyID,
} from "../controllers/documentController";

const router = Router();

router.post("/addtasks", addDocument);
router.put("/updatetasks/:id", updateDocument);
router.delete("/deletetasks/:id", deleteDocument);
router.post("/searchtasks", searchDocuments);
router.get("/gettasks", getDocuments);
router.post("findtasks", searchDocumentsbyID);

export default router;
