const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const sequelize_db = require('./src/connections/sequelize');
require('dotenv').config();
const app = express();

// Middlewares
app.use(morgan('dev'));
// app.use(cors({
//   origin: 'http://localhost:3000',
//   credentials: true
// }));
// ==> middleware que verifica si hay coneccion a la base de datos
app.use(sequelize_db.verify());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Settings
app.set('port', process.env.PORT || 4000);

// Routes
app.use('/usuarios', require('./src/routes/usuarios.routes'));
app.use('/', require('./src/routes/login.routes'));
// app.use('/', require('./src/routes/main.routes'));

// Run server
app.listen(app.get('port'), async () => {
  console.log('app running successfully!!');
  console.log(`http://localhost:${app.get('port')}`);
  console.log((await sequelize_db.status()).message);
});
