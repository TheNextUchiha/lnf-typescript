import { User } from '../models/user.js';
import { UserDetails } from '../models/userDetails.js';

async function getEditProfile(req, res) {
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

async function postEditProfile(req, res) {
    const { userID } = req.session.user!;

    const body = _.pick(req.body, ['name', 'mobile', 'state', 'address', 'sec_que', 'sec_ans']);

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
        body.sec_ans = body.sec_ans.toLowerCase();

        const userDetails = new UserDetails({
            userID: user._id,
            name: body.name,
            mobilenum: body.mobile,
            state: body.state,
            address: body.address,
            sec_que: body.sec_que,
            sec_ans: body.sec_ans.toLowerCase(),
        });

        try {
            await userDetails.save();
        } catch (err) {
            return res.render('home');
        }

        try {
            await User.findOneAndUpdate(userID, {
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

    body.sec_ans = body.sec_ans.toLowerCase();

    if (!userDetails) {
        return;
    }

    userDetails.name = body.name ? body.name : userDetails.name;
    userDetails.mobileNum = body.mobile ? body.mobile : userDetails.mobileNum;
    userDetails.state = body.state ? body.state : userDetails.state;
    userDetails.address = body.address ? body.address : userDetails.address;
    userDetails.sec_que = body.sec_que ? body.sec_que : userDetails.sec_que;
    userDetails.sec_ans = body.sec_ans ? body.sec_ans : userDetails.sec_ans;

    try {
        await userDetails.save();
        return res.redirect('home');
    } catch (err) {
        return res.render('editprofile');
    }
}

export { getEditProfile, postEditProfile };
