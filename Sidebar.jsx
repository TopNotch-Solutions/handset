import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleSidebar } from "../../store/reducers/sidebarReducer";
import {
  Dashboard as DashboardIcon,
  PeopleAlt as PeopleAltIcon,
  Devices as DevicesIcon,
  CardGiftcard as CardGiftcardIcon,
  BarChart as BarChartIcon,
  CalendarMonth as CalendarMonthIcon,
  AccountCircle as AccountCircleIcon,
  CloudUpload as CloudUploadIcon,
  Settings as SettingsIcon,
  HelpOutline as HelpOutlineIcon,
  Close as CloseIcon,
  MonetizationOn as MonetizationOnIcon,
  HeadsetMic as HeadsetMicIcon,
  Assignment as AssignmentIcon,
  DevicesOther as DevicesOtherIcon,
  Slideshow as SlideshowIcon,
} from "@mui/icons-material";
import "../../assets/style/sidebar.css";
import { NavLink } from "react-router-dom";

const Sidebar = ({ openSidebarToggle, OpenSidebar }) => {
  const dispatch = useDispatch();
  const isSidebarOpen = useSelector((state) => state.sidebar.isOpen);
  const currentUser = useSelector((state) => state.auth.user);
  const { role } = useSelector((state) => state.auth);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 992);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const [navList, setNavList] = useState("1");

  const handleResize = () => {
    if (window.innerWidth >= 992) {
      window.location.reload();
    }
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
      dispatch(toggleSidebar());
    }
  };

  const handleSubMenuToggle = () => {
    setIsSubMenuOpen(!isSubMenuOpen);
  };

  const renderAdminLinks = () => (
    <>
      <NavLink to="admin/Dashboard" onClick={() =>{
        handleNavLinkClick()
        setNavList("1");
      }} >
        <li className={navList  === "1"? "backNav": "sidebar-list-item"}>
          <DashboardIcon /> Dashboard
        </li>
      </NavLink>
      <NavLink to="admin/Employees" onClick={() =>{
        handleNavLinkClick()
        setNavList("2");
      }} >
        <li className={navList  === "2"? "backNav": "sidebar-list-item"}>
          <PeopleAltIcon /> Employees
        </li>
      </NavLink>
      <NavLink to="admin/Upload" onClick={() =>{
        handleNavLinkClick()
        setNavList("3");
      }}>
        <li className={navList  === "3"? "backNav": "sidebar-list-item"}>
          <CloudUploadIcon /> File Upload
        </li>
      </NavLink>
      <NavLink to="admin/Handsets" onClick={() =>{
        handleNavLinkClick()
        setNavList("4");
      }} >
        <li className={navList  === "4"? "backNav": "sidebar-list-item"}>
          <DevicesIcon /> Handset
        </li>
      </NavLink>
      <NavLink to="admin/Contracts" onClick={() =>{
        handleNavLinkClick()
        setNavList("5");
      }} >
        <li className={navList  === "5"? "backNav": "sidebar-list-item"}>
          <CardGiftcardIcon /> Allocations
        </li>
      </NavLink>
      <NavLink to="admin/Reports" onClick={() =>{
        handleNavLinkClick()
        setNavList("6");
      }} >
        <li className={navList  === "6"? "backNav": "sidebar-list-item"}>
          <BarChartIcon /> Reports
        </li>
      </NavLink>
      <NavLink to="admin/Calendar" onClick={() =>{
        handleNavLinkClick()
        setNavList("7");
      }} >
        <li className={navList  === "7"? "backNav": "sidebar-list-item"}>
          <CalendarMonthIcon /> Calendar
        </li>
      </NavLink>
      <NavLink to="admin/Profile" onClick={() =>{
        handleNavLinkClick()
        setNavList("8");
      }} >
        <li className={navList  === "8"? "backNav": "sidebar-list-item"}>
          <AccountCircleIcon /> Profile
        </li>
      </NavLink>
    </>
  );

  const renderUserLinks = () => (
    <>
      <NavLink to="user/Dashboard" onClick={() =>{
        handleNavLinkClick()
        setNavList("1");
      }} >
        <li className={navList  === "1"? "backNav": "sidebar-list-item"}>
          <DashboardIcon /> Dashboard
        </li>
      </NavLink>
      <NavLink to="user/Airtime" onClick={() =>{
        handleNavLinkClick()
        setNavList("2");
      }}>
        <li className={navList  === "2"? "backNav": "sidebar-list-item"}>
          <MonetizationOnIcon /> My Airtime
        </li>
      </NavLink>
      <NavLink to="user/Devices" onClick={() =>{
        handleNavLinkClick()
        setNavList("3");
      }}>
        <li className={navList  === "3"? "backNav": "sidebar-list-item"}>
          <DevicesOtherIcon /> My Devices
        </li>
      </NavLink>
      <NavLink to="user/Benefits" onClick={() =>{
        handleNavLinkClick()
        setNavList("4");
      }}>
        <li className={navList  === "4"? "backNav": "sidebar-list-item"}>
          <AssignmentIcon /> My Benefits
        </li>
      </NavLink>
      <li className={navList  === "5"? "backNav": "sidebar-list-item"} onClick={() =>{
        handleNavLinkClick()
        setNavList("5");
      }}>
        <HelpOutlineIcon /> Self-Help Hub
      </li>
      <ul className={`sub-menu ${isSubMenuOpen ? "active" : ""}`}>
        <NavLink to="user/SelfHelp/FAQS" onClick={() =>{
        handleNavLinkClick()
        setNavList("6");
      }}>
          <li className={navList  === "6"? "backNav": "sidebar-list-item"}>
            <SlideshowIcon />
            FAQs
          </li>
        </NavLink>
        <NavLink to="user/SelfHelp/Videos" onClick={() =>{
        handleNavLinkClick()
        setNavList("7");
      }}>
          <li className={navList  === "7"? "backNav": "sidebar-list-item"}>
            <SlideshowIcon />
            Videos
          </li>
        </NavLink>
        <NavLink to="user/SelfHelp/Wellness" onClick={() =>{
        handleNavLinkClick()
        setNavList("8");
      }}>
          <li className={navList  === "8"? "backNav": "sidebar-list-item"}>Wellness</li>
        </NavLink>
        <NavLink to="user/SelfHelp/Policy" onClick={() =>{
        handleNavLinkClick()
        setNavList("11");
      }}>
          <li className={navList  === "11"? "backNav": "sidebar-list-item"}>Policy Documents</li>
        </NavLink>
      </ul>
      <NavLink to="user/Profile" onClick={() =>{
        handleNavLinkClick()
        setNavList("12");
      }}>
        <li className={navList  === "12"? "backNav": "sidebar-list-item"}>
          <AccountCircleIcon /> Profile
        </li>
      </NavLink>
    </>
  );

  return (
    <aside id="sidebar" style={{ width: 278 }} className={openSidebarToggle ? 'sidebar-responsive' : ''}>
      <div className="sidebar-title">
        <div className="sidebar-brand">
          <div className="logo-div">
            <h3 className="title">Ambersphere</h3>
          </div>
        </div>
        <span className="close_icon">
          <CloseIcon
            onClick={handleNavLinkClick}
            style={{ fontSize: "2rem",color: "white" }}
          />
        </span>
      </div>
      <hr className="line" />

      <ul className="sidebar-list">
        {role === "admin" && renderAdminLinks()}
        {role === "user" && renderUserLinks()}
        <NavLink to="/Settings" onClick={() =>{
        handleNavLinkClick()
        setNavList("9");
      }}>
          <li className={navList  === "9"? "backNav": "sidebar-list-item"}>
            <SettingsIcon /> Settings
          </li>
        </NavLink>
        <NavLink to="/Support" onClick={() =>{
        handleNavLinkClick()
        setNavList("10");
      }} className="mb-4">
          <li className={navList  === "10"? "backNav": "sidebar-list-item"}>
            <HeadsetMicIcon /> Support
          </li>
        </NavLink>
      </ul>
    </aside>
  );
};

export default Sidebar;
