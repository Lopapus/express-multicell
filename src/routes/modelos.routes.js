const route = require('express').Router();

const { getModelos, getModelo, postModelo, putModelo, deleteModelo } = require('../controllers/modelos.controller');

// middlewares
const { validateLogin, validateAdmin } = require('../middlewares/usuarios.middlewares');

route.get('/', [validateLogin, validateAdmin], getModelos);
route.get('/:id', [validateLogin, validateAdmin], getModelo);
route.post('/', [validateLogin, validateAdmin], postModelo);
route.put('/', [validateLogin, validateAdmin], putModelo);
route.delete('/', [validateLogin, validateAdmin], deleteModelo);

module.exports = route;
