import type { Request, Response } from 'express';

import { User } from '../models/user.js';
import { UserDetails } from '../models/userDetails.js';

async function getHome(req: Request, res: Response) {
    const { userID } = req.session.user!;

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
        return res.redirect('/editprofile');
    }

    return res.render('home', {
        name: userDetails.name,
        mobilenum: userDetails.mobilenum,
        address: userDetails.address,
        email: user.email,
    });
}

async function generateQR(req: Request, res: Response) {
    const { userID } = req.session.user!;

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

    return res.render('qr', { src: userDetails.qr });
}

async function logoutUser(req: Request, res: Response) {
    try {
        delete req.session.user;

        res.clearCookie('cookie');
    } catch (err) {
        // TODO: Add a message here as a toast
        return res.redirect('/home');
    }

    return res.redirect('/');
}

export { getHome, generateQR, logoutUser };
