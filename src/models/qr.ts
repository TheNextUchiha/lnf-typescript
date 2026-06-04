import mongoose, { Model, Schema, Types } from 'mongoose';

interface IQRCode {
    userID: Types.ObjectId;
    qr: [string];
}

const QRSchema = new Schema<IQRCode>({
    userID: {
        type: Schema.Types.ObjectId,
        // required: true,
        unique: true,
    },
    qr: [],
});

const QR: Model<IQRCode> = mongoose.model<IQRCode>('UserDetails', QRSchema, 'user_details');

export { QR };
