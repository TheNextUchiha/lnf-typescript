const express = require('express');

const router = express.Router();

import { User } from './../models/user.js';

if (process.env.NODE_ENV !== 'production') {
    require('dotenv/config');
}

// -----> GET Routes <-----
router.get('/', (req, res) => {
    res.render('landing');
});

router.get('/forgot', (req, res) => {
    res.render('forgot');
});

// -----> POST Routes <-----

router.post('/forgot', async (req, res) => {
    const { email } = req.body;

    let user;

    try {
        user = await User.findOne({ email });
    } catch (err) {
        return res.render('forgot', {
            error: true,
            errorMessage: 'User not Found',
        });
    }

    res.redirect('/forgot-verify');
});

export default router;
