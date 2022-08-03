'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('VeteranBadge', {
      VeteranId: {type: Sequelize.UUID, primaryKey:true, allowNull:false},
      SortOrder: {type: Sequelize.INTEGER, primaryKey:true, allowNull: false},
      RibbonId: {type: Sequelize.INTEGER, allowNull: false}
    });
    await queryInterface.addConstraint('VeteranBadge', {
      fields: ['VeteranId'], type: 'foreign key', references: { table: 'VeteranInfo', field: 'VeteranId'}, onDelete: 'cascade'
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('VeteranBadge');
  }
};