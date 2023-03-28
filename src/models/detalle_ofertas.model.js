'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class detalle_ofertas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }
  }
  detalle_ofertas.init({
    descuento: DataTypes.INTEGER,
    defaultValue: null,
    validate: {
      isNumeric: {
        arg: true,
        msg: 'El precio de oferta solo debe contener números'
      }
    }
  }, {
    sequelize,
    modelName: 'detalle_ofertas'
  });
  return detalle_ofertas;
};
