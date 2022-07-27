const route = require('express').Router();

const { getMarcas, getMarca, postMarca, putMarca, deleteMarca } = require('../controllers/marcas.controller');

// middlewares
const { validateLogin, validateAdmin } = require('../middlewares/usuarios.middlewares');

route.get('/', [validateLogin, validateAdmin], getMarcas);
route.get('/:id', [validateLogin, validateAdmin], getMarca);
route.post('/', [validateLogin, validateAdmin], postMarca);
route.put('/', [validateLogin, validateAdmin], putMarca);
route.delete('/', [validateLogin, validateAdmin], deleteMarca);

module.exports = route;
