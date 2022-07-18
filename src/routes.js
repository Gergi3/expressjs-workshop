const express = require('express');

const { homeRouter } = require('./controllers/homeController');
const { accessoryRouter } = require('./controllers/accessoryController');
const { cubeRouter } = require('./controllers/cubeController');
const { aboutRouter } = require('./controllers/aboutController');
const { errorRouter } = require('./controllers/errorController');

const router = express.Router();

router.use('/', homeRouter);
router.use('/about', aboutRouter);
router.use('/cube', cubeRouter);
router.use('/accessory', accessoryRouter);
router.use('/', errorRouter);

exports.router = router;