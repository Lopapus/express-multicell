'use strict';
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('ofertas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(3)
      },
      precio_oferta: {
        type: Sequelize.FLOAT
      },
      descripcion: {
        type: Sequelize.STRING
      },
      estado: {
        type: Sequelize.INTEGER(1)
      },
      id_tipo_oferta: {
        type: Sequelize.INTEGER(3),

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
    await queryInterface.dropTable('ofertas');
  }
};
