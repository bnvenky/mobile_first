// server/server.js
const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const fileUpload = require('express-fileupload');


dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

app.use(session({ secret: process.env.JWT_SECRET, resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());


// Use require.resolve to debug path resolution
const initializePassportPath = require.resolve('./config/passport-setup');
console.log('Resolved path to passport-setup.js:', initializePassportPath);

// Require the resolved module path
const initializePassport = require(initializePassportPath);
//const initializePassport = require(path.join(__dirname, 'config', 'passport-setup'));
initializePassport(passport);

const routes = require(path.join(__dirname, 'routes'));

// Routes
app.use('/api', routes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
