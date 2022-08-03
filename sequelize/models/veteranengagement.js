'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class VeteranEngagement extends Model {
    static associate(models) { }
  };
  VeteranEngagement.init({
    VeteranId: {type: DataTypes.UUID, primaryKey:true, allowNull:false},
    Engagement: {type: DataTypes.STRING(256)},
    SortOrder: {type: DataTypes.INTEGER, primaryKey:true, allowNull: false}
  }, {
    sequelize,
    modelName: 'VeteranEngagement',
    freezeTableName: true,
    timestamps: false,
  });

  return VeteranEngagement;
};