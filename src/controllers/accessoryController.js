const express = require('express');
const accessoryServices = require('../services/accessoryServices');

const router = express.Router();

router.get('/create', (req, res) => {
    res.render('accessory/create');
});

router.post('/create', (req, res) => {
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