const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db");

class Product extends Model {}

Product.init(
  {
    title: {
      type: DataTypes.STRING(30),
      allowNull: false,
      validate: {
        notNull: {
          msg: "No puede contener valores nulos",
        },
        len: {
          args: [4, 20],
          msg: "Debe contener entre 4 y 20 caracteres",
        },
      },
    },

    price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      validate: {
        notNull: {
          msg: "No puede contener valores nulos",
        },
        isNumeric: {
          msg: "Debe ser un valor numero",
        },
      },
    },

    description: {
      type: DataTypes.STRING,
    },

    imageUrl: {
      type: DataTypes.STRING,
      defaultValue: "http://placehold.it/250",
    },

    publicId: {
      type: DataTypes.STRING(),
    },

    state: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    sequelize,
    modelName: "products",
  }
);

module.exports = Product;
