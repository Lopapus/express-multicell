const {
  marcas: Marcas,
  categorias: Categorias,
  subcategorias: Subcategorias,
  proveedores: Proveedores
} = require('../models');

module.exports = {
  attributes: [
    'id',
    'precio',
    'observaciones',
    'stock',
    'stock_min',
    'imei',
    'estado',
    'fecha_ingreso',
    'codigo_barras'
  ],
  include: [
    // el as es el nombre del atributo y debe ser el mismo que en el as del assosiation del model
    {
      model: Marcas,
      as: 'marca',
      attributes: ['id', 'nombre']
    },
    {
      model: Categorias,
      as: 'categoria',
      attributes: ['id', 'nombre']
    },
    {
      model: Subcategorias,
      as: 'subcategoria',
      attributes: ['id', 'nombre']
    },
    {
      model: Proveedores,
      as: 'proveedores',
      attributes: ['cuit', 'nombre'],
      through: {
        attributes: []
      }
    }
  ]
};
