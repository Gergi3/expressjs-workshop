const hbs = require('express-handlebars');
const path = require('path');

module.exports = (app) => {
    app.engine('hbs', hbs.engine({
        extname: 'hbs'
    }));
    app.set('view engine', 'hbs');
    app.set('views', path.resolve('src', 'views'));
}
