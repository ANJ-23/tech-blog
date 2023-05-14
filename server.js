const path = require('path');

// creates express node + session
const express = require('express');
const session = require('express-session');

// Handlebar handling
const exphbs = require('express-handlebars');

// creates routes
const routes = require('./controllers');

// custom helpers; 
const helpers = require('./utils/helpers');

// initializes Sequelize + session storage
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

// inserts custom helpers into Handlebars
const hbs = exphbs.create({ helpers });

// variable for session storage
const sess = {
  secret: 'Super secret secret',
  cookie: {
    maxAge: 300000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({ // sequelize session storage
    db: sequelize
  })
};

// creates new sesion
app.use(session(sess));

// Set Handlebars as the default template engine.
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// ROUTING
app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
