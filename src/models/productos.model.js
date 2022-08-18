'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class productos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      productos.belongsTo(models.categorias,
        {
          as: 'categoria',
          foreignKey: 'id_categoria'
        }
      );
      productos.belongsTo(models.subcategorias,
        {
          as: 'subcategoria',
          foreignKey: 'id_subcategoria'
        }
      );
      productos.belongsTo(models.marcas,
        {
          as: 'marca',
          foreignKey: 'id_marca'
        }
      );
      productos.belongsToMany(models.proveedores, {
        as: 'proveedores',
        foreignKey: 'id_producto',
        through: {
          model: models.proveedores_productos
        }
      });
    }
  }
  productos.init({
    modelo: {
      type: DataTypes.STRING,
      defaultValue: null,
      validate: {
        len: {
          args: [0, 35],
          msg: 'Solo se permite hasta 35 caracteres en el modelo'
        }
      }
    },
    precio: {
      type: DataTypes.FLOAT,
      validate: {
        isNumeric: {
          arg: true,
          msg: 'El precio solo permite números'
        }
      }
    },
    observaciones: {
      type: DataTypes.STRING,
      defaultValue: null,
      validate: {
        len: {
          args: [0, 100],
          msg: 'observaciones permite entre 1 y 100 caracteres'
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        isNumeric: {
          arg: true,
          msg: 'El stock debe contener números'
        },
        len: {
          args: [1, 3],
          msg: 'El stock permite entre 1 y 3 caracteres'
        }
      }
    },
    stock_min: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        isNumeric: {
          arg: true,
          msg: 'El stock debe contener números'
        },
        len: {
          args: [1, 3],
          msg: 'El stock permite entre 1 y 3 caracteres'
        }
      }
    },
    imei: {
      type: DataTypes.STRING,
      defaultValue: null,
      validate: {
        len: {
          args: [0, 20],
          msg: 'El imei permite un máximo de 20 caracteres'
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
    fecha_ingreso: {
      type: DataTypes.NOW,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    codigo_barras: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [0, 14],
          msg: 'El codigo de barras solo permite un máximo de 14 caracteres'
        }
      }
    },
    id_categoria: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: {
          arg: true,
          msg: 'Solo se permiten números'
        }
      }
    },
    id_subcategoria: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: {
          arg: true,
          msg: 'Solo se permiten números'
        }
      }
    },
    id_marca: {
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
    modelName: 'productos'
  });
  return productos;
};
