const route = require('express').Router();

// middlewares
const { validateLogin, validateAdmin } = require('../middlewares/usuarios.middlewares');

// controllers
const { createUsuario, updateUsuario, updatePassword, deleteUsuario, getUsuario, findUsuarios, findNomUsuario, updateClaveMaestra } = require('../controllers/usuarios.controller');

route.get('/', [validateLogin, validateAdmin], findUsuarios);
route.get('/:id', [validateLogin], getUsuario);
route.get('/user/:user', [validateLogin], findNomUsuario);
route.post('/', [validateLogin, validateAdmin], createUsuario);
// route.post('/without', createUsuario);
route.patch('/:id', [validateLogin], updateUsuario);
route.put('/password', [validateLogin], updatePassword);
route.delete('/', [validateLogin, validateAdmin], deleteUsuario);
route.put('/master', [validateLogin], updateClaveMaestra);

module.exports = route;
