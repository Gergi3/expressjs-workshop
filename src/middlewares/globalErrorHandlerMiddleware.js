exports.globalErrorHandler = (err, req, res, next) => {
    if (!err.messages) {
        console.log(err);
        res.redirect('/404');
    }

    res.locals.error = err; 
    res.render(err.path);
}