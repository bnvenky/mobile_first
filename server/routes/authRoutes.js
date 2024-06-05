const express = require('express');
const router = express.Router();
const passport = require('passport');

const { register, login, logout, googleAuth, googleAuthCallback, facebookAuth, facebookAuthCallback } = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }), googleAuthCallback);
router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));
router.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/' }), facebookAuthCallback);

module.exports = router;
