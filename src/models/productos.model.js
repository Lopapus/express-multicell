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
          as: 'categorias',
          foreignKey: 'id_categoria'
        }
      );
      productos.belongsTo(models.subcategorias,
        {
          as: 'subcategorias',
          foreignKey: 'id_subcategoria'
        }
      );
      productos.belongsTo(models.marcas,
        {
          as: 'marcas',
          foreignKey: 'id_marca'
        }
      );
      productos.belongsTo(models.modelos,
        {
          as: 'modelos',
          foreignKey: 'id_modelo'
        }
      );
    }
  }
  productos.init({
    precio: {
      type: DataTypes.FLOAT,
      validate: {
        isAlpha: {
          arg: false,
          msg: 'El precio solo permite números'
        }
      }
    },
    facturado: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      validate: {
        isNull: {
          arg: false,
          msg: 'Debe seleccionar si el producto es factura'
        }
      }
    },
    observaciones: {
      type: DataTypes.STRING,
      defaultValue: null,
      validate: {
        min: {
          arg: 2,
          msg: 'En observaciones debe ingresar un mínimo de dos caracteres'
        },
        max: {
          arg: 100,
          msg: 'En observaciones se permite un máximo de 100 caracteres'
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        isAlpha: {
          arg: false,
          msg: 'El stock debe contener números'
        },
        max: {
          arg: 3,
          msg: 'El stock permite un máximo de 3 caracteres'
        }
      }
    },
    stock_min: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        isAlpha: {
          arg: false,
          msg: 'El stock mínimo debe contener números'
        },
        max: {
          arg: 3,
          msg: 'El stock permite un máximo de 3 caracteres'
        }
      }
    },
    imei: {
      type: DataTypes.STRING,
      defaultValue: null,
      validate: {
        max: {
          arg: 20,
          msg: 'El imai solo permite un máximo de 20 caracteres'
        }
      }
    },
    estado: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    fecha_ingreso: {
      type: DataTypes.DATE
    },
    codigo_barras: {
      type: DataTypes.STRING,
      validate: {
        max: {
          arg: 14,
          msg: 'El codigo de barras solo permite un máximo de 14 caracteres'
        }
      }
    },
    id_categoria: {
      type: DataTypes.INTEGER,
      validate: {
        max: {
          arg: 3,
          msg: 'Solo se permite un máximo de 3 caracteres'
        }
      }
    },
    id_subcategoria: {
      type: DataTypes.INTEGER,
      validate: {
        max: {
          arg: 3,
          msg: 'Solo se permite un máximo de 3 caracteres'
        }
      }
    },
    id_marca: {
      type: DataTypes.INTEGER,
      validate: {
        max: {
          arg: 3,
          msg: 'Solo se permite un máximo de 3 caracteres'
        }
      }
    },
    id_modelo: {
      type: DataTypes.INTEGER,
      validate: {
        max: {
          arg: 3,
          msg: 'Solo se permite un máximo de 3 caracteres'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'productos'
  });
  return productos;
};
