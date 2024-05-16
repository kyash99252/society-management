import { useState, useEffect } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../../theme";
import { useUser } from "../../useUser";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import DangerousOutlinedIcon from "@mui/icons-material/DangerousOutlined";
import CurrencyRupeeOutlinedIcon from "@mui/icons-material/CurrencyRupeeOutlined";
import DirectionsCarFilledOutlinedIcon from "@mui/icons-material/DirectionsCarFilledOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import UpdateOutlinedIcon from "@mui/icons-material/UpdateOutlined";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Link to={to} style={{ textDecoration: "none", color: "inherit" }}>
      <MenuItem
        className="menuItem"
        active={selected === title}
        onClick={() => setSelected(title)}
        icon={icon}
      >
        <Typography>{title}</Typography>
      </MenuItem>
    </Link>
  );
};

const heightStyle = {
  height: "100vh",
};

const MySideBar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const userContext = useUser(); // use the hook to access the context

  const [userName, setUserName] = useState("");
  const [subtitle, setSubtitle] = useState("");

  useEffect(() => {
    if (userContext && userContext.userData) {
      if (userContext.userData.userType === "admin") {
        setUserName("Yash K.");
        setSubtitle("Admin");
      } else if (userContext.userData.userType === "user") {
        fetch(`http://localhost:3000/data/${userContext.userData.residentID}`)
          .then((response) => response.json())
          .then((data) => {
            setUserName(data[0].Name);
            setSubtitle(data[0].FlatNo);
          })
          .catch((error) =>
            console.error("Error fetching user details:", error)
          );
      }
    }
  }, [userContext]);

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <Sidebar
        collapsed={isCollapsed}
        rootStyles={heightStyle}
        backgroundColor="#1F2A40"
      >
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
                <Typography variant="h3" color={colors.grey[100]}></Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  {userName || "User Name"}
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  {subtitle || "Flat Number"}
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Data
            </Typography>
            <Item
              title="Complaints"
              to="/complaints"
              icon={<ReceiptOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            {userContext &&
              userContext.userData &&
              userContext.userData.userType === "admin" && (
                <>
                  <Item
                    title="Residents"
                    to="/residents"
                    icon={<PeopleOutlinedIcon />}
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Item
                    title="Vehicles"
                    to="/vehicles"
                    icon={<DirectionsCarFilledOutlinedIcon />}
                    selected={selected}
                    setSelected={setSelected}
                  />
                </>
              )}
            <Item
              title="Maintainence"
              to="/maintainence"
              icon={<CurrencyRupeeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Fines"
              to="/fines"
              icon={<DangerousOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Data Manipulation
            </Typography>
            <Item
              title="Add"
              to="/add"
              icon={<AddOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Update"
              to="/update"
              icon={<UpdateOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </Sidebar>
    </Box>
  );
};

export default MySideBar;
