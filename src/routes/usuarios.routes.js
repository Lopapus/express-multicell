const route = require('express').Router();

const { createUsuario, updateUsuario, updatePassword, deleteUsuario, getUsuario, findUsuarios } = require('../controllers/usuarios.controller');

route.get('/', findUsuarios);
route.get('/:id', getUsuario);
route.post('/', createUsuario);
route.put('/', updateUsuario);
route.put('/password', updatePassword);
route.delete('/', deleteUsuario);

module.exports = route;
