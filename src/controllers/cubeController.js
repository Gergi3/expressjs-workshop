const express = require('express');
const router = express.Router();

const cubeServices = require('../services/cubeServices');

router.get('/create', (req, res) => {
    res.render('createCube');
});

router.post('/create', (req, res) => {
    const { name, description, imageUrl, difficultyLevel } = req.body;
    
    const newCube = cubeServices.createObj(name, description, imageUrl, difficultyLevel);

    const isValid = cubeServices.validate(newCube);
    if (!isValid) {
        res.redirect('/404');
    }

    cubeServices.writeToDb(newCube)
        .then(x => {
            res.redirect('/');
        })
        .catch(err => {
            res.redirect('/404');
        })
});

router.get('/details/:cubeId', (req, res) => {
    const cube = cubeServices.getById(req.params.cubeId);
    res.render('detailsCube', { cube });
})


exports.cubeRouter = router;