'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ofertas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      // marcas.hasOne(models.productos,
      //   {
      //     as: 'productos',
      //     foreignKey: 'id'
      //   }
      // );
    }
  }
  ofertas.init(
    {
      precio_oferta: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
        allowNull: false,
        unique: false
      },
      fecha: {
        allowNull: false,
        type: DataTypes.DATE
      },
      descripcion: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
      },
      estado: {
        type: DataTypes.INTEGER,
        defaultValue: 1
      }
    },
    {
      sequelize,
      modelName: 'ofertas'
    }
  );
  return ofertas;
};
