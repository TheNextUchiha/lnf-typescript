import express from 'express';
import favicon from 'serve-favicon';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import { fileURLToPath } from 'url';
import path from 'path';

import { mongoose } from './db/mongoose.js';

const { PORT, MONGO_URI } = process.env;

import index from './routes/index.js';
import auth from './routes/auth.js';
import profile from './routes/editprofile.js';
import user from './routes/user.js';
import home from './routes/home.js';

const getDirname = (metaUrl: string) => {
    const filename = fileURLToPath(metaUrl);
    return path.dirname(filename);
};

const port = PORT;

const app = express();

const sessionOptions = { mongoUrl: MONGO_URI || '', collectionName: 'sessions' };

//Handlebars Setup
app.set('view engine', 'hbs');

// ----> Express Middle-wares <-----
app.use(favicon(getDirname(import.meta.url) + '/public/icons/favicon.ico')); // To serve Favicon to the client
app.use(express.urlencoded({ extended: false })); // To Parse URL data
app.use(express.json()); // To Parse JSON data
app.use(express.static(getDirname(import.meta.url) + '/views')); // To include static HTML pages
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
app.use(auth);
app.use(profile);
app.use(user);
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
