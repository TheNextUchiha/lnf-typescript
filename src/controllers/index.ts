import { User } from '../models/user.js';

async function getIndex(req, res) {
    return res.render('landing');
}

async function getForgotPassword(req, res) {
    return res.render('forgot');
}

async function postForgotPassword(req, res) {
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
