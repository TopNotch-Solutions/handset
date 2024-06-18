const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Contracts = sequelize.define(
  "contracts",
  {
    ContractNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    EmployeeCode: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "employees",
        key: "EmployeeCode",
      },
    },
    PackageID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "packages",
        key: "PackageID",
      },
    },
    FixedAssetCode: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "devices",
        key: "FixedAssetCode",
      },
    },
    MSISDN: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    MonthlyPayment: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    SubscriptionStatus: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    BillingDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    ContractDuration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ContractStartDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    ContractEndDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

Contracts.associate = (models) => {
  Contracts.belongsTo(models.Staff, {
    foreignKey: "EmployeeCode",
    sourceKey: "EmployeeCode",
  });
  Contracts.belongsTo(models.Devices, {
    foreignKey: "FixedAssetCode",
    targetKey: "FixedAssetCode",
  });
};

module.exports = Contracts;
