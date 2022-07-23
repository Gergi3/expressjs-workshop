module.exports = (req, res, next) => {
    if (!req.session) {
        res.redirect('/auth/login');
        return;
    } else {
        next();
    }
};