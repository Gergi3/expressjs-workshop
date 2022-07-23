const { isLogged } = require('../services/authServices');

module.exports = (app) => {
    app.use((req, res, next) => {
        req.session = isLogged(req.cookies['session-token']);
        next();
    });
}