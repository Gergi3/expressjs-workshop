const { isLogged } = require('../services/authServices');

module.exports = (app) => {
    app.use(async (req, res, next) => {
        const token = req.cookies['session-token'];
        if (token) {
            req.session = await isLogged(token);
        }
        next();
    });
}