import mongoose from 'mongoose';

const { MONGO_URI } = process.env;

const localURI = 'mongodb://localhost:27017/LostAndFound';
const mongoURI: string = MONGO_URI!;

try {
    mongoose.connect(mongoURI, {});

    console.log('DB Online!');
} catch (err) {
    console.log('Error while connecting Online Mongo.\nSwitching to Offline Mongo.\nError for reference:', err);
}

export { mongoose };
