import { Router } from 'express';
import { handleIncomingMessage } from '../controllers/whatsapp.controller';

const router = Router();

router.post('/whatsapp', handleIncomingMessage);

export default router;