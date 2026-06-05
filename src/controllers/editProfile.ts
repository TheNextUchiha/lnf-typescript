import { ObjectId } from 'mongodb';

import type { Request, Response } from 'express';

import { User } from '../models/user.js';
import { UserDetails } from '../models/userDetails.js';

async function getEditProfile(req: Request, res: Response) {
    const { userID } = req.session.user!;

    let user;

    try {
        user = await UserDetails.findOne({ userID });
    } catch (err) {
        return res.render('home', {
            error: true,
            errorMessage: 'User not found!',
        });
    }

    console.log('edit profile user: ', user);

    return res.render('editprofile', { user });
}

async function postEditProfile(req: Request, res: Response) {
    const { userID } = req.session.user!;

    const { name, mobile, state, address, sec_que, sec_ans } = req.body;

    let user;

    try {
        user = await User.findOne({ _id: userID });
    } catch (err) {
        console.log('ERROR: ', err);

        return res.render('home', {
            error: true,
            errorMessage: 'User not found!',
        });
    }

    if (!user) {
        const userDetails = new UserDetails({
            userID: user._id,
            name: name,
            mobilenum: mobile,
            state: state,
            address: address,
            sec_que: sec_que,
            sec_ans: sec_ans.toLowerCase(),
        });

        try {
            await userDetails.save();
        } catch (err) {
            return res.render('home');
        }

        try {
            await User.findOneAndUpdate(ObjectId.createFromHexString(userID), {
                $inc: {
                    counter: 1,
                },
            });

            res.redirect('home');
        } catch (err) {
            return res.redirect('login');
        }
    }

    let userDetails;

    try {
        userDetails = await UserDetails.findOne({ userID });
    } catch (err) {
        console.log('ERROR: ', err);
        return res.redirect('editprofile');
    }

    if (!userDetails) {
        return;
    }

    userDetails.name = name ? name : userDetails.name;
    userDetails.mobileNum = mobile ? mobile : userDetails.mobileNum;
    userDetails.state = state ? state : userDetails.state;
    userDetails.address = address ? address : userDetails.address;
    userDetails.sec_que = sec_que ? sec_que : userDetails.sec_que;
    userDetails.sec_ans = sec_ans ? sec_ans.toLowerCase() : userDetails.sec_ans;

    try {
        await userDetails.save();
        return res.redirect('home');
    } catch (err) {
        return res.render('editprofile');
    }
}

export { getEditProfile, postEditProfile };
