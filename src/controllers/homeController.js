const express = require('express');
const url = require('url');
const router = express.Router();

const cubeServices = require('../services/cubeServices');

router.get('/', (req, res) => {
    const { search, from, to } = req.query;
    cubes = cubeServices.search(search, Number(from), Number(to))

    res.render('home', { cubes });
});

exports.homeRouter = router;