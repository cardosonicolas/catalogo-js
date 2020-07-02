const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db");

class Product extends Model {}

Product.init(
  {
    title: {
      type: DataTypes.STRING(30),
    },
    price: {
      type: DataTypes.DECIMAL(),
    },
    description: {
      type: DataTypes.STRING,
    },
    imageUrl: {
      type: DataTypes.STRING(),
      defaultValue: "http://placehold.it/250",
    },
    publicId: {
      type: DataTypes.STRING(),
    },
  },
  {
    sequelize,
    modelName: "products",
  }
);

module.exports = Product;
