const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const sequelize_db = require('./connections/sequelize');
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
app.use('/', require('./routes/login.routes'));
app.use('/usuarios', require('./routes/usuarios.routes'));
app.use('/marcas', require('./routes/marcas.routes'));
app.use('/proveedores', require('./routes/proveedores.routes'));
app.use('/categorias', require('./routes/categorias.routes'));
app.use('/subcategorias', require('./routes/subcategorias.routes'));
app.use('/productos', require('./routes/productos.routes'));
// app.use('/', require('./src/routes/main.routes'));

// Run server
app.listen(app.get('port'), async () => {
  console.log('app running successfully!!');
  console.log(`http://localhost:${app.get('port')}`);
  console.log((await sequelize_db.status()).message);
});
