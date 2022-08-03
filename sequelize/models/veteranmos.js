'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class VeteranMOS extends Model {
    static associate(models) { }
  };
  VeteranMOS.init({
    VeteranId: {type: DataTypes.UUID, primaryKey:true, allowNull:false},
    SortOrder: {type: DataTypes.INTEGER, primaryKey:true, allowNull: false},
    MOSCodeId: {type: DataTypes.INTEGER, allowNull: false},
  }, {
    sequelize,
    modelName: 'VeteranMOS',
    freezeTableName: true,
    timestamps: false,
  });
  
  return VeteranMOS;
};