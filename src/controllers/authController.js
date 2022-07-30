const express = require('express');
const router = express.Router();

const authServices = require('../services/authServices');
const isAuthenticated = require('../middlewares/authenticateMiddleware');
const isUnauthenticated = require('../middlewares/unauthenticateMiddleware')

router.get('/logout', isAuthenticated, async (req, res) => {
    res.clearCookie('session-token');
    res.redirect('/');
});

router.get('/register', isUnauthenticated, (req, res) => {
    res.render('auth/register');
});

router.post('/register', isUnauthenticated, async (req, res) => {
    const { username, password, repassword } = req.body;

    try {
        const user = await authServices.register(username, password, repassword);

        res.redirect('login');
    } catch (err) {
        res.redirect('register');
    }
});


router.get('/login', isUnauthenticated, (req, res) => {
    res.render('auth/login');
});

router.post('/login', isUnauthenticated, async (req, res) => {    
    const { username, password } = req.body;

    try {
        const sessionToken = await authServices.login(username, password);
        res.cookie('session-token', sessionToken, { httpOnly: true });
        res.redirect('/');
    } catch (err) {
        res.redirect('login');
    }
});

exports.authRouter = router;