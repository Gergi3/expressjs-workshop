module.exports = (req, res, next) => {
    if (req.session) {
        res.redirect('/');
        return;
    } else {
        next();
    }
};