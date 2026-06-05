import type { Request, Response } from 'express';

import { User } from '../models/user.js';

async function getIndex(req: Request, res: Response) {
    return res.render('landing');
}

async function getForgotPassword(req: Request, res: Response) {
    return res.render('forgot');
}

async function postForgotPassword(req: Request, res: Response) {
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
}

export { getIndex, getForgotPassword, postForgotPassword };
