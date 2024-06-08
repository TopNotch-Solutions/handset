import { React, useState, useRef } from "react";
import { Box, Button } from "@mui/material";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import DescriptionSharpIcon from "@mui/icons-material/DescriptionSharp";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaCloudUploadAlt, FaFileExcel, FaEdit, FaSave } from "react-icons/fa";
import "../../../assets/style/admin/fileUpload.css";
import { tokens } from "../../../theme";
import { useTheme } from "@emotion/react";
import CloseButton from "react-bootstrap/CloseButton";
import axios from "axios";
import * as XLSX from "xlsx";
import { DataGrid } from "@mui/x-data-grid";
import ExportButton from "../../../components/admin/ExportButton";

const AdminUploadPage = () => {
  const theme = useTheme();
  const inputRef = useRef();

  const [selectedFile, setSelectedFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState("select");
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const allowedExtensions = /(\.xls|\.xlsx)$/i;
      const validMimeTypes = [
        "application/vnd.ms-excel", // .xls
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" // .xlsx
      ];

      if (!allowedExtensions.exec(file.name)) {
        setError("Please upload a valid Excel file with .xls or .xlsx extension.");
        setSelectedFile(null);
        return;
      }

      if (!validMimeTypes.includes(file.type)) {
        setError("The file type does not match an Excel file. Please upload a valid Excel file.");
        setSelectedFile(null);
        return;
      }

      setError("");
      setSelectedFile(file);
    }
  };

  const onChooseFile = () => {
    inputRef.current.click();
  };

  const clearFileInput = () => {
    inputRef.current.value = "";
    setSelectedFile(null);
    setProgress(0);
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
            setProgress(percentageCompleted); // Update the progress state
          }
        }
      );

      setUploadStatus("done");
    } catch (err) {
      console.error("Upload failed:", err); // Log the error for debugging
      setUploadStatus("select");
    }
  };

  return (
    <div className="col-11 col-sm-10 col-md-10 col-lg-9 col-xl-8 col-xxl-5 d-flex flex-column justify-content-center align-items-center m-auto rounded-3 p-2 p-sm-4 shadow b-g">
      <h1 className="pt-3 fw-bold h3">Upload</h1>
      <div
        className="mt-4 d-flex flex-column justify-content-center align-items-center"
        style={{ width: "100%" }}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".xls,.xlsx"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />

        <>
          <button className="file-btn m-3 m-sm-4" onClick={onChooseFile}>
            <CloudUploadIcon sx={{ fontSize: 40, color: "#1674BB" }} />
            <p>
              {" "}
              Drag & drop files or <span className="blue-text">Browse</span>
            </p>
            <p className="under-text"> Supported format: XLSX</p>
          </button>
        </>

        {error && <p className="error-text mt-4 mb-4 error-text text-center">{error}</p>}

        {selectedFile && (
          <>
            <div className="file-card">
              <DescriptionSharpIcon className="icon" />
              <div className="file-info">
                <div style={{ flex: 1 }}>
                  <h6>{selectedFile.name}</h6>
                  <div className="progress-bg">
                    <div
                      className="progress"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>

                <button onClick={clearFileInput} className="close-icon">
                  <CloseButton />
                </button>
              </div>
            </div>

            <button className="upload-btn mb-3" onClick={handleFileUpload}>
              {uploadStatus === "select" || uploadStatus === "uploading"
                ? "Upload File"
                : "Done"}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminUploadPage;
