'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class meet_greet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  meet_greet.init({
    id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    date: DataTypes.DATE,
    eventId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'meet_greet',
  });
  return meet_greet;
};