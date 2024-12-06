const sequelize = require("../config/database");
const { DataTypes } = require("sequelize");

const UsersModel = sequelize.define(
  "users",
  {
    u_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    uname: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    password: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: sequelize.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: sequelize.NOW,
    },
  },
  {
    tableName: "users",
    timestamps: false,
  }
);

module.exports = UsersModel;
