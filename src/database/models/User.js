const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db");
const Product = require("./Product");
const bcrypt = require("bcryptjs");

class User extends Model {}

User.init(
  {
    name: {
      type: DataTypes.TEXT,
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

    email: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: "No puede contener valores nulos",
        },
        isEmail: {
          args: true,
          msg: "El campo tiene que ser un correo valido",
        },
      },
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
      len: {
        args: [8, 255],
        msg: "Las password tiene que ser entre 8 y 255 caracteres",
      },
      set(valor) {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(valor, salt);
        this.setDataValue("password", hash);
      },
    },
  },
  {
    sequelize,
    modelName: "users",
  }
);

User.hasMany(Product, { as: "publicaciones", foreignKey: "userId" });

Product.belongsTo(User);

module.exports = User;
