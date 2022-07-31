const { app, port, initConfig } = require('./config/expressConfig');
const connectToDb = require('./config/databaseConfig');
const setupHandlebars = require('./config/handlebarsConfig');
const setupMiddlewares = require('./config/middlewaresConfig');
const setupRouting = require('./config/routingConfig');
const { globalErrorHandler } = require('./middlewares/globalErrorHandlerMiddleware');

initConfig();
setupHandlebars(app);
setupMiddlewares(app);
setupRouting(app);
app.use(globalErrorHandler);

connectToDb(app)
    .then(() => {
        app.listen(port, () => console.log(`Server is listening on port ${port}...`));
    })
    .catch((err) => {
        console.log(`Cannot connect to db: ${err}`);
    });