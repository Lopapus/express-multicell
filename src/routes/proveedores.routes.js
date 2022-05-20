const route = require('express').Router();
const { createProveedor, updateProveedor, deleteProveedor } = require('../controllers/proveedores.controller');

route.post('/', createProveedor);
route.put('/', updateProveedor);
route.delete('/', deleteProveedor);

module.exports = route;
