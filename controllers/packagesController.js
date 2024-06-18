const sequelize = require("../config/database");
const Packages = require("../models/Packages");

exports.getPackages = async (req, res) => {
  try {
    const packages = await Packages.findAll();
    res.status(200).json(packages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getPackageList = async (req, res) => {
  try {
    const staffPackages = await sequelize.query(
      `SELECT PackageName, MonthlyPrice FROM packages`,
      { type: sequelize.QueryTypes.SELECT }
    );
    res.status(200).json(staffPackages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error:", error });
  }
};


exports.getPackageById = async (req, res) => {
  try {
    const package = await Packages.findByPk(req.params.id);
    if (!package) {
      return res.status(404).json({ message: "Package not found" });
    }
    res.json(package);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  } 
};


