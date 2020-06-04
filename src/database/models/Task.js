const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db");

class Task extends Model { }

Task.init(
  {
    title: { type: DataTypes.STRING },
    price: { type: DataTypes.STRING }
  },
  {
    sequelize,
    modelName: "Task",
  });

module.exports = Task;
