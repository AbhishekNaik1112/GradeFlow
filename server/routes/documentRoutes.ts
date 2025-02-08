import { Router } from "express";
import {
  addDocuments,
  searchDocuments,
  getDocuments,
  addDocumentsBulk,
} from "../controllers/documentController";

const router = Router();

router.post("/addtasks", addDocuments);
router.post("/addbulk", addDocumentsBulk);
router.post("/searchtasks", searchDocuments);
router.get("/gettasks", getDocuments);

export default router;
