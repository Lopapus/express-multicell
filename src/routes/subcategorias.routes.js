const route = require('express').Router();

const { getSubcategorias, getSubcategoria, postSubcategoria, putSubcategoria, deleteSubcategoria } = require('../controllers/subcategorias.controller');

route.get('/', getSubcategorias);
route.get('/:id', getSubcategoria);
route.post('/', postSubcategoria);
route.put('/:id', putSubcategoria);
route.delete('/', deleteSubcategoria);

module.exports = route;
