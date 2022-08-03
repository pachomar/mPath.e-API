'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserNotification extends Model {
    static associate(models) { }
  };
  UserNotification.init({
    UserId: {type: DataTypes.UUID, primaryKey:true, unique:true, allowNull:false}, 
    PushActive: {type: DataTypes.BOOLEAN, defaultValue: true }, 
    FeedActive: {type: DataTypes.BOOLEAN, defaultValue: true },
    EventActive: {type: DataTypes.BOOLEAN, defaultValue: true }
  }, {
    sequelize,
    modelName: 'UserNotification',
    freezeTableName: true,
    timestamps: false,
  });
  
  return UserNotification;
};