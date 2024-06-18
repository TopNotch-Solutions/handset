const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Packages = sequelize.define(
  "packages",
  {
    PackageID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    PackageName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    PackageType: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    PaymentPeriod: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    MonthlyPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Packages;
