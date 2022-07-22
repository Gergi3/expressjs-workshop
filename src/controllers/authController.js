const express = require('express');
const router = express.Router();

const authServices = require('../services/authServices');

router.get('/register', (req, res) => {
    res.render('auth/register');
});

router.post('/register', async (req, res) => {
    const { username, password, repassword } = req.body;

    try {
        const user = await authServices.register(username, password, repassword);

        if (user) {
            res.redirect('login');
        } else {
            res.redirect('register');
        }
    } catch (err) {
        console.log(err.message || err);
        res.redirect('register');
    }


});

exports.authRouter = router;