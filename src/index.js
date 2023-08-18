const path = require('path');
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const handlebars = require('express-handlebars');

const db = require('./config/db');

//connect to db
db.connect();

const app = express();
const port = 3000;

const route = require('./routes');

app.use(express.static(path.join(__dirname, 'public')));

app.use(
    express.urlencoded({
        extended: true,
    }),
);

app.use(express.json());
app.use(methodOverride('_method'))

app.use(validMiddleware);
function validMiddleware (req, res, next) {
    if (['vethuong', 'vevip'].includes(res.query.ve)) {
        req.face = '123';
        return next();
    }
    res.status(403).json({
        message: "Access denied"
    });
}
app.get('/middleware', function (req, res, next) {
    res.json({
        message: 'Successfully!'
    });
})


app.use(morgan('combined'));

//template engine
app.engine(
    'hbs',
    handlebars({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b
        }
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

//Routes init
route(app);

app.listen(port, () => {
    console.log(`App listening on port http://localhost:${port}`);
});
