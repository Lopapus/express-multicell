'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class detalles_ofertas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }
  }
  detalles_ofertas.init(
    {
      descuento: {
        type: DataTypes.FLOAT
      },
      id_producto: {
        type: DataTypes.INTEGER,
        validate: {
          isNumeric: {
            arg: true,
            msg: 'Solo se permiten números'
          }
        }
      },
      id_oferta: {
        type: DataTypes.INTEGER,
        validate: {
          isNumeric: {
            arg: true,
            msg: 'Solo se permiten números'
          }
        }
      }
    }, {
      sequelize,
      modelName: 'detalles_ofertas'
    }
  );
  return detalles_ofertas;
};
