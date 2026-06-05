import express, { Router } from 'express';

const router = Router();

import { authenticate } from './../middlewares/authenticate.js';
import { User } from './../models/user.js';
import { UserDetails } from './../models/userDetails.js';

router.get('/generate-qr', authenticate, async (req, res) => {
    const { userID } = req.session.user;

    let userDetails;

    try {
        await UserDetails.findOneAndUpdate(
            { userID },
            {
                $set: {
                    qr:
                        'http://api.qrserver.com/v1/create-qr-code/?data=https://secure-stream-40258.herokuapp.com/users/' +
                        userID +
                        '&size=600x600&margin=10',
                },
            },
        );
    } catch (err) {
        console.log('Error: ', err);
        return res.redirect('home');
    }

    try {
        userDetails = await UserDetails.findOne({ userID });
    } catch (err) {
        return res.redirect('home');
    }

    if (!userDetails) {
        return res.redirect('home');
    }

    return res.render('qr', {
        src: userDetails.qr,
    });
});

router.get('/home', authenticate, async (req, res) => {
    const userID = req.session.user.userID;

    let user, userDetails;

    try {
        user = await User.findOne({ _id: userID });
    } catch (err) {
        return res.redirect('login');
    }

    if (!user) {
        return res.redirect('editprofile');
    }

    user.counter += 1;

    try {
        await user.save();
    } catch (err) {
        return res.redirect('login');
    }

    try {
        userDetails = await UserDetails.findOne({ userID });
    } catch (err) {
        console.log('error fetching userdetails', err);
        return res.redirect('login');
    }

    if (!userDetails) {
        return res.redirect('home');
    }

    return res.render('home', {
        name: userDetails.name,
        mobilenum: userDetails.mobileNum,
        address: userDetails.address,
        email: user.email,
    });
});

router.get('/logout', (req, res) => {
    try {
        req.session.destroy(err => {
            if (err) {
                return res.redirect('/home');
            }
            res.clearCookie('cookie');
            return res.redirect('/');
        });
    } catch (err) {
        return res.send(`Error while logging you out: ${err}`);
    }
});

export default router;
