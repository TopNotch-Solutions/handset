const Contract = require('../models/Contracts');
const sequelize = require('../config/database');
const Employees = require('../models/Staff');

exports.getContracts = async (req, res) => {
    try {
      const contracts = await Contract.findAll();
      res.json(contracts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  exports.getStaffContractById = async (req, res) => {
    try {
      const contracts = await Contract.findAll({
        where: {
          EmployeeCode: req.params.id
        }
      });
      res.json(contracts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

exports.getStaffContracts = async (req, res) => {
  try {
    const staffContracts = await sequelize.query(
      `SELECT c.*, s.FullName, p.PackageName, p.PackageType, d.DeviceName, d.StaffPrice, d.UpfrontPayment, cp.BillingDate
      FROM contracts c
      INNER JOIN employees s ON c.EmployeeCode = s.EmployeeCode
      INNER JOIN packages p ON c.PackageID = p.PackageID
      INNER JOIN devices d ON c.FixedAssetCode = d.FixedAssetCode
      INNER JOIN contract_payments cp ON c.ContractNumber = cp.ContractNumber`,
      
      
      { type: sequelize.QueryTypes.SELECT }
    );
    res.status(200).json(staffContracts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error:", error });
  }
};

