const route = require('express').Router();

const { login, logout } = require('../controllers/login.controller');
const { validateLogin } = require('../middlewares/usuarios.middlewares');

route.post('/login', login);
route.get('/logout', [validateLogin], logout);

module.exports = route;
