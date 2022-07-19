const express = require('express');
const cubeServices = require('../services/cubeServices');
const router = express.Router();

router.get('/create', (req, res) => {
    res.render('createCube');
});

router.post('/create', (req, res) => {
    const newCube = cubeServices.create(req.body);

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

router.get('/details/:cubeId', async (req, res) => {
    try {
        const cubeId = req.params.cubeId;
        const cube = await cubeServices.getById(cubeId);
        
        res.render('detailsCube', { cube: cube.toObject() });
    } catch (err) {
        res.send({});
    }
});

exports.cubeRouter = router;