'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('VeteranOwner', {
      VeteranId: {type: Sequelize.UUID, primaryKey:true, unique:true, allowNull:false},
      UserId: {type: Sequelize.UUID, allowNull:false},
      RelationshipId: {type: Sequelize.INTEGER},
      IsOwn: {type: Sequelize.BOOLEAN, defaultValue:false}, 
      IsHelp: {type: Sequelize.BOOLEAN, defaultValue:false},
      IsOther: {type: Sequelize.BOOLEAN, defaultValue:false}
    });
    await queryInterface.addConstraint('VeteranOwner', {
      fields: ['VeteranId'], type: 'foreign key', references: { table: 'VeteranInfo', field: 'VeteranId'}, onDelete: 'cascade'
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('VeteranOwner');
  }
};