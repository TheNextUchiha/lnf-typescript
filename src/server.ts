import express from 'express';
import favicon from 'serve-favicon';
import session from 'express-session';
import MongoStore from 'connect-mongo';

const { mongoose } = require('./server/db/mongoose');

const { NODE_ENV, PORT, MONGO_URI } = process.env;

import index from './routes/index.js';
import login from './routes/auth.js';
import signup from './routes/signup.js';
import editProfile from './routes/editprofile.js';
import getUser from './routes/user.js';
import home from './routes/home.js';

if (NODE_ENV !== 'production') require('dotenv/config');

const port = PORT;

const app = express();

const sessionOptions = { mongoUrl: MONGO_URI || '', collectionName: 'sessions' };

//Handlebars Setup
app.set('view engine', 'hbs');

// ----> Express Middle-wares <-----
app.use(favicon(__dirname + '/public/icons/favicon.ico')); // To serve Favicon to the client
app.use(express.urlencoded({ extended: false })); // To Parse URL data
app.use(express.json()); // To Parse JSON data
app.use(express.static(__dirname + '/views')); // To include static HTML pages
app.use(
    session({
        secret: 'bruhbruhbruh',
        resave: false,
        saveUninitialized: false,
        unset: 'destroy',
        store: MongoStore.create(sessionOptions),
        cookie: {
            maxAge: 1000 * 60 * 30, // 30 minutes --> Format: millisec * sec * min
        },
    }),
);

// -----> Routes <-----
app.use(index);
app.use(login);
app.use(signup);
app.use(editProfile);
app.use(getUser);
app.use(home);

/*
-----> Maintenance Mode <-----

app.use((req, res, next) => { 
    res.render('maintenance.hbs');
});

*/

app.listen(port, () => {
    console.log('Server up at port: ' + port);
});
