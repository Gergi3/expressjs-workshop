const express = require('express');
const accessoryServices = require('../services/accessoryServices');

const router = express.Router();

router.get('/create', (req, res) => {
    res.render('createAccessory');
});

router.post('/create', (req, res) => {
    const newAccessory = accessoryServices.create(req.body);

    const isValid = accessoryServices.validate(newAccessory);
    if (!isValid) {
        res.redirect('/404');
    }

    newAccessory.save()
        .then(() => {
            res.redirect('/');
        })
        .catch(() => {
            res.redirect('/404');
        })
});


exports.accessoryRouter = router;