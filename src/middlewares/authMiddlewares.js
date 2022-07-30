const { isLogged } = require('../services/authServices');

exports.session = (app) => {
    app.use(async (req, res, next) => {
        const token = req.cookies['session-token'];
        if (token) {
            try {
                const decodedToken = await isLogged(token);

                req.session = decodedToken;
                res.locals.session = decodedToken; 
            } catch (err) {
                res.redirect('/auth/logout');
            }
        }
        next();
    });
}

exports.isAuth = (req, res, next) => {
    if (!req.session) {
        return res.redirect('/auth/login');
    } else {
        next();
    }
};

exports.isUnauth = (req, res, next) => {
    if (req.session) {
        return res.redirect('/');
    } else {
        next();
    }
};