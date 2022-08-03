'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserProfile extends Model {
    static associate(models) { }
  };
  UserProfile.init({
    UserId: {type: DataTypes.UUID, primaryKey:true, unique:true, allowNull:false}, 
    FirstName: {type: DataTypes.STRING(56)}, 
    MiddleName: {type: DataTypes.STRING(56)}, 
    MaidenName: {type: DataTypes.STRING(56)}, 
    LastName: {type: DataTypes.STRING(56)}, 
    Suffix: {type: DataTypes.STRING(16)},
    Facebook: {type: DataTypes.STRING(126)},
    Instagram: {type: DataTypes.STRING(126)},
    Linkedin: {type: DataTypes.STRING(126)},
    Twitter: {type: DataTypes.STRING(126)},
    SecurityPin: {type: DataTypes.STRING(4)},
    UserImage: {type: DataTypes.TEXT('long')} 
  }, {
    sequelize,
    modelName: 'UserProfile',
    freezeTableName: true,
    timestamps: false,
  });
  
  return UserProfile;
};