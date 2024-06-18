const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Handsets = sequelize.define(
    "handsets",
    {
        FixedAssetCode: {
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
        HandsetName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        AllocationDate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        MobileHomePrice: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        HandsetPayment: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        AllocationCheck: {
            type: DataTypes.STRING,
            allowNull: false,
        },
});

module.exports = Handsets