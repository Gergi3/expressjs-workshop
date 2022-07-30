const express = require('express');

const accessoryServices = require('../services/accessoryServices');
const { isAuth } = require('../middlewares/authMiddlewares');

const router = express.Router();

router.get('/create', isAuth, (req, res) => {
    res.render('accessory/create');
});

router.post('/create', isAuth, (req, res) => {
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