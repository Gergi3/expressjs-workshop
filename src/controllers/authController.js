const express = require('express');
const router = express.Router();

const authServices = require('../services/authServices');
const { isAuth, isUnauth } = require('../middlewares/authMiddlewares');

router.get('/register', isUnauth, (req, res) => {
    res.render('auth/register');
});

router.post('/register', isUnauth, async (req, res, next) => {
    try {
        await authServices.register(req.body);

        res.redirect('login');
    } catch (err) {
        err.path = 'auth/register';
        next(err);
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

router.get('/logout', isAuth, async (req, res) => {
    res.clearCookie('session-token');
    res.redirect('/');
});

exports.authRouter = router;