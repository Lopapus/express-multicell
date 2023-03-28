'use strict';
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('ofertas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      precio_ofertas: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      descripcion: {
        type: Sequelize.STRING(50)
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
    await queryInterface.dropTable('ofertas');
  }
};
