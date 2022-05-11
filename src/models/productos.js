'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class productos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      productos.belongsTo(models.user,
        {
          as: 'categorias',
          foreignKey: 'id_categoria'
        }
      );
      productos.belongsTo(models.user,
        {
          as: 'subcategorias',
          foreignKey: 'id_subcategoria'
        }
      );
      productos.belongsTo(models.user,
        {
          as: 'marcas',
          foreignKey: 'id_marca'
        }
      );
      productos.belongsTo(models.user,
        {
          as: 'modelos',
          foreignKey: 'id_modelo'
        }
      );
    }
  }
  productos.init({
    precio: DataTypes.FLOAT,
    facturado: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    observaciones: DataTypes.STRING(100),
    stock: DataTypes.INTEGER(3),
    stock_min: DataTypes.INTEGER(3),
    imei: DataTypes.STRING(20),
    estado: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    fecha_ingreso: DataTypes.DATE,
    codigo_barras: DataTypes.STRING(14),
    id_categoria: DataTypes.INTEGER(3),
    id_subcategoria: DataTypes.INTEGER(3),
    id_marca: DataTypes.INTEGER(3),
    id_modelo: DataTypes.INTEGER(3)
  }, {
    sequelize,
    modelName: 'productos'
  });
  return productos;
};
