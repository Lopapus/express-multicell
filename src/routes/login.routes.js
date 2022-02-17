const route = require('express').Router();

const { login } = require('../controllers/login.controller');

route.post('/login', login);
// route.get('/logout', [validateLogin], logout);

module.exports = route;
