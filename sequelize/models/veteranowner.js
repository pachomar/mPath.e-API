'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class VeteranOwner extends Model {
    static associate(models) { }
  };
  VeteranOwner.init({
    VeteranId: {type: DataTypes.UUID, primaryKey:true, unique:true, allowNull:false},
    UserId: {type: DataTypes.UUID, allowNull:false},
    RelationshipId: {type: DataTypes.INTEGER},
    IsOwn: {type: DataTypes.BOOLEAN, defaultValue:false}, 
    IsHelp: {type: DataTypes.BOOLEAN, defaultValue:false},
    IsOther: {type: DataTypes.BOOLEAN, defaultValue:false}
  }, {
    sequelize,
    modelName: 'VeteranOwner',
    freezeTableName: true,
    timestamps: false,
  });

  return VeteranOwner;
};