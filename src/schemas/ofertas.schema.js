const {
  tipos_ofertas: Tipos_ofertas
} = require('../models');

module.exports = {
  attributes: [
    'id',
    'precio_oferta',
    'descripcion',
    'estado'
  ],
  include: [
    // el as es el nombre del atributo y debe ser el mismo que en el as del assosiation del model
    {
      model: Tipos_ofertas,
      as: 'tipo_oferta',
      attributes: ['id', 'nombre']
    }
  ]
};
