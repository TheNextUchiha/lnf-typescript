import bcrypt from 'bcryptjs';

import { User } from '../models/user.js';

const comparePassword = (plain: string, hashed: string): boolean => {
    return bcrypt.compareSync(plain, hashed);
};

async function getLogin(req, res) {
    return res.render('login');
}

async function getSignUp(req, res) {
    return res.render('signup');
}

async function loginUser(req, res) {
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

async function signUpUser(req, res) {
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
