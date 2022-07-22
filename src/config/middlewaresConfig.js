const cookieParser = require('../middlewares/cookieParserMiddleware');
const isLogged = require('../middlewares/isLoggedMiddleware');

module.exports = (app) => {
    cookieParser(app);
    isLogged(app);
}