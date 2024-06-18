const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Devices = sequelize.define(
    "devices",
    {
        FixedAssetCode: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
        },
        DeviceName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        DeviceType: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        AllocationType: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        DeviceCondition: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        AllocationDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        MobileHomePrice: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        StaffPrice: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        UpfrontPayment:{
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        MonthlyPayment: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        PaymentDuration: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        MonthlyPaymentDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        PaymentEndDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        AllocationCheck: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        timestamps: false,
    }
);

Devices.associate = (models) => {
    Devices.hasOne(models.Contracts, {
      foreignKey: "FixedAssetCode",
      sourceKey: "FixedAssetCode",
    });
  };

module.exports = Devices;