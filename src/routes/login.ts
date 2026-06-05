import bcrypt from 'bcryptjs';
import express from 'express';

const router = express.Router();

import { User } from './../models/user.js';

const comparePassword = (plain: string, hashed: string): boolean => {
    return bcrypt.compareSync(plain, hashed);
};

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({
            username: username.toLowerCase(),
        });

        if (!user) {
            return res.redirect('/');
        }

        if (comparePassword(password, user.password)) {
            req.session.user = {
                username: user.username,
                userID: user._id.toString(),
            };

            return res.redirect('/home');
        } else {
            return res.redirect(400, '/');
        }
    } catch (err) {
        return res.status(500).send();
    }
});

export default router;
