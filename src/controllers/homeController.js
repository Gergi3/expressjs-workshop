const express = require('express');
const router = express.Router();

const cubeServices = require('../services/cubeServices');

router.get('/', (req, res) => {
    const cubes = cubeServices.getAll();
    res.render('home', { cubes });
});

exports.homeRouter = router;