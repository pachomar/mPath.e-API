'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserRole extends Model {
    static associate(models) { }
  };
  UserRole.init({
    UserId: {type: DataTypes.UUID, primaryKey:true, unique:true, allowNull:false}, 
    IsContributor: {type: DataTypes.BOOLEAN, defaultValue:false, allowNull: false}, 
    IsProctor: {type: DataTypes.BOOLEAN, defaultValue:false, allowNull: false},
    IsAdministrator: {type: DataTypes.BOOLEAN, defaultValue:false, allowNull: false}
  }, {
    sequelize,
    modelName: 'UserRole',
    freezeTableName: true,
    timestamps: false,
  });
  
  return UserRole;
};