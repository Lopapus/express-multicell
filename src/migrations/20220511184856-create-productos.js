'use strict';
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('productos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(3)
      },
      modelo: {
        type: Sequelize.STRING(35)
      },
      precio: {
        type: Sequelize.FLOAT
      },
      observaciones: {
        type: Sequelize.STRING(100)
      },
      stock: {
        type: Sequelize.INTEGER(3)
      },
      stock_min: {
        type: Sequelize.INTEGER(3)
      },
      imei: {
        type: Sequelize.STRING(20)
      },
      estado: {
        type: Sequelize.BOOLEAN
      },
      fecha_ingreso: {
        allowNull: false,
        type: Sequelize.DATE
      },
      codigo_barras: {
        type: Sequelize.STRING(3)
      },
      id_categoria: {
        type: Sequelize.INTEGER(3),
        references: {
          model: 'categorias',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      id_subcategoria: {
        type: Sequelize.INTEGER(3),
        references: {
          model: 'subcategorias',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      id_marca: {
        type: Sequelize.INTEGER(3),
        references: {
          model: 'marcas',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('productos');
  }
};
