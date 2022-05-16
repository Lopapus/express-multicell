const route = require('express').Router();

const { getCategorias, getCategoria, postCategoria, putCategoria, deleteCategoria } = require('../controllers/categorias.controller');

route.get('/', getCategorias);
route.get('/:id', getCategoria);
route.post('/', postCategoria);
route.put('/:id', putCategoria);
route.delete('/', deleteCategoria);

module.exports = route;
