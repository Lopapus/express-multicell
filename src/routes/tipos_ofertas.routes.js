const route = require('express').Router();

const { getTiposOfertas, getTipoOferta, postTipoOferta, putTipoOferta, deleteTipoOferta } = require('../controllers/tipos_ofertas.controller');

// middlewares
// const { validateLogin, validateAdmin } = require('../middlewares/usuarios.middlewares');

route.get('/', getTiposOfertas);
route.get('/:id', getTipoOferta);
route.post('/', postTipoOferta);
route.put('/', putTipoOferta);
route.delete('/', deleteTipoOferta);

module.exports = route;
