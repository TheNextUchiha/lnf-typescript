import mongoose from 'mongoose';

const { NODE_ENV } = process.env;

if (NODE_ENV !== 'production') require('dotenv/config');

const { MONGO_URI } = process.env;

const localURI = 'mongodb://localhost:27017/LostAndFound';
const mongoURI: string = MONGO_URI!;

console.log('2-- NODE_ENV: ', NODE_ENV);
console.log('2-- MONGO_URI: ', MONGO_URI);
console.log('2-- mongoURI: ', mongoURI);

try {
    mongoose.connect(mongoURI, {});

    console.log('DB Online!');
} catch (err) {
    console.log('Error while connecting Online Mongo.\nSwitching to Offline Mongo.\nError for reference:', err);
}

module.exports = { mongoose };
