'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('UserNotification', {
      UserId: {type: Sequelize.UUID, primaryKey:true, unique:true }, 
      PushActive: {type: Sequelize.BOOLEAN, defaultValue: true }, 
      FeedActive: {type: Sequelize.BOOLEAN, defaultValue: true},
      EventActive: {type: Sequelize.BOOLEAN, defaultValue: true}
    });
    await queryInterface.addConstraint('UserNotification', {
      fields: ['UserId'], type: 'foreign key', references: { table: 'UserLogin', field: 'UserId'}, onDelete: 'cascade'
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('UserNotification');
  }
};