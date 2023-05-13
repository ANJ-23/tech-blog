// creates express node + Handlebar handling
const express = require('express');
const exphbs = require('express-handlebars');
const hbs = exphbs.create({  });

// creates session + routes
const session = require('express-session');
const routes = require('./controllers');

// initializes Sequelize + session storage
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

// Set Handlebars as the default template engine.
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// variable for session storage
const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({ // sequelize session storage
    db: sequelize
  })
};

// creates new sesion
app.use(session(sess));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ROUTING
app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});