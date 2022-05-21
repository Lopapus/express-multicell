const route = require('express').Router();
const {
  createProveedor,
  updateProveedor,
  deleteProveedor,
  getProveedores
} = require('../controllers/proveedores.controller');

route.get('/', getProveedores);
route.post('/', createProveedor);
route.put('/', updateProveedor);
route.delete('/', deleteProveedor);

module.exports = route;
