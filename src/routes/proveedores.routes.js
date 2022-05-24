const route = require('express').Router();
const {
  createProveedor,
  updateProveedor,
  deleteProveedor,
  getProveedores,
  getProveedor
} = require('../controllers/proveedores.controller');

// middlewares
const { validateLogin, validateAdmin } = require('../middlewares/usuarios.middlewares');

route.get('/', [validateLogin, validateAdmin], getProveedores);
route.get('/:id', [validateLogin, validateAdmin], getProveedor);
route.post('/', [validateLogin, validateAdmin], createProveedor);
route.put('/', [validateLogin, validateAdmin], updateProveedor);
route.delete('/', [validateLogin, validateAdmin], deleteProveedor);

module.exports = route;
