

import express from 'express';
import helmet from 'helmet';
import path from 'path';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import logger from 'morgan';

import dotenv from 'dotenv';
import passport from 'passport';
import apiRouter from './app_api/routes/index';
import indexRouter from './app_server/routes/index';
import authRouter from './app_server/routes/auth';
import stripe from 'stripe';
import cors from 'cors';
// import readFileSync from 'fs';
const fs = require('fs');

dotenv.config();
//connect to db
stripe(process.env.STRIPE_SECRET_KEY);
require('./app_api/models/db');
require('./app_api/config/passport');
//init app
const app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


fs.readdir('upload', (err, files) => {
    files.forEach(file => {
        console.log(file);
    });
});

// let template = readFileSync(join(__dirname, '..', 'public', 'index.html')).toString();
// app.engine('html', (_, options, callback) => {
//     const opts = { document: template, url: options.req.url };

//     renderModuleFactory(AppServerModuleNgFactory, opts)
//         .then(html => callback(null, html));
// });
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/../public');




app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/../public')));
// TOFO delete ../
app.use('/upload', express.static(path.join(__dirname, '/../../upload')));
app.use(passport.initialize());
app.use(helmet());
app.use(cors());
//define routes
app.get('*.*', (req, res) => {
    res.sendFile(path.join(__dirname, '/../public'));
});
app.get('/', function (req, res) {
    res.render(__dirname + '/../public/index.html');
});

// app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/api', apiRouter);

//TODO route to get, create and edit creators info
// app.use('/creators', creatorsRouter);
//TODO route to edit user info
// app.use('/user', userRouter);

// app.use('/projects', projectsRouter);
// app.use('/register', registerRouter);
export default app;
