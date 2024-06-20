import React, { useEffect } from "react";
import { Box, IconButton, useTheme, Avatar } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import MenuIcon from '@mui/icons-material/Menu';
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import logo from "../../assets/Img/image 1.png";
import Dropdown from "react-bootstrap/Dropdown";
import { BsPersonGear, BsGear, BsBoxArrowRight } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";

const Topbar = ({ profilePicture,OpenSidebar }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const currentUser = useSelector((state) => state.auth.user);
  let profileImage = currentUser?.ProfileImage ? JSON.parse(currentUser.ProfileImage).ProfileImage : null;

  useEffect(() => {
    console.log(profileImage);
  }, [profileImage]);
  return (
    <Box display="flex" justifyContent="space-between" alignItems="center" p={4}>
      {/* LOGO*/}
      <div className="d-none d-lg-block">
      <Box display="flex" borderRadius="3px" height={"45px"}>
        <img rounded-full w-8 h-8 src={logo} alt="user-profile" />
      </Box>
      </div>
      <div className="d-block d-lg-none" style={{cursor: 'pointer'}}>
        <MenuIcon style={{ fontSize: '1.8rem' }} onClick={OpenSidebar}/>
      </div>

      {/* ICONS & SEARCH BAR  */}
      <Box display="flex">
        {/* <Box
          display="flex"
          backgroundColor={colors.primary[400]}
          borderRadius="3px"
        >
          <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
          <IconButton type="button" sx={{ p: 1 }}>
            <SearchIcon />
          </IconButton>
        </Box> */}
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        {/* <IconButton>
          <SettingsOutlinedIcon />
        </IconButton> */}
        <div style={{ display: "flex", alignItems: "center", padding: "6px"}}>
        {currentUser.FullName.length <= 14 ? currentUser.FullName : currentUser.LastName}
        </div>
        <Avatar alt="User Profile" src={profileImage} />
        <Dropdown className="dropdown" autoClose="outside">
          <Dropdown.Toggle variant="" id="dropdown-basic"></Dropdown.Toggle>
          <Dropdown.Menu className="dropdown-menu">
            <Dropdown.Item href="/Profile">
              <BsPersonGear style={{ marginRight: "10px" }} />
              Profile
            </Dropdown.Item>
            <Dropdown.Item href="/Settings">
              {" "}
              <BsGear  style={{ marginRight: "10px" }} />
              Settings
            </Dropdown.Item>
            <Dropdown.Item href="/">
              {" "}
              <BsBoxArrowRight  style={{ marginRight: "10px" }} />
              Logout
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Box>
    </Box>
  );
};

export default Topbar;
