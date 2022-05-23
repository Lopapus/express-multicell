const route = require('express').Router();
const {
  createProveedor,
  updateProveedor,
  deleteProveedor,
  getProveedores,
  getProveedor
} = require('../controllers/proveedores.controller');

route.get('/', getProveedores);
route.get('/:id', getProveedor);
route.post('/', createProveedor);
route.put('/', updateProveedor);
route.delete('/', deleteProveedor);

module.exports = route;
