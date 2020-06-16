const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db");

class Product extends Model {}

Product.init(
  {
    title: {
      type: DataTypes.STRING(30),
    },
    price: {
      type: DataTypes.INTEGER,
    },
    img: {
      type: DataTypes.BLOB,
    },
  },
  {
    sequelize,
    modelName: "product",
  }
);

module.exports = Product;
