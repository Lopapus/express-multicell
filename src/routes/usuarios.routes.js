const route = require('express').Router();

// middlewares
const { validateLogin, validateAdmin } = require('../middlewares/usuarios.middlewares');

// controllers
const { createUsuario, updateUsuario, updatePassword, deleteUsuario, getUsuario, findUsuarios, findNomUsuario, updateClaveMaestra } = require('../controllers/usuarios.controller');

// route.get('/', [validateLogin, validateAdmin], findUsuarios);
// route.put('/', [validateLogin, updateUsuario]);
route.get('/', findUsuarios);
route.get('/:id', [validateLogin], getUsuario);
route.get('/user/:user', findNomUsuario);
route.post('/', [validateLogin, validateAdmin], createUsuario);
route.patch('/:id', updateUsuario);
route.put('/password', [validateLogin], updatePassword);
route.delete('/', [validateLogin, validateAdmin], deleteUsuario);
route.put('/master', updateClaveMaestra);

module.exports = route;
