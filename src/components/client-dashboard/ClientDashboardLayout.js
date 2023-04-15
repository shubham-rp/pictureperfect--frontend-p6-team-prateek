import { useState, createContext } from "react";
import { styled } from "@mui/material/styles";
import { makeStyles } from "tss-react/mui";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import StudioProfile from "../studio-profile/StudioProfile";
import ppLogo from "../../images/cropped-pp-logo.png";
import ClientBookingHistory from "./ClientBookingHistory";
import ClientEditProfile from "./ClientEditProfile";
import Explore from "./Explore";
import ClientStarred from "./ClientStarred";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useLogout } from "../../hooks/useLogout";

export const StudioProfileDisplayContext = createContext(null);
export const StudioProfileDataContext = createContext(null);

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const useStyles = makeStyles()((theme) => {
  return {
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },

    toolbar: {
      display: "flex",
      alignItems: "center",
      marginTop: theme.spacing.unit,
      justifyContent: "flex-end",
      padding: "0 8px",
      ...theme.mixins.toolbar,
    },

    grow: {
      flexGrow: 1,
    },
    logoImage: {
      marginTop: 8,
      marginLeft: 8,
      width: 72,
      height: 64,
    },
    accountMenu: {
      marginRight: 8,
    },
  };
});

export default function ClientDashboardLayout({
  clientFirstName,
  clientLastName,
}) {
  const [open, setOpen] = useState(false);
  const { user } = useAuthContext();
  const { logout } = useLogout();

  const { classes } = useStyles();
  const [componentToBeDisplayed, setComponentToBeDisplayed] =
    useState("explore");

  const [studioData, setStudioData] = useState({});

  const [anchorEl, setAnchorEl] = useState(null);

  const handleDrawerOpenClose = () => {
    setOpen(!open);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setComponentToBeDisplayed("profile");
    setAnchorEl(null);
  };

  const handleLogoutClick = () => {
    logout();
  };
  let menuOpen = Boolean(anchorEl);
  return (
    <StudioProfileDisplayContext.Provider value={{ setComponentToBeDisplayed }}>
      <StudioProfileDataContext.Provider
        value={{
          setStudioData,
        }}
      >
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <AppBar position="fixed" className={classes.appBar}>
            <Toolbar disableGutters={true}>
              <Typography
                variant="h6"
                color="inherit"
                className={classes.grow}
                noWrap
              >
                <img
                  className={classes.logoImage}
                  src={ppLogo}
                  alt="person holding camera"
                />
              </Typography>
              <div className={classes.accountMenu}>
                <IconButton
                  aria-owns={menuOpen ? "menu-appbar" : undefined}
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircleIcon sx={{ fontSize: 48 }} />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={menuOpen}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>Edit Profile</MenuItem>
                  <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
                </Menu>
              </div>
            </Toolbar>
          </AppBar>
          <Drawer variant="permanent" open={open}>
            <DrawerHeader></DrawerHeader>
            <Divider />
            <List>
              <ListItem disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                      padding: 1,
                    }}
                  >
                    <IconButton
                      color="inherit"
                      aria-label="open drawer"
                      onClick={handleDrawerOpenClose}
                      edge="start"
                    >
                      <MenuIcon />
                    </IconButton>
                  </ListItemIcon>
                  <ListItemText
                    primary={`${clientFirstName} ${clientLastName}`}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>

              {clientDrawerItems.map((item, index) => {
                return (
                  <>
                    <ListItem
                      key={index}
                      disablePadding
                      sx={{ display: "block" }}
                      onClick={() =>
                        setComponentToBeDisplayed(item.componentValue)
                      }
                    >
                      <ListItemButton
                        sx={{
                          minHeight: 48,
                          justifyContent: open ? "initial" : "center",
                          px: 2.5,
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            minWidth: 0,
                            mr: open ? 3 : "auto",
                            justifyContent: "center",
                          }}
                        >
                          {item.componentIcon}
                        </ListItemIcon>
                        <ListItemText
                          primary={item.componentName}
                          sx={{ opacity: open ? 1 : 0 }}
                        />
                      </ListItemButton>
                    </ListItem>
                    {item.isDivider ? <Divider /> : ""}
                  </>
                );
              })}
            </List>
          </Drawer>
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <DrawerHeader />
            {
              {
                explore: <Explore />,
                // starred: <ClientStarred />,
                booking: <ClientBookingHistory />,
                profile: (
                  <ClientEditProfile
                    clientFirstName={clientFirstName}
                    clientLastName={clientLastName}
                  />
                ),
                studioProfile: <StudioProfile {...studioData} />,
              }[componentToBeDisplayed]
            }
          </Box>
        </Box>
      </StudioProfileDataContext.Provider>
    </StudioProfileDisplayContext.Provider>
  );
}

const clientDrawerItems = [
  {
    componentName: "Explore",
    componentIcon: <SearchIcon />,
    componentValue: "explore",
    isDivider: false,
  },
  // To be implemented in future
  // {
  //   componentName: "Starred",
  //   componentIcon: <StarBorderIcon />,
  //   componentValue: "starred",
  //   isDivider: false,
  // },
  {
    componentName: "Booking History",
    componentIcon: <TextSnippetIcon />,
    componentValue: "booking",
    isDivider: true,
  },
  {
    componentName: "Edit Profile",
    componentIcon: <AccountCircleIcon />,
    componentValue: "profile",
    isDivider: false,
  },
];
