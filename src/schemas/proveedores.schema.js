const { productos: Productos } = require('../models');
const productos_schema = require('./productos.schema');

module.exports = {
  attributes: {
    exclude: ['createdAt', 'updatedAt']
  },
  include: [
    {
      model: Productos,
      as: 'productos',
      ...productos_schema
    }
  ]
};
