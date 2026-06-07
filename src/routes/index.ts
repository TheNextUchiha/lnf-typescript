import express from 'express';

import { getForgotPassword, getIndex, postForgotPassword } from '../controllers/index.js';

const router = express.Router();

// -----> GET Routes <-----
router.get('/', getIndex);
router.get('/forgot', getForgotPassword);

// -----> POST Routes <-----
router.post('/forgot', postForgotPassword);

export default router;
