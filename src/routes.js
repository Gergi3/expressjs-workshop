const express = require('express');

const { homeRouter } = require('./controllers/homeController');
const { aboutRouter } = require('./controllers/aboutController');
const { errorRouter } = require('./controllers/errorController');

const router = express.Router();

router.use('/', homeRouter);
router.use('/about', aboutRouter);
router.use('/', errorRouter);

exports.router = router;