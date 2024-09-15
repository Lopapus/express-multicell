'use strict';
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('subcategorias', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(3)
      },
      nombre: {
        type: Sequelize.STRING(25)
      },
      estado: {
        type: Sequelize.INTEGER(1),
        allowNull: false
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
    await queryInterface.dropTable('subcategorias');
  }
};
