const express = require('express');

const accessoryServices = require('../services/accessoryServices');
const isAuthenticated = require('../middlewares/authenticateMiddleware');

const router = express.Router();

router.get('/create', isAuthenticated, (req, res) => {
    res.render('accessory/create');
});

router.post('/create', isAuthenticated, (req, res) => {
    const newAccessory = accessoryServices.create(req.body);

    newAccessory.save()
        .then(() => {
            res.redirect('/');
        })
        .catch(() => {
            res.redirect('/404');
        })
});

exports.accessoryRouter = router;