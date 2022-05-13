'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class categorias extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }
  }
  categorias.init({
    nombre: {
      type: DataTypes.STRING,
      validate: {
        // ඞ
        is: {
          arg: /^[^$%&|<>#()'¿?¡!¬*/°^`]*$/,
          msg: 'No se permiten caracteres especiales'
        },
        min: {
          arg: 2,
          msg: 'Se debe ingresar al menos 2 caracteres'
        },
        max: {
          arg: 25,
          msg: 'Solo se permite un máximo de 25 caracteres'
        },
        notEmpty: {
          arg: true,
          msg: 'No se permite crear una marca con el nombre vacío'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'categorias'
  });
  return categorias;
};
