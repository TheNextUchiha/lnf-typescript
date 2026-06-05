import express from 'express';

import { getForgotPassword, getIndex, postForgotPassword } from '../controllers/index.js';

const router = express.Router();

if (process.env.NODE_ENV !== 'production') {
    require('dotenv/config');
}

// -----> GET Routes <-----
router.get('/', getIndex);
router.get('/forgot', getForgotPassword);

// -----> POST Routes <-----
router.post('/forgot', postForgotPassword);

export default router;
