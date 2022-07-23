const express = require('express');

const accessoryServices = require('../services/accessoryServices');

const router = express.Router();

router.get('/create', (req, res) => {
    if (!req.session) {
        res.redirect('/auth/login');
        return;
    }

    res.render('accessory/create');
});

router.post('/create', (req, res) => {
    if (!req.session) {
        res.redirect('/auth/login');
        return;
    }

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