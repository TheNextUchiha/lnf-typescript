import { Router } from 'express';

import { getLogin, getSignUp, loginUser, signUpUser } from '../controllers/auth.js';

const router = Router();

router.get('/login', getLogin);
router.get('/signup', getSignUp);

router.post('/login', loginUser);
router.post('/signup', signUpUser);

export default router;
