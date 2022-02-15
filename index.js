const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const session = require('express-session');
const { status: dbstatus } = require('./src/connections/sequelize');
require('dotenv').config();

const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

// Settings
app.set('port', process.env.PORT || 4000);

// Routes
app.use('/usuarios', require('./src/routes/usuarios.routes'));
app.use('/', require('./src/routes/login.routes'));
app.use('/', require('./src/routes/main.routes'));

// Run server
app.listen(app.get('port'), async () => {
  console.log('app running successfully!!');
  console.log(`http://localhost:${app.get('port')}`);
  console.log(await dbstatus());
});
