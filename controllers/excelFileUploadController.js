const multer = require("multer");
const XLSX = require("xlsx");
const db = require("../config/database");

const upload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });

    let columnNames = null;
    for (const row of data) {
      if (row.some((cell) => cell !== null && cell !== "")) {
        columnNames = row;  // Extract the column headers from the first row 
        break;
      }
    }

    if (!columnNames) {
      console.error("No non-empty row found to extract column names.");
      return res.status(400).json({ message: "No column names found" });
    }

    const columnMappings = {
      employees: {
        "Employee Code": "EmployeeCode",
        "Active/Inactive": "EmploymentStatus ",
        "Full Names": "FirstName",
        "Surname": "LastName",
        "Joined Name & Surname": "FullName",
        "Position": "Position",
        "Post/Pre": "ServicePlan",
        "Cell number": "PhoneNumber",

        "Last Name": "LastName",
        "First Name": "FirstName",
        "Cellphone": "PhoneNumber",
        "Department": "Department",
      },
      airtimebenefits: {
        "Employee Code": "EmployeeCode",
        "Total Airtime Allowance": "AirtimeAmount",
      },
      contracts: {
        "Employee Code": "EmployeeCode",
        "Contract 1": "PackageName",
        "Contract 2": "PackageName",
        "Contract 3": "PackageName",
        "Contract 4": "PackageName",
        "Option MSISDN": "MSISDN",
      },
    };

    for (const row of data.slice(1)) {
      if (row.every((cell) => cell === null || cell === "")) {
        continue; // Skip entirely empty rows
      }

      // const columnNames = data[0]; // Extract the column headers from the first row
      const tableName = getTableName(row, columnMappings, columnNames);
      if (!tableName) {
        console.error("No table found for row:", row);
        continue;
      }

      console.log("Table name for row:", tableName);

      const columns = Object.keys(columnMappings[tableName]);
      const values = row.slice(0, columns.length); // Extract values corresponding to mapped columns
      const query = `INSERT INTO ${tableName} (${columns.join(
        ", "
      )}) VALUES (${values.map(() => "?").join(", ")})`;
      await db.query(query, values);
    }

    res
      .status(200)
      .json({ message: "File uploaded and data inserted into the database" });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Function to determine the table name based on the first column value
const getTableName = (row, columnMappings, columnNames) => {
  for (const columnName of columnNames) {
    const mappings = columnMappings[columnName];
    if (mappings && row.includes(columnName)) {
      return Object.keys(mappings)[0]; // Assuming each column has only one mapping
    }
  }
  return null; // Table not found
};

module.exports = { upload };
