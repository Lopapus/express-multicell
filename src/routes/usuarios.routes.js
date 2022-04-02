const route = require('express').Router();

// middlewares
const { validateLogin, validateAdmin } = require('../middlewares/usuarios.middlewares');

// controllers
const { createUsuario, updateUsuario, updatePassword, deleteUsuario, getUsuario, findUsuarios, findNomUsuario, updateClaveMaestra } = require('../controllers/usuarios.controller');

// route.put('/', [validateLogin, updateUsuario]);
// route.get('/', findUsuarios);
route.get('/', [validateLogin, validateAdmin], findUsuarios);
route.get('/:id', [validateLogin, validateAdmin], getUsuario);
route.get('/user/:user', [validateLogin, validateAdmin], findNomUsuario);
route.post('/', [validateLogin, validateAdmin], createUsuario);
route.patch('/:id', [validateLogin], updateUsuario);
route.put('/password', [validateLogin], updatePassword);
route.delete('/', [validateLogin, validateAdmin], deleteUsuario);
route.put('/master', [validateLogin, validateAdmin], updateClaveMaestra);

module.exports = route;
