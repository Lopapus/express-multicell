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
    usuario: DataTypes.STRING(15),
    nombre: DataTypes.STRING(50),
    password: DataTypes.STRING(60),
    clave_maestra: DataTypes.STRING(8),
    rol: DataTypes.STRING(20),
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
