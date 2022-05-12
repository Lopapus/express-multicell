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
      productos.belongsTo(models.categorias,
        {
          as: 'categorias',
          foreignKey: 'id_categoria'
        }
      );
      productos.belongsTo(models.subcategorias,
        {
          as: 'subcategorias',
          foreignKey: 'id_subcategoria'
        }
      );
      productos.belongsTo(models.marcas,
        {
          as: 'marcas',
          foreignKey: 'id_marca'
        }
      );
      productos.belongsTo(models.modelos,
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
    observaciones: DataTypes.STRING,
    stock: DataTypes.INTEGER,
    stock_min: DataTypes.INTEGER,
    imei: DataTypes.STRING,
    estado: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    fecha_ingreso: DataTypes.DATE,
    codigo_barras: DataTypes.STRING,
    id_categoria: DataTypes.INTEGER,
    id_subcategoria: DataTypes.INTEGER,
    id_marca: DataTypes.INTEGER,
    id_modelo: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'productos'
  });
  return productos;
};
