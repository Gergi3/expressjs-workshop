const express = require('express');
const router = express.Router();

const authServices = require('../services/authServices');
const { isAuth } = require('../middlewares/authMiddlewares');
const { isUnauth } = require('../middlewares/authMiddlewares')

router.get('/logout', isAuth, async (req, res) => {
    res.clearCookie('session-token');
    res.redirect('/');
});

router.get('/register', isUnauth, (req, res) => {
    res.render('auth/register');
});

router.post('/register', isUnauth, async (req, res) => {
    const { username, password, repassword } = req.body;

    try {
        const user = await authServices.register(username, password, repassword);

        res.redirect('login');
    } catch (err) {
        res.redirect('register');
    }
});


router.get('/login', isUnauth, (req, res) => {
    res.render('auth/login');
});

router.post('/login', isUnauth, async (req, res) => {    
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