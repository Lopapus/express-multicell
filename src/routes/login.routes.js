const route = require('express').Router();

const { login, logout } = require('../controllers/login.controller');

route.post('/login', login);
route.get('/logout', logout);

module.exports = route;
