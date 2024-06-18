const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Airtime = sequelize.define(
  "airtime_benefits",
  {
    AirtimeID: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    EmployeeCode: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: "employees",
            key: "EmployeeCode",
        }
    },
    AirtimeAmount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    SMS: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Seconds:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    Data: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    TopUpDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    AllocationCheck: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Airtime;
