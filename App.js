import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route, useLocation } from "react-router-dom";

// Components
import Topbar from "./components/global/Topbar";
import Sidebar from "./components/admin/Sidebar";

// Admin Pages
import AdminDashboard from "./pages/admin/dashboard/Dashboard.jsx";
import AdminCalendar from "./pages/admin/calendar/Calendar.jsx";
import Employees from "./pages/admin/employees/Employees.jsx";
import AdminLogin from "./pages/admin/login/Login.jsx"; 
import AdminProfileCard from "./pages/admin/profile/Profile.jsx";
import AdminSettings from "./pages/admin/settings/Settings.jsx";
import AdminReports from "./pages/admin/reports/Reports.jsx";
import AdminContracts from "./pages/admin/contracts/Contracts.jsx";
import AdminUploadPage from "./pages/admin/upload/Upload.jsx";
import AdminHandsets from "./pages/admin/handsets/Handsets.jsx";
import StaffDetails from "./pages/admin/staff/StaffDetails";
import Personal from "./pages/admin/staff/Personal";
import AirtimeBenefits from "./pages/admin/staff/AirtimeBenefits";
import HandsetBenefits from "./pages/admin/staff/HandsetBenefits";
import Breadcrumb from "./components/global/Breadcrumb";

// User Pages
// import Support from "./pages/support/Support";

function App() {
  const [theme, colorMode] = useMode();
  const location = useLocation();
  const isLoginPage = location.pathname === "/";

  const [openSidebarToggle, setOpenSidebarToggle]=useState(false);
  const OpenSidebar =() =>{
    setOpenSidebarToggle(!openSidebarToggle);
  }

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 992) {
        window.location.reload();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <ColorModeContext.Provider value={{ ...colorMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {!isLoginPage && <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />}
          <main className="content">
            {!isLoginPage && <Topbar OpenSidebar={OpenSidebar} />}
            <Breadcrumb />
            <Routes>           
              <Route path="/" element={<AdminLogin />} />
              <Route path="/Dashboard" element={<AdminDashboard />} />
              <Route path="/Calendar" element={<AdminCalendar />} /> 
              <Route path="/Employees" element={<Employees />} />
              <Route path="/Handsets" element={<AdminHandsets />} />
              <Route path="/Upload" element={<AdminUploadPage />} />
              <Route path="/Contracts" element={<AdminContracts />} />
              <Route path="/Profile" element={<AdminProfileCard />} />
              <Route path="/Reports" element={<AdminReports />} />
              <Route path="/Settings" element={<AdminSettings />} />
              <Route path="/staffDetails/:employeeCode" element={<StaffDetails />} />
              <Route path="/staffDetails/:employeeCode/personal" element={<Personal />} />
              <Route path="/staffDetails/:employeeCode/handsetBenefits" element={<HandsetBenefits />} />
              <Route path="/staffDetails/:employeeCode/airtimeBenefits" element={<AirtimeBenefits />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
