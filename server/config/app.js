var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let cors = require('cors');
// modules for authentication
let session = require('express-session');

let passportJWT = require('passport-jwt');
let JWTStrategy = passportJWT.Strategy;
let ExtractJWT = passportJWT.ExtractJwt;
let passport = require('passport');
let passportLocal = require('passport-local');
let localStrategy = passportLocal.Strategy;
let flash = require('connect-flash');

// database setup
const mongoose = require('mongoose');
const DB = require('../config/db');

// point mongoose to the DB URI
mongoose.connect(DB.URI, {useNewUrlParser: true, useUnifiedTopology: true});

let mongoDB = mongoose.connection;
mongoDB.on('error', console.error.bind(console, 'Connection Error:'));
mongoDB.once('open', ()=>{
  console.log('Connected to MongoDB...');
});

var surveyRouter = require('../routes/survey.js');

var app = express();

// view engine setup

// connect angular to express

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../../client/dist/survey')));
// route all requests to index.html except api requests
app.get('*', (req, res, next) => {
  if (!req.originalUrl.startsWith('/api')) {
    res.sendFile(path.join(__dirname, '../../client/dist/survey/index.html'));
  } else {
    next();
  }
});
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../node_modules')));
app.use(cors());
// setup express session
app.use(session({
  secret: "Secret",
  saveUninitialized: false,
  resave: false
}));

// initialize flash
app.use(flash());

// initialize passport 
app.use(passport.initialize());
app.use(passport.session());

// passport user configuration

// create a User Model Instance
let userModel = require('../models/user');
let User = userModel.User; 

// implement user authentication strategy
passport.use(User.createStrategy());

// serialize and deserialize the User info
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = DB.Secret;

let strategy = new JWTStrategy(jwtOptions, (jwt_payload, done) => {
  User.findById(jwt_payload.id)
    .then(user => {
      return done(null, user);
    })
    .catch(err => {
      return done(err, false);
    });
});
passport.use(strategy);

app.use('/api', surveyRouter);


module.exports = app;
