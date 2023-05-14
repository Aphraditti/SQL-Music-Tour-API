'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  event.init({
    event_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
   event_start_time: {
    type: DataTypes.DATE,
    allowNull: false
   },
   event_end_time: {
    type: DataTypes.DATE,
    allowNull: false
   }
  }, {
    sequelize,
    modelName: 'event',
    tableName: 'event',
    timestamps: false
  });
  return event;
};