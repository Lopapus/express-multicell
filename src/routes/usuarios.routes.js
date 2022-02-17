const route = require('express').Router();

// middlewares
const { validateLogin, validateAdmin } = require('../middlewares/usuarios.middlewares');

// controllers
const { createUsuario, updateUsuario, updatePassword, deleteUsuario, getUsuario, findUsuarios } = require('../controllers/usuarios.controller');

// route.get('/', [validateLogin, validateAdmin], findUsuarios);
route.get('/', findUsuarios);
route.get('/:id', [validateLogin], getUsuario);
// route.post('/', [validateLogin, validateAdmin], createUsuario);
route.post('/', createUsuario);
route.put('/', [validateLogin, updateUsuario]);
route.put('/password', [validateLogin], updatePassword);
route.delete('/', [validateLogin, validateAdmin], deleteUsuario);

module.exports = route;
