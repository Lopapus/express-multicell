const route = require('express').Router();

route.get('/', (req, res) => {
  res.json({ message: 'Hola' });
});

module.exports = route;
