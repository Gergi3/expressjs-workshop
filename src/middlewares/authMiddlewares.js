const { isLogged } = require('../services/authServices');

exports.session = (app) => {
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

exports.isAuth = (req, res, next) => {
    if (!req.session) {
        res.redirect('/auth/login');
        return;
    } else {
        next();
    }
};

exports.isUnauth = (req, res, next) => {
    if (req.session) {
        res.redirect('/');
        return;
    } else {
        next();
    }
};