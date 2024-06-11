import React, { useState, useEffect } from "react";
import {
  BsHddStackFill,
  BsPhone,
  BsGraphUpArrow,
  BsPeople,
  BsCalendar3Week,
  BsUpload,
  BsColumnsGap,
} from "react-icons/bs";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import CategoryIcon from "@mui/icons-material/Category";
import DevicesIcon from "@mui/icons-material/Devices";
import { RiFilePaper2Line } from "react-icons/ri";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import BarChartIcon from "@mui/icons-material/BarChart";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SettingsIcon from "@mui/icons-material/Settings";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import CloseIcon from "@mui/icons-material/Close";
import "../../assets/style/sidebar.css";
import { Link, NavLink } from "react-router-dom";
// import { useWindowDimensions } from "../../hooks/useWindowDimensions";

const Sidebar = ({ children, openSidebarToggle, OpenSidebar }) => {
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 992);

  const handleResize = () => {
    setIsLargeScreen(window.innerWidth >= 992);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleNavLinkClick = () => {
    if (!isLargeScreen) {
      OpenSidebar();
    }
  };

  return (
    <aside id="sidebar" style={{ width: 278 }} className={openSidebarToggle ? 'sidebar-responsive' : ''}>
      <div className="sidebar-title">
        <div className="sidebar-brand">
          <div className="logo-div">
            <h3 className="title">Ambersphere</h3>
          </div>
        </div>
        <span className="close_icon">
          <CloseIcon onClick={OpenSidebar} style={{ fontSize: '2rem' }}/>
        </span>
      </div>
      <hr className="line"/>
      <ul className="sidebar-list">
        <NavLink to="/Dashboard" onClick={handleNavLinkClick}>
          <li className="sidebar-list-item">
            <DashboardIcon /> Dashboard
          </li>
        </NavLink>
        <NavLink to="/Employees" onClick={handleNavLinkClick}>
          <li className="sidebar-list-item">
            <PeopleAltIcon /> Employees
          </li>
        </NavLink>
        <NavLink to="/Upload" onClick={handleNavLinkClick}>
          <li className="sidebar-list-item">
            <CloudUploadIcon /> File Upload
          </li>
        </NavLink>
        <NavLink to="/Handset" onClick={handleNavLinkClick}>
          <li className="sidebar-list-item">
            <DevicesIcon /> Handset
          </li>
        </NavLink>
        <NavLink to="/HandsetAllocation" onClick={handleNavLinkClick}>
          <li className="sidebar-list-item">
            <CardGiftcardIcon /> Allocations
          </li>
        </NavLink>
        <NavLink to="/Reports" onClick={handleNavLinkClick}>
          <li className="sidebar-list-item">
            <BarChartIcon /> Reports
          </li>
        </NavLink>
        <NavLink to="/Calendar" onClick={handleNavLinkClick}>
          <li className="sidebar-list-item">
            <CalendarMonthIcon /> Calendar
          </li>
        </NavLink>
        <NavLink to="/Profile" onClick={handleNavLinkClick}>
          <li className="sidebar-list-item">
            <AccountCircleIcon /> Profile
          </li>
        </NavLink>
        <NavLink to="/Settings" onClick={handleNavLinkClick}>
          <li className="sidebar-list-item">
            <SettingsIcon /> Settings
          </li>
        </NavLink>
        <NavLink to="/Support" onClick={handleNavLinkClick} className='mb-4'>
          <li className="sidebar-list-item">
            <HelpOutlineIcon /> Support
          </li>
        </NavLink>
      </ul>
    </aside>
  );
};

export default Sidebar;
