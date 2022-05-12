const route = require('express').Router();

route.get('/', (req, res) => {
  res.json({ msg: 'Hola' });
});

module.exports = route;
