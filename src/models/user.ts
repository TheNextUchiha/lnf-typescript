import mongoose, { Document, Model } from 'mongoose';
import { isEmail } from 'validator';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        unique: true,
        validate: {
            validator: (value: string) => isEmail(value),
            message: '{VALUE} is not a valid email.',
        },
    },
    username: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    counter: {
        type: Number,
        required: true,
        default: 0,
    },
});

// UserSchema methods are used to apply methods on an instance of a User object.
UserSchema.methods.comparePassword = (password: string, hash: string) => {
    return bcrypt.compareSync(password, hash);
};

// UserSchema statics is used to apply a method on the entire User Class/Schema.

UserSchema.pre('save', async function (next) {
    const user = this;

    if (user.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(user.password, salt);

        user.password = hash;
    }

    next();
});

const User = mongoose.model('User', UserSchema, 'users');

module.exports = { User };
