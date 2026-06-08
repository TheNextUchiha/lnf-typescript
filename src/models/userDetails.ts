import mongoose, { Model, Schema, Types } from 'mongoose';
import crypto from 'crypto';

interface IUserDetails {
    userID: Types.ObjectId;
    name: string;
    mobilenum: string;
    state: string;
    address: string;
    sec_que: number;
    sec_ans: string;
    qr: string;
    qrcount: number;
    qrcountprev: number;
}

const randomPhoneNumber = () => {
    let num = '';

    while (num.length < 10) num += Math.floor(Math.random() * 10).toString();

    return num;
};

const UserDetailsSchema = new Schema<IUserDetails>({
    userID: {
        type: Schema.Types.ObjectId,
        // required: true,
        unique: true,
    },
    name: {
        type: String,
        // required: true,
        trim: true,
        minlegth: 1,
    },
    mobilenum: {
        type: String,
        // required: true,
        unique: true,
        default: () => randomPhoneNumber(),
        minlength: 10,
        maxlength: 10,
    },
    state: {
        type: String,
        // required: true,
        default: undefined,
    },
    address: {
        type: String,
        // required: true,
        trim: true,
        default: undefined,
    },
    sec_que: {
        type: Number,
        // required: true,
        default: null,
    },
    sec_ans: {
        type: String,
        // required: true,
        trim: true,
        default: undefined,
    },
    qr: {
        type: String,
    },
    qrcount: {
        type: Number,
        default: 0,
    },
    qrcountprev: {
        type: Number,
        default: 0,
    },
});

const UserDetails: Model<IUserDetails> = mongoose.model<IUserDetails>('UserDetails', UserDetailsSchema, 'user_details');

export { UserDetails };
