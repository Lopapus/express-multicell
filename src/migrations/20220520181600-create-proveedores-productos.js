'use strict';
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('proveedores_productos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_proveedor: {
        type: Sequelize.INTEGER(3),
        allowNull: false,
        references: {
          model: 'proveedores',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      id_producto: {
        type: Sequelize.INTEGER(3),
        allowNull: false,
        references: {
          model: 'productos',
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
    await queryInterface.dropTable('proveedores_productos');
  }
};
