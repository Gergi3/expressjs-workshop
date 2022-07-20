const { app, port, initConfig } = require('./config/express');
const connectToDb = require('./config/database');
const setupHandlebars = require('./config/handlebars');

initConfig();
setupHandlebars(app);

connectToDb(app)
    .then(() => {
        app.listen(port, () => console.log(`Server is listening on port ${port}...`));
    })
    .catch((err) => {
        console.log(`Cannot connect to db: ${err}`);
    });