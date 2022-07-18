const express = require('express');
const cubeServices = require('../services/cubeServices');
const Cube = require('../models/Cube');
const router = express.Router();

router.get('/create', (req, res) => {
    res.render('createCube');
});

router.post('/create', (req, res) => {
    const newCube = new Cube(req.body);

    const isValid = cubeServices.validate(newCube);
    if (!isValid) {
        res.redirect('/404');
    }

    newCube.save()
        .then(() => {
            res.redirect('/');
        })
        .catch(() => {
            res.redirect('/404');
        })
});

router.get('/details/:cubeId', (req, res) => {
    const cube = cubeServices.getById(req.params.cubeId);
    res.render('detailsCube', { cube });
})


exports.cubeRouter = router;