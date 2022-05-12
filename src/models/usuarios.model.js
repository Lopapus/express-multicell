'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class usuarios extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }
  }
  usuarios.init({
    usuario: DataTypes.STRING,
    nombre: DataTypes.STRING,
    password: DataTypes.STRING,
    clave_maestra: DataTypes.STRING,
    rol: DataTypes.STRING,
    estado: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'usuarios'
  });
  return usuarios;
};
