import { useState } from "react";
import {
  ProSidebar,
  Menu,
  MenuItem,
  // SubMenu
} from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import eurokidsLogo from "../../images/eurokids_logo.png";
import { FaWpforms } from "react-icons/fa";
import { FaRegWindowMaximize } from "react-icons/fa";
// const CustomSubMenuTitle = ({ title, icon }) => (
//   <Tooltip title={title} placement="right">
//     <span >
//       {icon}
//       <span >{title}</span>
//     </span>
   
//   </Tooltip>
// );

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Tooltip title={title} placement="right">
      <MenuItem
        active={selected === title}
        style={{
          color: colors.redAccent[100],
        }}
        onClick={() => setSelected(title)}
        icon={icon}
      >
        <Typography>{title}</Typography>
        <Link to={to} />
      </MenuItem>
    </Tooltip>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `#20409a !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#db4f4a !important",
        },
        "& .pro-menu-item.active": {
          color: "#db4f4a !important",
        },
        ".custom-submenu-title": {
          padding: "4px",
          color: "white",
        },
        ".custom-submenu-title :hover": {
          color: "#db4f4a !important",
        },

        ".custom-submenu-icon": {
          // marginRight: "100px",
          color: "white",
        },
        ".custom-submenu-icon :hover": {
          color: "#db4f4a !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.redAccent[100]}>
                  <img
                    alt="profile-user"
                    width="130px"
                    height="100px"
                    src={eurokidsLogo}
                  />
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon
                    style={{ margin: "10px 0 20px 0", color: colors.grey[100] }}
                  />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
              ></Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                ></Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"} >
            <Item
              title="Popup"
              to="/popup"
              icon={<FaRegWindowMaximize />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Enquiries"
              to="/enquiries"
              icon={<FaWpforms />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
          <Box paddingLeft={isCollapsed ? undefined : "10%"} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box style={{ marginTop: "550px" }}>
        <Item
          title="Log Out"
          to="/logout"
          icon={<LogoutIcon />}
          selected={selected}
          setSelected={setSelected}
        />
      </Box>
    </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
