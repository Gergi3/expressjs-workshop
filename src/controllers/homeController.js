const express = require('express');
const router = express.Router();

const cubeServices = require('../services/cubeServices');
const mongooseServices = require('../services/mongooseServices');

router.get('/', async (req, res) => {
    const { search, from, to } = req.query;
    const cubes = await cubeServices.getAll(search, from, to);

    res.render('home', {
        cubes: mongooseServices.mapToObjects(cubes),
        search, from, to
    });
});

exports.homeRouter = router;