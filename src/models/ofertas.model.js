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
      ofertas.belongsTo(models.detalle_ofertas,
        {
          as: 'detalle_ofertas',
          foreignKey: 'id_detalle_oferta'
        }
      );
    }
  }
  ofertas.init({
    precio_oferta: {
      type: DataTypes.INTEGER,
      defaultValue: null,
      validate: {
        isNumeric: {
          arg: true,
          msg: 'El precio de oferta solo debe contener números'
        }
      }
    },
    descripcion: {
      type: DataTypes.STRING,
      defaultValue: ''
    }
  }, {
    sequelize,
    modelName: 'ofertas'
  });
  return ofertas;
};
