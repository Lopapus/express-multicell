const { productos: Productos } = require('../models');

module.exports = {
  attributes: {
    exclude: ['createdAt', 'updatedAt']
  },
  include: [
    {
      model: Productos,
      as: 'productos',
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'id_categoria', 'id_subcategoria', 'id_marca', 'id_modelo']
      },
      through: {
        attributes: []
      }
    }
  ]
};
