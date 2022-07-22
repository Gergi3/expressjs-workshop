const express = require('express');

const app = express();
const port = 5000;

const initConfig = () => {
    app.use(express.urlencoded({ extended: false }));
    app.use('/public', express.static('public'));
}

module.exports = {
    app, port, initConfig
};
