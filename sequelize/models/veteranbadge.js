'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class VeteranBadge extends Model {
    static associate(models) { }
  };
  VeteranBadge.init({
    VeteranId: {type: DataTypes.UUID, primaryKey:true, allowNull:false},
    SortOrder: {type: DataTypes.INTEGER, primaryKey:true, allowNull: false},
    RibbonId: {type: DataTypes.INTEGER, allowNull: false}
  }, {
    sequelize,
    modelName: 'VeteranBadge',
    freezeTableName: true,
    timestamps: false,
  });
  
  return VeteranBadge;
};