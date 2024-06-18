const Staff = require("../models/Staff");
const sequelize = require("../config/database");

// Get all Employees
exports.getStaff = async (req, res) => {
  try {
    const staff = await Staff.findAll();
    res.json(staff);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getStaffById = async (req, res) => {
  try {
    const staff = await Staff.findByPk(req.params.id);
    if (!staff) {
      return res.status(404).json({ message: "Staff not found" });
    }
    res.json(staff);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update Employee Phone Number
exports.updateStaff = async (req, res) => {
  const { EmployeeCode } = req.params;
  const { PhoneNumber, EmploymentCategory, EmploymentStatus, Department } =
    req.body;

  // Check if staff is admin or not
  // const userRequesting = await Staffs.findByPk(req.EmployeeCode);
  // if (!userRequesting || userRequesting.roleName !== "Admin") {
  //   return res.status(401).json({ message: "Unauthorized" });
  // }
  try {
    const staff = await Staff.findByPk(EmployeeCode);
    if (staff) {
      staff.PhoneNumber = PhoneNumber || staff.PhoneNumber;
      staff.EmploymentCategory = EmploymentCategory || staff.EmploymentCategory;
      staff.EmploymentStatus = EmploymentStatus || staff.EmploymentStatus;
      staff.Department = Department || staff.Department;
      await staff.save();
      res.status(200).json(staff);
    } else {
      res.status(404).json({ message: "Staff not found" });
    }
  } catch (error) {
    console.error("Error updating staff:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get Count of Permanent Staff
exports.getPermanentStaff = async (req, res) => {
  try {
    const permanentEmployees = await Staff.count({
      where: {
        EmploymentCategory: "Permanent",
      },
    });
    res.json({ count: permanentEmployees });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get Count of Temporary Staff
exports.getTemporaryStaff = async (req, res) => {
  try {
    const temporaryEmployees = await Staff.count({
      where: {
        EmploymentCategory: "Temporary",
      },
    });
    res.json({ count: temporaryEmployees });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get Count of Active Staff
exports.getActiveStaff = async (req, res) => {
  try {
    const activeEmployees = await Staff.count({
      where: {
        EmploymentStatus: "Active",
      },
    });
    res.json({ count: activeEmployees });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get Count of Inactive Staff
exports.getInactiveStaff = async (req, res) => {
  try {
    const inactiveEmployees = await Staff.count({
      where: {
        EmploymentStatus: "Inactive",
      },
    });
    res.json({ count: inactiveEmployees });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get Count of Male Staff
exports.getMaleStaff = async (req, res) => {
  try {
    const maleEmployees = await Staff.count({
      where: {
        Gender: "Male",
      },
    });
    res.json({ count: maleEmployees });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get Count of Female Staff
exports.getFemaleStaff = async (req, res) => {
  try {
    const femaleEmployees = await Staff.count({
      where: {
        Gender: "Female",
      },
    });
    res.json({ count: femaleEmployees });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get Count of PostPaid Staff
exports.getPostPaidStaff = async (req, res) => {
  try {
    const postPaidEmployees = await Staff.count({
      where: {
        ServicePlan: "PostPaid",
      },
    });
    res.json({ count: postPaidEmployees });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get Count of PrePaid Staff
exports.getPrePaidStaff = async (req, res) => {
  try {
    const prePaidEmployees = await Staff.count({
      where: {
        ServicePlan: "PrePaid",
      },
    });
    res.json({ count: prePaidEmployees });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get Admin Role Staff
exports.getAdmin = async (req, res) => {
  try {
    const adminStaff = await sequelize.query(
      `SELECT e.FullName, e.EmployeeCode, r.RoleName
      FROM employees e 
      INNER JOIN roles r ON e.RoleID = r.RoleID
      WHERE r.RoleName = 'Admin'`,
      { type: sequelize.QueryTypes.SELECT }
    );
    res.status(200).json(adminStaff);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error:", error });
  }
};

// Get Staff with Airtime Allocation
exports.getStaffWithAirtimeAllocation = async (req, res) => {
  try {
    const employeeCode = req.params.id;

    const query = `SELECT e.EmployeeCode, e.AllocationID, e.FullName,  e.PhoneNumber, e.ServicePlan, a.AirtimeAllocation
      FROM employees e 
      INNER JOIN allocation a ON e.AllocationID = a.AllocationID
      WHERE e.EmployeeCode = :employeeCode;`;

    const staffWithAirtimeAllocation = await sequelize.query(query, {
      replacements: { employeeCode },
      type: sequelize.QueryTypes.SELECT,
    });
    res.json(staffWithAirtimeAllocation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error:", error });
  }
};
