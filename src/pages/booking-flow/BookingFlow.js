import { useState, useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useLocation, Link } from "react-router-dom";

import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";

import { makeStyles } from "tss-react/mui";
import { Box, Button, Divider, Grid, Stack } from "@mui/material";

import BookingForm from "./forms/BookingForm";
import BookingPayment from "./forms/BookingPayment";

import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import ppLogo from "../../images/cropped-pp-logo.png";

import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CallIcon from "@mui/icons-material/Call";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import validator from "../../utils/validator";

import { useLogout } from "../../hooks/useLogout";
import BookingConfirmation from "./forms/BookingConfirmation";

const drawerWidth = 300;

const steps = ["Booking Details", "Confirm Booking"];

const useStyles = makeStyles()((theme) => {
  return {
    root: {
      bgcolor: "background.paper",
      borderColor: "grey.500",
      border: 1,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "1rem",
      borderRadius: "1px",
    },

    loginItems: {
      justifyContent: "center",
      alignItems: "center",
    },
    loginImageContainer: {
      height: "100vh",
    },
    loginImage: {
      marginRight: "auto",
      marginLeft: "auto",
      height: "98%",
    },
    loginTextField: {
      width: 507,
    },
    nameTextField: {
      width: 240,
      marginRight: 12,
      marginLeft: 12,
    },
    signInButton: {
      width: 175,
      height: 48,
      fontSize: 11,
      borderRadius: 24,
    },
    signUpHeading: {
      color: theme.palette.primary.main,
    },
    dropDown: {
      width: 300,
    },
    mainBox: {
      marginLeft: 300,
      "@media (max-width: 1280px)": {
        marginLeft: 0,
      },
    },
    logoImage: {
      marginTop: 8,
      width: 54,
      height: 48,
    },
    navBarIcons: { display: "flex", justifyContent: "space-between" },

    accountIcon: { width: 120, height: 48 },
    drawer: { display: "flex", flexDirection: "column", alignItems: "center" },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginLeft: 12,
      marginRight: 36,
    },
    menuButtonIconClosed: {
      transition: theme.transitions.create(["transform"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      transform: "rotate(0deg)",
    },
    menuButtonIconOpen: {
      transition: theme.transitions.create(["transform"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      transform: "rotate(180deg)",
    },
    hide: {
      display: "none",
    },
    grow: {
      flexGrow: 1,
    },
    studioDetails: {
      display: "flex",

      alignItems: "center",
      textAlign: "center",
    },
    studioAvatar: {
      marginTop: 8,
      width: 64,
      height: 64,
    },
    categoryTextItem: {
      display: "inline-block",
      color: "white",
      backgroundColor: "#7D5260",
      padding: 2,
      borderRadius: 3,
      margin: 2,
    },
    languageLocationTextItem: {
      display: "inline-block",
      color: "white",
      backgroundColor: theme.palette.primary.main,
      padding: 2,
      borderRadius: 3,
      margin: 2,
    },
    studioName: {
      color: theme.palette.primary.main,
    },
    contactDetails: {
      display: "flex",
      alignItems: "center",
      flexWrap: "wrap",
      fontSize: 16,
      "& a": {
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
        textDecoration: "none",
      },
    },
    studioCity: {
      display: "flex",
      alignItems: "center",
      flexWrap: "wrap",
      fontSize: 16,
      color: theme.palette.primary.main,
    },
    callIcon: { margin: 4, color: theme.palette.primary.main },
    whatsAppIcon: { margin: 4, color: "#12B47D" },
    subHeadings: {
      color: theme.palette.primary.main,
    },
    goBackButton: {
      marginLeft: "auto",
      marginRight: 0,
    },
    goBackButtoLink: {
      textDecoration: "none",
    },
    loader: {
      width: "100%",
      margin: 8,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    loadingItem: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  };
});

export default function BookingFlow() {
  const [isLoading, setIsLoading] = useState(true);
  const { classes } = useStyles();
  const location = useLocation();
  const {
    studio,
    studioName,
    studioCity,
    studioPhoneNumber,
    studioWhatsAppNumber,
    studioAddress,
    studioPincode,
    studioAbout,
    studioCategory,
    studioProfilePicture,
    studioDailyRate,
  } = location.state;

  const [currentForm, setCurrentForm] = useState("bookingForm");
  const [numberOfDays, setNumberOfDays] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [bookingId, setBookingId] = useState("");

  const [flag, setFlag] = useState(true);
  const [error, setError] = useState({});
  const [bookingFormData, setBookingFormData] = useState({
    userName: "",
    userEmail: "",
    userContactNumber: "",
    userAlternateContactNumber: "",
    userSelectCategory: "",
    userAddress: "",
    userPinCode: "",
    bookingDate: new Date(),
    fromDate: new Date(),
    toDate: new Date(),
  });
  const { user } = useAuthContext();
  const { logout } = useLogout();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogoutClick = () => {
    logout();
  };

  let menuOpen = Boolean(anchorEl);

  useEffect(() => {
    if (
      bookingFormData.userName !== "" &&
      bookingFormData.userEmail !== "" &&
      bookingFormData.userContactNumber !== "" &&
      bookingFormData.userAlternateContactNumber !== "" &&
      bookingFormData.userSelectCategory !== "" &&
      bookingFormData.userAddress !== "" &&
      bookingFormData.userPinCode !== "" &&
      error.userContactNumber === "" &&
      error.userAlternateContactNumber === "" &&
      error.userSelectCategory === "" &&
      error.userAddress === "" &&
      error.userPinCode === ""
    ) {
      setFlag(false);
    } else {
      setFlag(true);
    }
  }, [error, bookingFormData]);

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_API_URL}/api/clients`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      setBookingFormData((prev) => {
        return {
          ...prev,
          userName: response.data.firstName + " " + response.data.lastName,
          userEmail: user.email,
        };
      });

      setIsLoading(false);
    };

    if (user) {
      fetchUserData();
    }
  }, [user, setBookingFormData]);

  const handleProccedToPayments = async (e) => {
    e.preventDefault();
    let finalBookingData = {
      studio: studio,
      totalAmount: totalAmount,
      numberOfDays: numberOfDays,

      ...bookingFormData,
    };

    setIsLoading(true);
    try {
      const response = await axios
        .post(
          `${process.env.REACT_APP_BACKEND_API_URL}/api/bookings/booking`,
          {
            finalBookingData,
          },
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        )
        .then((response) => {
          setBookingId(response.data);

          setIsLoading(false);
          setCurrentForm("bookingConfirmation");
        });
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };
  const handleBookingFormData = (e) => {
    if (e.target) {
      const { id, value, name } = e.target;

      if (id === "userContactNumber") {
        setBookingFormData((prev) => {
          return {
            ...prev,
            [id]: value,
          };
        });
        if (validator(id, value)) {
          setError((prev) => {
            return {
              ...prev,
              [id]: "",
            };
          });
        } else {
          setError((prev) => {
            return {
              ...prev,
              [id]: "Enter a valid phone number",
            };
          });
        }
      }
      if (id === "userAlternateContactNumber") {
        setBookingFormData((prev) => {
          return {
            ...prev,
            [id]: value,
          };
        });
        if (validator(id, value)) {
          setError((prev) => {
            return {
              ...prev,
              [id]: "",
            };
          });
        } else {
          setError((prev) => {
            return {
              ...prev,
              [id]: "Enter a valid phone number",
            };
          });
        }
      }
      if (name === "userSelectCategory") {
        setBookingFormData((prev) => {
          return {
            ...prev,
            [name]: value,
          };
        });
        if (setBookingFormData.userSelectCategory !== "") {
          setError((prev) => {
            return {
              ...prev,
              [name]: "",
            };
          });
        } else {
          setError((prev) => {
            return {
              ...prev,
              [name]: "Please Select a Category",
            };
          });
        }
      }
      if (id === "userAddress") {
        setBookingFormData((prev) => {
          return {
            ...prev,
            [id]: value,
          };
        });
        if (validator(id, value)) {
          setError((prev) => {
            return {
              ...prev,
              [id]: "",
            };
          });
        } else {
          setError((prev) => {
            return {
              ...prev,
              [id]: "Enter a valid address",
            };
          });
        }
      }
      if (id === "userPinCode") {
        setBookingFormData((prev) => {
          return {
            ...prev,
            [id]: value,
          };
        });
        if (validator(id, value)) {
          setError((prev) => {
            return {
              ...prev,
              [id]: "",
            };
          });
        } else {
          setError((prev) => {
            return {
              ...prev,
              [id]: "Enter valid PinCode",
            };
          });
        }
      }
    }
  };
  const handleFromDate = (e) => {
    setBookingFormData((prev) => {
      return {
        ...prev,
        fromDate: e.toDate(),
      };
    });
  };
  const handleBookingDate = (e) => {
    setBookingFormData((prev) => {
      return {
        ...prev,
        bookingDate: e.toDate(),
      };
    });
  };
  const handleToDate = (e) => {
    setBookingFormData((prev) => {
      return {
        ...prev,
        toDate: e.toDate(),
      };
    });
  };

  const handlePaymentDetails = () => {
    // To calculate the time difference of two dates
    var Difference_In_Time =
      bookingFormData.toDate.getTime() - bookingFormData.fromDate.getTime();

    // To calculate the no. of days between two dates
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

    setNumberOfDays(Math.round(Difference_In_Days));
    setTotalAmount(studioDailyRate * Math.round(Difference_In_Days));
  };

  return (
    <>
      {" "}
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
          <div>
            <IconButton
              aria-owns={menuOpen ? "menu-appbar" : undefined}
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircleIcon />
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
      <Box className={classes.topBox}>
        {" "}
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
              display: { xs: "none", sm: "none", md: "none", lg: "block" },
            },
          }}
        >
          <Toolbar />
          <Grid item className={classes.drawer}>
            <Stack className={classes.studioDetails} spacing={2}>
              <Avatar
                alt={studioName}
                src={studioProfilePicture}
                className={classes.studioAvatar}
              />

              <Typography variant="h5" className={classes.studioName}>
                {studioName}
              </Typography>

              <Divider orientation="horizontal" flexItem />

              <Typography variant="body" className={classes.studioAboutUs}>
                {studioAbout}
              </Typography>

              <Divider orientation="horizontal" flexItem />

              <Typography variant="body" className={classes.studioCity}>
                <LocationOnIcon />
                {studioCity}
              </Typography>

              <Divider orientation="horizontal" flexItem />

              <Typography variant="body">{studioAddress}</Typography>
              <Typography variant="body">{studioPincode}</Typography>

              <Divider orientation="horizontal" flexItem />

              <Typography variant="body" className={classes.contactDetails}>
                <a href={`tel:+91${studioPhoneNumber}`}>
                  <CallIcon className={classes.callIcon} /> {studioPhoneNumber}
                </a>
              </Typography>

              <Typography variant="body" className={classes.contactDetails}>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={`https://wa.me/+91${studioWhatsAppNumber}`}
                >
                  <WhatsAppIcon className={classes.whatsAppIcon} />{" "}
                  {studioWhatsAppNumber}
                </a>
              </Typography>

              <Divider orientation="horizontal" flexItem />

              <Typography variant="body">
                <Typography variant="h6" className={classes.subHeadings}>
                  We Specialize In
                </Typography>
                {studioCategory.map((category, index) => {
                  return (
                    <div key={index} className={classes.categoryTextItem}>
                      {category}
                    </div>
                  );
                })}
              </Typography>

              <Divider orientation="horizontal" flexItem />
            </Stack>
          </Grid>
        </Drawer>
        <Box
          className={classes.mainBox}
          component="main"
          sx={{ flexGrow: 1, p: 3 }}
        >
          <Toolbar />
          <Stack>
            <div className={classes.goBackButton}>
              <Link to="/dashboard" className={classes.goBackButtoLink}>
                <Button variant="outlined" color="error">
                  <RotateLeftIcon />
                  Go Back
                </Button>
              </Link>
            </div>

            <Stepper
              activeStep={
                currentForm === "bookingForm"
                  ? 0
                  : currentForm === "bookingPayment"
                  ? 1
                  : currentForm === "bookingConfirmation"
                  ? 2
                  : null
              }
              alternativeLabel
            >
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <div className={classes.loader}>
              {isLoading && <CircularProgress />}
            </div>

            {
              {
                bookingForm: isLoading ? (
                  <CircularProgress />
                ) : (
                  <BookingForm
                    isLoading={isLoading}
                    disabled={flag}
                    errorMessage={error}
                    className={classes.bookingForm}
                    handler={handleBookingFormData}
                    values={bookingFormData}
                    handleCurrentForm={setCurrentForm}
                    fromDateHandler={handleFromDate}
                    bookingDateHandler={handleBookingDate}
                    toDateHandler={handleToDate}
                    handlePaymentDetails={handlePaymentDetails}
                    studioCategories={studioCategory}
                  />
                ),

                bookingPayment: (
                  <BookingPayment
                    numberOfDays={numberOfDays}
                    studioDailyRate={studioDailyRate}
                    totalAmount={totalAmount}
                    handleProccedToPayments={handleProccedToPayments}
                  />
                ),
                bookingConfirmation: (
                  <BookingConfirmation bookingId={bookingId} />
                ),
              }[currentForm]
            }
          </Stack>
        </Box>
      </Box>
    </>
  );
}
