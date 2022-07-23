const express = require('express');
const router = express.Router();

const authServices = require('../services/authServices');
const authenticateMiddleware = require('../middlewares/authenticateMiddleware');

router.get('/register', (req, res) => {
    if (req.session) {
        res.redirect('/');
        return;
    }

    res.render('auth/register');
});

router.post('/register', async (req, res) => {
    if (req.session) {
        res.redirect('/');
        return;
    }

    const { username, password, repassword } = req.body;

    try {
        const user = await authServices.register(username, password, repassword);

        res.redirect('login');
    } catch (err) {
        res.redirect('register');
    }
});


router.get('/login', (req, res) => {
    if (req.session) {
        res.redirect('/');
        return;
    }
    
    res.render('auth/login');
});

router.post('/login', async (req, res) => {
    if (req.session) {
        res.redirect('/');
        return;
    }
    
    const { username, password } = req.body;

    try {
        const sessionToken = await authServices.login(username, password);
        res.cookie('session-token', sessionToken);
        res.redirect('/');
    } catch (err) {
        res.redirect('login');
    }
});

router.use(authenticateMiddleware);

router.get('/logout', async (req, res) => {
    res.clearCookie('session-token');
    res.redirect('/');
});


exports.authRouter = router;