'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class subcategorias extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }
  }
  subcategorias.init({
    nombre: {
      type: DataTypes.STRING,
      validate: {
        // ඞ
        len: {
          args: [2, 25],
          msg: 'El nombre de la marca permite entre 2 y 25 caracteres'
        },
        is: {
          args: /^[a-zA-ZÀ-ÿ-0-9\s]*$/,
          msg: 'No se permiten caracteres especiales'
        },
        notEmpty: {
          arg: true,
          msg: 'No se permiten cadena de caracteres vacías'
        }
      }
    },
    estado: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    }
  }, {
    sequelize,
    modelName: 'subcategorias'
  });
  return subcategorias;
};
