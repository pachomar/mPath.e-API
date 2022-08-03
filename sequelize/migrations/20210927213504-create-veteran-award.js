'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('VeteranAward', {
      VeteranId: {type: Sequelize.UUID, primaryKey:true, allowNull:false},
      Award: {type: Sequelize.STRING(256)},
      SortOrder: {type: Sequelize.INTEGER, primaryKey:true, allowNull: false}
    });
    await queryInterface.addConstraint('VeteranAward', {
      fields: ['VeteranId'], type: 'foreign key', references: { table: 'VeteranInfo', field: 'VeteranId'}, onDelete: 'cascade'
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('VeteranAward');
  }
};