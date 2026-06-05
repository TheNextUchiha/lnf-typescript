import bcrypt from 'bcryptjs';

import type { Request, Response } from 'express';

import { User } from '../models/user.js';

const comparePassword = (plain: string, hashed: string): boolean => {
    return bcrypt.compareSync(plain, hashed);
};

async function getLogin(req: Request, res: Response) {
    return res.render('login');
}

async function getSignUp(req: Request, res: Response) {
    return res.render('signup');
}

async function loginUser(req: Request, res: Response) {
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
}

async function signUpUser(req: Request, res: Response) {
    const { email, username, password } = req.body;

    const user = new User({ username: username.toLowerCase(), password, email });

    try {
        await user.save();
    } catch (err: any) {
        if (err.code === 11000 && err.keyPattern.username > 0) {
            res.render('signup', {
                error: true,
                errorMessage: 'Username already taken.',
            });
        } else if (err.code === 11000 && err.keyPattern.email > 0) {
            res.render('signup', {
                error: true,
                errorMessage: 'User already exists.',
            });
        } else {
            console.log('ERROR WHILE SIGNUP: ', err);
            res.render('signup', {
                error: true,
                errorMessage: 'An unknown error occurred.',
            });
        }
    }

    return res.render('login', {
        error: true,
        errorMessage: 'Log in using the credentials.',
    });
}

export { getLogin, getSignUp, loginUser, signUpUser };
