const route = require('express').Router();

route.get('/', (req, res) => {
  res.json(req.session);
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
