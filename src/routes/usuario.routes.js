const route = require('express').Router();

const Usuario = require('../controllers/usuario.controller');

route.get('/', Usuario.list);
route.post('/', Usuario.create);
route.put('/', Usuario.update);
route.delete('/:id', Usuario.delete);
route.get('/:username', Usuario.find);

module.exports = route;
