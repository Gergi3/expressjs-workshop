const cookieParser = require('../middlewares/cookieParserMiddleware');
const session = require('../middlewares/sessionMiddleware');

module.exports = (app) => {
    cookieParser(app);
    session(app);
}