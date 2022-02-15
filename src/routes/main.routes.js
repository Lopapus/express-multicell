const route = require('express').Router();
const bcryptjs = require('bcryptjs');

route.get('/', (req, res) => {
  // res.json(req.session);
  const salt = bcryptjs.genSaltSync(10);
  const hash = bcryptjs.hashSync('Probando', salt);
  res.json({ codigo: hash, largo: hash.length });
});

route.get('/create/:session', (req, res) => {
  req.session[req.params.session] = req.params.session;
  res.send('creado');
});

route.get('/delete/:session', (req, res) => {
  if (req.session[req.params.session]) {
    delete req.session[req.params.session];
  }
  res.send('eliminado');
});

module.exports = route;
