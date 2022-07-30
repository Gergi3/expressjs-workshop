const { isAuthorized } = require('../services/cubeServices');

exports.isOwner = async (req, res, next) => {
    const isOwner = await isAuthorized(req.params.cubeId, req.session?._id);
    if (!isOwner) {
        return res.redirect('/404')
    } 
    next();
}