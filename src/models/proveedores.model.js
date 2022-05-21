'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class proveedores extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      proveedores.belongsToMany(models.productos, {
        as: 'productos',
        foreignKey: 'id_proveedor',
        through: {
          model: models.proveedores_productos
        }
      });
    }
  }
  proveedores.init({
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'El nombre es obligatorio'
        },
        isAlpha: {
          msg: 'El nombre no puede contener números'
        },
        len: {
          args: [5, 15],
          msg: 'El nombre debe contener entre 5 y 15 caracteres'
        }
      }
    },
    cuit: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'El cuit es obligatorio'
        },
        isNumeric: {
          args: true,
          msg: 'El cuit no puede contener texto'
        },
        len: {
          args: [11, 11],
          msg: 'El cuit debe contener 11 caracteres'
        }
      },
      unique: {
        args: true,
        msg: 'El cuit ingresado ya existe'
      }
    },
    lugar: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: {
          args: [5, 100],
          msg: 'El lugar debe contener entre 5 y 100 caracteres'
        }
      }
    },
    telefono: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isNumeric: {
          args: true,
          msg: 'El número de telefono no puede contener letras'
        },
        len: {
          args: [10, 15],
          msg: 'El telefono debe contener entre 10 y 15 caracteres'
        }
      }
    },
    correo: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isEmail: {
          args: true,
          msg: 'El correo ingresado no es valido'
        },
        len: {
          args: [5, 50],
          msg: 'El nombre debe contener entre 5 y 50 caracteres'
        }
      }
    },
    inscripto: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    estado: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'proveedores'
  });
  return proveedores;
};
