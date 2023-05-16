'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tipos_ofertas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }
  }
  tipos_ofertas.init({
    nombre: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'tipos_ofertas'
  });
  return tipos_ofertas;
};
