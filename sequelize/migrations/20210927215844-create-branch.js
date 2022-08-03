'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Branch', {
      BranchId: {type: Sequelize.INTEGER, primaryKey:true, allowNull:false},
      Name: {type: Sequelize.STRING(100)},
      Image: {type: Sequelize.TEXT},
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Branch');
  }
};