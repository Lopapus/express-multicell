const route = require('express').Router();

const { postPrecios } = require('../controllers/precios.controller');

// middlewares
// const { validateLogin, validateAdmin } = require('../middlewares/usuarios.middlewares');

route.post('/', postPrecios);

module.exports = route;
