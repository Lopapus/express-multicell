const route = require('express').Router();

const { getOfertas, getOferta, postOferta, putOferta, deleteOferta } = require('../controllers/ofertas.controller');

// middlewares
// const { validateLogin, validateAdmin } = require('../middlewares/usuarios.middlewares');

route.get('/', getOfertas);
route.get('/:id', getOferta);
route.post('/', postOferta);
route.put('/', putOferta);
route.delete('/', deleteOferta);

module.exports = route;
