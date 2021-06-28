// import statements
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');

// setting up a connection to your SQL database
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// intitializing an express app
const app = express();
const PORT = process.env.PORT || 3001;

// setting up sessions
const sess = {
    secret: 'Super secret secret',
    cookie: {
        expires: 30 * 60 * 1000
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(session(sess));

// // Inform Express.js on which template engine to use

const hbs = exphbs.create({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, '/views/layouts/'),
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

// middleware to use so that http request will work smoothly
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// defines the location of where to get static files
app.use(express.static(path.join(__dirname, 'public'))); // all of the files under public folder are available statically on home route.

// express app, use these route from my routes folder
app.use(routes);

// connecting to your database
sequelize.sync({ force: false }).then(() => {
    // start listening to http request
    app.listen(PORT, () => console.log('Now listening'));
});
