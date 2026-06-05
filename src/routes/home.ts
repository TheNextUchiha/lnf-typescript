import { Router } from 'express';

import { authenticate } from './../middlewares/authenticate.js';
import { generateQR, getHome, logoutUser } from '../controllers/home.js';

const router = Router();

router.get('/home', authenticate, getHome);
router.get('/generate-qr', authenticate, generateQR);
router.get('/logout', logoutUser);

export default router;
