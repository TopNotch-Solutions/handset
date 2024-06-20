import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { ColorModeContext, useMode } from "./theme";
import { useDispatch } from 'react-redux';
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route, useLocation } from "react-router-dom";
import PrivateRoutes from "./routes/privateRoutes.js";
import {login} from "./store/reducers/authReducer.js";

// Components
import Topbar from "./components/global/Topbar";
import Sidebar from "./components/global/Sidebar.jsx";

// Common Pages
import Login from "./pages/global/login/Login.jsx";
import Breadcrumb from "./components/global/Breadcrumb";

function App() {
  const [theme, colorMode] = useMode();
  const location = useLocation();
  const dispatch = useDispatch();
  const isLoginPage = location.pathname === "/";

  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  // useEffect(() => {
    
  //   dispatch(
  //     login({
  //       user: 'admin',
  //       role: 'admin',
  //     })
  //   );
  // }, [dispatch]);

  return (
    <ColorModeContext.Provider value={{ ...colorMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {!isLoginPage && (
            <Sidebar
              openSidebarToggle={openSidebarToggle}
              OpenSidebar={OpenSidebar}
            />
          )}
          <main className="content">
            {!isLoginPage && <Topbar OpenSidebar={OpenSidebar} />}
            <Breadcrumb />
            <Routes>
              {/* Global Routes */}
              <Route path="/" element={<Login />} />
             {PrivateRoutes()}
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
