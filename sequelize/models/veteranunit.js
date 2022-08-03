'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class VeteranUnit extends Model {
    static associate(models) { }
  };
  VeteranUnit.init({
    VeteranId: {type: DataTypes.UUID, primaryKey:true, allowNull:false},
    Unit: {type: DataTypes.STRING(256)},
    SortOrder: {type: DataTypes.INTEGER, primaryKey:true, allowNull: false}
  }, {
    sequelize,
    modelName: 'VeteranUnit',
    freezeTableName: true,
    timestamps: false,
  });
  
  return VeteranUnit;
};