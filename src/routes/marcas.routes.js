const route = require('express').Router();

const { getMarcas, getMarca, postMarca, putMarca, deleteMarca } = require('../controllers/marcas.controller');

route.get('/', getMarcas);
route.get('/:id', getMarca);
route.post('/', postMarca);
route.put('/:id', putMarca);
route.delete('/', deleteMarca);

module.exports = route;
