const Devices = require("../models/Devices");
const sequelize = require("../config/database");

exports.getDevices = async (req, res) => {
  try {
    const devices = await Devices.findAll();
    res.status(200).json(devices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getHandsets = async (req, res) => {
  try {
    const handset = await Devices.findAll({
      where: {
        AllocationType: "Handset",
      },
    });
    res.json(handset);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getHandsetsByStaff = async (req, res) => {
    try {
        const employeeCode = req.params.employeeCode;

        const query = `
            SELECT d.*, c.MSISDN, p.PackageName
            FROM devices d
            INNER JOIN contracts c ON d.FixedAssetCode = c.FixedAssetCode
            INNER JOIN employees e ON c.EmployeeCode = e.EmployeeCode
            INNER JOIN packages p ON c.PackageID = p.PackageID
            WHERE e.EmployeeCode = :employeeCode
            AND d.AllocationType = 'Handset';
        `;

        const handsets = await sequelize.query(query, {
            replacements: { employeeCode },
            type: sequelize.QueryTypes.SELECT 
        });

        res.json(handsets);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

