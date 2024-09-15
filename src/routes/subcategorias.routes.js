const route = require('express').Router();

const { getSubcategorias, getSubcategoria, postSubcategoria, putSubcategoria, deleteSubcategoria } = require('../controllers/subcategorias.controller');

// middlewares
const { validateLogin, validateAdmin } = require('../middlewares/usuarios.middlewares');

route.get('/', [validateLogin, validateAdmin], getSubcategorias);
route.get('/:id', [validateLogin, validateAdmin], getSubcategoria);
route.post('/', [validateLogin, validateAdmin], postSubcategoria);
route.put('/', [validateLogin, validateAdmin], putSubcategoria);
route.delete('/', [validateLogin, validateAdmin], deleteSubcategoria);

module.exports = route;
