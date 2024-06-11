import React, { useState, useRef, useEffect } from "react";
import "../../../assets/style/admin/profileCard.css";
import profile from "../../../assets/Img/blank-profile-picture-973460_960_720.webp";
import { Typography, useTheme } from "@mui/material";
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { Box, IconButton } from "@mui/material";
import { tokens } from "../../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";

function AdminProfileCard() {
  const [userDetails, setUserDetails] = useState([]);
  const theme = useTheme();
  const inputRef = useRef();
  const colors = tokens(theme.palette.mode);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("select");
  const [error, setError] = useState("");

  const [user, setUser] = useState({
    photo: profile,
    FirstName: "",
    LastName: "",
    Position: "",
    Email: "",
    PhoneNumber: "",
    ResidentialAddress: "",
    Gender: "",
    Department: "",
  });

  const [data, setData] = useState([]);
  const [employeeData, setEmployeeData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/devices")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.log(err));

    // fetch("http://localhost:3001/staffmember")
    //   .then((res) => res.json())
    //   .then((data) => setEmployeeData(data))
    //   .catch((err) => console.log(err));
  }, []);

  const columns = [
    { field: "id", headerName: "#", width: 50 },
    { field: "HandsetName", headerName: "NAME", width: 490 },
    { field: "Role", headerName: "ROLE", width: 390 },
    { field: "CreatedDate", headerName: "DATE ADDED", width: 180 }
  ];

  const rows = data.map((handset, index) => {
    return {
      id: index + 1, // Use the index as ID
      HandsetName: handset.HandsetName,
      Role: handset.Role,
      CreatedDate: handset.CreatedDate
    };
  });

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
      const validMimeTypes = [
        "image/jpeg", // .jpg and .jpeg
        "image/png"   // .png
      ];

      if (!allowedExtensions.exec(file.name)) {
        setError("Please upload a valid image file with .jpg, .jpeg, or .png extension.");
        setSelectedFile(null);
        return;
      }

      if (!validMimeTypes.includes(file.type)) {
        setError("The file type does not match an image file. Please upload a valid image file.");
        setSelectedFile(null);
        return;
      }

      setError("");
      setSelectedFile(file);
      setUser((prevUser) => ({
        ...prevUser,
        photo: URL.createObjectURL(file)
      }));
    }
  };

  const clearFileInput = () => {
    inputRef.current.value = "";
    setSelectedFile(null);
    setUser((prevUser) => ({
      ...prevUser,
      photo: profile
    }));
    setUploadStatus("select");
    setError("");
  };

  const handleFileUpload = async () => {
    if (uploadStatus === "done") {
      clearFileInput();
      return;
    }

    try {
      setUploadStatus("uploading");

      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await axios.post(
        "http://localhost:8080/upload",
        formData,
        {
          onUploadProgress: (progressEvent) => {
            const percentageCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
          }
        }
      );

      setUploadStatus("done");
    } catch (err) {
      console.error("Upload failed:", err);
      setUploadStatus("select");
    }
  };

  const handleCameraClick = () => {
    inputRef.current.click();
  };

  return (
    <div className="container-main m-3">
      <div className="row d-flex flex-column flex-md-row justify-content-around m-auto">
        <div className="col-12  col-lg-5 rounded-3 shadow p-4 d-flex flex-column justify-content-center align-items-center b-g me-3">
          <div className="position-relative">
            <div className="bg-white rounded-circle position-absolute camera-top d-flex align-items-center justify-content-center" style={{ width: '30px', height: '30px' }} onClick={selectedFile ? clearFileInput : handleCameraClick}>
              {selectedFile ? <CloseIcon style={{ width: '24px', height: '24px', color: '#1674BB' }} /> : <CameraAltIcon style={{ width: '24px', height: '24px', color: '#1674BB' }} />}
            </div>
            <img
              src={user.photo}
              className="circular-image img-responsive img-thumbnail"
              alt=""
            />
            <input
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              ref={inputRef}
              onChange={handleFileChange}
            />
          </div>
          {error && <p className="error-text mt-4 mb-4 error-text text-center">{error}</p>}
          {selectedFile && (
            <>
              <button className="upload-btn mb-3" onClick={handleFileUpload}>
                {uploadStatus === "select" || uploadStatus === "uploading"
                  ? "Upload Image"
                  : "Done"}
              </button>
            </>
          )}
          <h3 className="mt-2 text-center">Immanuel Namuhuja</h3>
          <p>Software Developer</p>
        </div>
        <div className="col-12 col-lg-6 rounded-3 shadow b-g mt-3 mt-lg-0 me-3 " style={{ padding: 0 }}>
          <div className="bg-color d-flex align-items-center p-3" style={{ borderRadius: '0.35rem 0.35rem 0rem 0rem' }}>
            <h3 className="p-3 text-col">Edit Profile</h3>
            <div className="bg-white rounded-circle camera-top d-flex align-items-center justify-content-center mb-4" style={{ width: '24px', height: '24px' }} onClick={clearFileInput}>
              <EditIcon style={{ width: '16px', height: '16px', color: '#1674BB' }} />
            </div>
          </div>
          <form className="mt-3">
            <div className="row d-flex justify-content-around">
              <div className="col-5">
                <label htmlFor="exampleInputEmail1">First Name</label>
                <InputGroup className="mb-3">
                  <Form.Control
                    aria-label="firstname"
                    aria-describedby="basic-addon1"
                    type="text"
                    id="firstname"
                    name="firstname"
                    value={user.FirstName}
                    disabled
                  />
                </InputGroup>
              </div>
              <div className="col-5">
                <label htmlFor="exampleInputEmail1">Surname</label>
                <InputGroup className="mb-3">
                  <Form.Control
                    aria-label="surname"
                    aria-describedby="basic-addon1"
                    type="text"
                    id="surname"
                    name="surname"
                    value={user.LastName}
                    disabled
                  />
                </InputGroup>
              </div>
            </div>
            <div className="row d-flex justify-content-around">
              <div className="col-5">
                <label htmlFor="exampleInputEmail1">Email Address</label>
                <InputGroup className="mb-3">
                  <Form.Control
                    aria-label="email"
                    aria-describedby="basic-addon1"
                    type="text"
                    id="email"
                    name="email"
                    value={user.Email}
                    disabled
                  />
                </InputGroup>
              </div>
              <div className="col-5">
                <label htmlFor="exampleInputEmail1">Mobile Number</label>
                <InputGroup className="mb-3">
                  <Form.Control
                    aria-label="mobile"
                    aria-describedby="basic-addon1"
                    type="text"
                    id="mobile"
                    name="mobile"
                    value={user.PhoneNumber}
                    disabled
                  />
                </InputGroup>
              </div>
            </div>
            <div className="row d-flex justify-content-around">
              <div className="col-5">
                <label htmlFor="exampleInputEmail1">Address</label>
                <InputGroup className="mb-3">
                  <Form.Control
                    aria-label="address"
                    aria-describedby="basic-addon1"
                    type="text"
                    id="address"
                    name="address"
                    value={user.ResidentialAddress}
                    disabled
                  />
                </InputGroup>
              </div>
              <div className="col-5">
                <label htmlFor="exampleInputEmail1">Gender</label>
                <InputGroup className="mb-3">
                  <Form.Control
                    aria-label="gender"
                    aria-describedby="basic-addon1"
                    type="text"
                    id="gender"
                    name="gender"
                    value={user.Gender}
                    disabled
                  />
                </InputGroup>
              </div>
            </div>

            <div className="row d-flex justify-content-start p-4">
              <button
                type="button"
                className="button2"
              // onClick={handleUpdateInfo}
              >
                Update Info
              </button>
            </div>
          </form>
        </div>
      </div>
      <div>
      <div className="m-1 m-sm-3">
      <Box
          m="40px 0 0 0"
          height="100%"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .name-column--cell": {
              color: colors.greenAccent[300],
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: colors.grey[900],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: colors.primary[400],
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
              backgroundColor: colors.grey[900],
            },
            "& .MuiCheckbox-root": {
              color: `${colors.greenAccent[200]} !important`,
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: `${colors.grey[100]} !important`,
            },
          }}
        >
          
          <Box>
          Allocation
            <IconButton>
              <DownloadOutlinedIcon
                sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
              />
            </IconButton>
          </Box>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 20]}
            checkboxSelection
            disableSelectionOnClick
            // onRowClick={handleRowClick}
          />
        </Box>
      </div>
      </div>
    </div>
  );
}

export default AdminProfileCard;