import { Router } from 'express';

import { getUserDetailById } from '../controllers/user.js';

const router = Router();

router.get('/users/:UserID', getUserDetailById);

export default router;
