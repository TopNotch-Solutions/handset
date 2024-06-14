import React, { useState } from "react";
import "../../../assets/style/login.css";
import logo from "../../../assets/Img/Group 2186.png";
import mtclogo from "../../../assets/Img/image 1.png";
import iphone from "../../../assets/Img/iphone-card-removebg-preview 1.png";
import login180 from "../../../assets/Img/MTC Vouchers_2017_53.34x9 1.png";
import login50 from "../../../assets/Img/MTC Vouchers_2017_53.34x9 3.png";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [passwordShown, setPasswordShown] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const validateForm = () => {
    let valid = true;
    if (!email) {
      setEmailError("Email is required");
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Email address is invalid");
      valid = false;
    }

    if (!password) {
      setPasswordError("Password is required");
      valid = false;
    }
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setEmailError("");
    setPasswordError("");

    if (validateForm()) {
      try {
        const response = await fetch("http://localhost:3002/employee/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Email: email,
            EmployeeCode: password,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          console.log("Login successful", data);
          navigate("/Dashboard");
        } else {
          setEmailError("Invalid credentials");
          setPasswordError("Invalid credentials");
        }
      } catch (error) {
        alert("Network error. Please check your network connection and try again", "Please check your network connection and try again");
      }
    }
  };

  return (
    <div className="">
      <div className=" d-flex vh-100 w-100 ">
        <div className="d-none d-lg-block d-lg-flex col-lg-6 col-xl-7 justify-content-center align-items-center left-box">
          <img
            src={logo}
            alt="Illustration"
            className="img-fluid mtc-logo-login"
          />
        </div>
        <div className="m-auto col-11 col-md-10 col-lg-6 col-xl-5 d-flex flex-column justify-content-center align-items-center">
          <img
            src={mtclogo}
            alt="Illustration"
            className="img-fluid"
            style={{ width: 100, height: 100 }}
          />
          <h6 className="text-header mt-2 mb-3">
            Ambassador Handset & Airtime Benefits System
          </h6>
          <div className="col-12 col-sm-9 col-md-8 col-lg-10 position-relative p-sm-3 mt-3 mt-sm-3">
            <img
              src={login50}
              alt="Illustration"
              className="r150 behide-image img-fluid position-absolute d-none d-sm-block"
            />
            <img
              src={iphone}
              alt="Illustration"
              className="riphone behide-image img-fluid d-none d-sm-block"
            />
            <img
              src={login180}
              alt="Illustration"
              className="r180 behide-image img-fluid position-absolute d-none d-sm-block"
            />
            <div className="p-4 position-relative  p-lg-4 p-xxl-5 rounded-3 bg-white shadow">
              <form onSubmit={handleSubmit}>
                <h3>Sign in to account</h3>
                <p className="pb-md-3">Enter your email & password to login</p>
                <div className="form-group pb-3">
                  <label htmlFor="email" className="pb-2">
                    Email Address
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="example@mtc.com.na"
                    autoComplete="off"
                    name="email"
                    onChange={(e) => {
                      setEmailError("");
                      setEmail(e.target.value);
                    }}
                  />
                  {emailError && (
                    <>
                      <p className="error mt-1">{emailError}</p>
                    </>
                  )}
                </div>
                <div
                  className={`form-group pb-3 position-relative ${
                    emailError ? "error-class" : ""
                  }`}
                >
                  <label htmlFor="password" className="pb-2">
                    Password
                  </label>
                  <input
                    type={passwordShown ? "text" : "password"}
                    className="form-control"
                    id="password"
                    placeholder="***************"
                    autoComplete="off"
                    name="password"
                    onChange={(e) => {
                      setPasswordError("");
                      setPassword(e.target.value);
                    }}
                  />
                  {passwordError && (
                    <>
                      <p className="error mt-1">{passwordError}</p>
                    </>
                  )}
                  <span
                    className={`${
                      passwordError
                        ? "show-password-top"
                        : "show-password mt-1 position-absolute translate-middle-y pr-4"
                    }`}
                    onClick={togglePassword}
                    style={{ cursor: "pointer" }}
                  >
                    {passwordShown ? "hide" : "show"}
                  </span>
                </div>
                <div
                  className={`form-group form-check mb-4 ${
                    passwordError ? "error-class" : ""
                  }`}
                >
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="rememberPassword"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="rememberPassword"
                  >
                    Remember password
                  </label>
                </div>
                <button type="submit" className="submission">
                  Sign in
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
