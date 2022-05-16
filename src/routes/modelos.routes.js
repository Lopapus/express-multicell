const route = require('express').Router();

const { getModelos, getModelo, postModelo, putModelo, deleteModelo } = require('../controllers/modelos.controller');

route.get('/', getModelos);
route.get('/:id', getModelo);
route.post('/', postModelo);
route.put('/:id', putModelo);
route.delete('/', deleteModelo);

module.exports = route;
