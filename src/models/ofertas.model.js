'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ofertas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      ofertas.belongsTo(models.tipos_ofertas,
        {
          as: 'tipo_oferta',
          foreignKey: 'id'
        }
      );
    }
  }
  ofertas.init({
    precio_oferta: {
      type: DataTypes.FLOAT,
      validate: {
        isNumeric: {
          arg: true,
          msg: 'El precio solo permite números'
        }
      }
    },
    descripcion: {
      type: DataTypes.STRING,
      defaultValue: null,
      validate: {
        len: {
          args: [0, 100],
          msg: 'descripción permite entre 1 y 100 caracteres'
        }
      }
    },
    estado: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      validate: {
        isIn: {
          args: [['true', 'false']],
          msg: 'Solo se permiten valores booleanos'
        }
      }
    },
    id_tipo_oferta: {
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
    modelName: 'ofertas'
  });
  return ofertas;
};
