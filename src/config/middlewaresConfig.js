const cookieParser = require('../middlewares/cookieParserMiddleware');
const { session } = require('../middlewares/authMiddlewares');

module.exports = (app) => {
    cookieParser(app);
    session(app);
}