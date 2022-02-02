'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class puntaje extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      puntaje.belongsTo(models.usuario,
        {
          as: 'usuario',
          foreignKey: 'usuario_id'
        }
      );
    }
  }
  puntaje.init({
    juego: DataTypes.STRING,
    puntos: DataTypes.INTEGER,
    usuario_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'puntaje'
  });
  return puntaje;
};
