const { app, port, initConfig } = require('./config/express');
const connectToDb = require('./config/database');

initConfig();

connectToDb(app)
    .then(() => {
        app.listen(port, () => console.log(`Server is listening on port ${port}...`));
    })
    .catch((err) => {
        console.log(`Cannot connect to db: ${err}`);
    });