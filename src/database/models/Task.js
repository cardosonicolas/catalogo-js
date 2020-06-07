const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db");

class Task extends Model {}

Task.init(
  {
    title: { type: DataTypes.STRING(30) },
    price: { type: DataTypes.STRING(30) },
    img: {
      type: DataTypes.BLOB,
    },
  },
  {
    sequelize,
    modelName: "Task",
  }
);

module.exports = Task;
