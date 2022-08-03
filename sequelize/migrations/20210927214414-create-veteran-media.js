'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('VeteranMedia', {
      VeteranId: {type: Sequelize.UUID, primaryKey:true, allowNull:false},
      IsProfile: {type: Sequelize.BOOLEAN},
      Comments: {type: Sequelize.STRING(256)},
      Tags: {type: Sequelize.STRING(256)},
      ImageSrc: {type: Sequelize.TEXT('long')},
      SortOrder: {type: Sequelize.INTEGER, primaryKey:true, allowNull:false},
      Height: {type: Sequelize.INTEGER },
      Width: {type: Sequelize.INTEGER }
    });
    await queryInterface.addConstraint('VeteranMedia', {
      fields: ['VeteranId'], type: 'foreign key', references: { table: 'VeteranInfo', field: 'VeteranId'}, onDelete: 'cascade'
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('VeteranMedia');
  }
};