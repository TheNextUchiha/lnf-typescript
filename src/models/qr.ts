import mongoose from 'mongoose';
import ObjectID from 'mongodb';

var QRSchema = new mongoose.Schema({
    userID: {
        type: ObjectID,
        // required: true,
        unique: true,
    },
    qr: [],
});

var QR = mongoose.model('UserDetails', QRSchema, 'user_details');

module.exports = { QR };
