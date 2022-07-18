const express = require('express');
const url = require('url');
const router = express.Router();

const cubeServices = require('../services/cubeServices');

router.get('/', async (req, res) => {
    const { search, from, to } = req.query;
    const cubes = await cubeServices.getAll();
    
    res.render('home', { cubes });
});

exports.homeRouter = router;