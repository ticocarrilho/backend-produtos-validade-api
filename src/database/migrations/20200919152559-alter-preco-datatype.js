'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('produtos', 'preco', {
      type: Sequelize.DECIMAL(10, 2),
      allowNull:false
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('produtos', 'preco', {
      type: Sequelize.DECIMAL(10, 4),
      allowNull:false
    });
  }
};
