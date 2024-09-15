'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class proveedores_productos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      proveedores_productos.belongsTo(models.proveedores,
        {
          as: 'proveedores',
          foreignKey: 'id_proveedor'
        }
      );
      proveedores_productos.belongsTo(models.productos,
        {
          as: 'productos',
          foreignKey: 'id_producto'
        }
      );
    }
  }
  proveedores_productos.init({
    id_proveedor: {
      type: DataTypes.INTEGER
    },
    id_producto: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'proveedores_productos'
  });
  return proveedores_productos;
};
