import { Router } from 'express';

import { authenticate } from './../middlewares/authenticate.js';
import { getEditProfile, postEditProfile } from '../controllers/editProfile.js';

const router = Router();

router.get('/editprofile', authenticate, getEditProfile);

router.post('/editprofile', authenticate, postEditProfile);

export default router;
