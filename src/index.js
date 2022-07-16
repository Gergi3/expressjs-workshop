const express = require('express');
const hbs = require('express-handlebars');
const path = require('path');
const { router } = require('./routes');

const app = express();
const port = 5000;

app.engine('hbs', hbs.engine({ extname: 'hbs' }))
app.set('view engine', 'hbs');
app.set('views', path.resolve('src', 'views'))

app.use('/public', express.static('public'));

app.use('/', router);

app.listen(port, () => console.log(`Server is listening on port ${port}...`));