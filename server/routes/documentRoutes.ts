import { Router } from 'express';
import { addDocuments, searchDocuments, getDocuments } from '../controllers/documentController';

const router = Router();

router.post('/documents', addDocuments);
router.post('/search', searchDocuments);
router.get('/documents', getDocuments);

export default router;
