const { isLogged } = require('../services/authServices');

module.exports = (app) => {
    app.use(async (req, res, next) => {
        const token = req.cookies['session-token'];
        if (token) {
            try {
                req.session = await isLogged(token);
            } catch (err) {
                res.redirect('/auth/logout');
            }
        }
        next();
    });
}