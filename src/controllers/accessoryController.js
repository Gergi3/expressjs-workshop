const express = require('express');

const accessoryServices = require('../services/accessoryServices');
const authenticateMiddleware = require('../middlewares/authenticateMiddleware');

const router = express.Router();

router.use(authenticateMiddleware);

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