const route = require('express').Router();

const { login } = require('../controllers/login.controller');

route.get('/', (req, res) => res.status(200).json({ message: 'app corriendo' }));
route.post('/login', login);
// route.get('/logout', [validateLogin], logout);

module.exports = route;
