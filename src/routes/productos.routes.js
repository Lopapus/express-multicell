const route = require('express').Router();

const { getProductos, getProducto, postProducto, putProducto, deleteProducto } = require('../controllers/productos.controller');

route.get('/', getProductos);
route.get('/:id', getProducto);
route.post('/', postProducto);
route.put('/:id', putProducto);
route.delete('/', deleteProducto);

module.exports = route;
