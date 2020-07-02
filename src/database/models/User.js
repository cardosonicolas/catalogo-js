const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db");
const Product = require("./Product")

class User extends Model {}

User.init(
  {
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "users",
  }
);
User.hasMany(Product, {
  foreignKey: "userId"
});
Product.belongsTo(User);
module.exports = User;
