const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./config/database");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const multer = require("multer"); // Import multer
require('dotenv').config();

// Routes
const authRouter = require("./routes/authRoutes");
const imageRoutes = require("./routes/imageRoutes");
const staffRoutes = require("./routes/staffRoutes");
const deviceRoutes = require("./routes/devicesRoutes");
const airtimeRoutes = require("./routes/airtimeRoutes");
const packagesRoutes = require("./routes/packagesRoutes");
const contractsRoutes = require("./routes/contractsRoutes");
const handsetsRoutes = require("./routes/handsetsRoutes");
const excelFileUploadRoute = require("./routes/excelFIleUploadRoute");

const app = express();


app.use(bodyParser.json([imageRoutes.options, excelFileUploadRoute.options]));
app.use(cookieParser());

app.use(cors(
//   {
//   origin: "http://localhost:4000",
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   credentials: true
// }
)
);

// Define storage and upload options for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Specify the directory where uploaded files will be stored
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Defining the routes

//authentication API Calls
app.use("/auth", authRouter);

// Staff API Calls
app.use("/staffmember", staffRoutes);

// Device API Calls
app.use("/devices", deviceRoutes);

// Airtime API Calls
app.use("/airtime", airtimeRoutes);

// Package API Calls
app.use("/packages", packagesRoutes);

// Handset API Calls
app.use("/handsets", handsetsRoutes);

// Contract API Calls
app.use("/contracts", contractsRoutes);

// Profile Picture API Calls
app.use("/image", imageRoutes);

// Excel API Calls
app.use('/excel', excelFileUploadRoute);

// Error handling middleware
app.use((error, req, res, next) => {
  console.error(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

sequelize.options.logging = console.log;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

sequelize.sync()
  .then(() => {
    console.log("Database connected");
  })
  .catch((error) => {
    console.error('Error synchronizing database:', error);
  })

// Start the server
const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
