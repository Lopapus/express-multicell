const route = require('express').Router();

const { getCategorias, getCategoria, postCategoria, putCategoria, deleteCategoria } = require('../controllers/categorias.controller');

// middlewares
const { validateLogin, validateAdmin } = require('../middlewares/usuarios.middlewares');

route.get('/', [validateLogin, validateAdmin], getCategorias);
route.get('/:id', [validateLogin, validateAdmin], getCategoria);
route.post('/', [validateLogin, validateAdmin], postCategoria);
route.put('/', [validateLogin, validateAdmin], putCategoria);
route.delete('/', [validateLogin, validateAdmin], deleteCategoria);

module.exports = route;
