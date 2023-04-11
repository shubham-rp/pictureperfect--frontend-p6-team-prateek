import { Link } from "react-router-dom";
import croppedppLogo from "../../images/cropped-pp-logo.png";
import ppLogo from "../../images/pp-logo.png";
import {
  Grid,
  AppBar,
  Paper,
  Box,
  Toolbar,
  Button,
  Typography,
  Divider,
} from "@mui/material";

import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => {
  return {
    root: {
      flexGrow: 1,
      backgroundColor: "#FFFFFF",
    },
    toolbar: {
      display: "flex",
      justifyContent: "space-between",
    },
    link: {
      textDecoration: "none",
    },
    appBarButton: {
      margin: 13,
      height: 72,
      fontSize: 28,
      textTransform: "none",
      background: "#7D5260",
      borderRadius: 100,
      "@media (max-width: 1024px)": {
        height: 48,
        fontSize: 20,
        margin: 8,
      },
    },
    ctaButton: {
      margin: 12,
      height: 64,
      width: 256,
      fontSize: 28,
      textTransform: "none",

      borderRadius: 100,
      "@media (max-width: 1024px)": {
        height: 48,
        fontSize: 20,
      },
    },
    logoImage: {
      marginTop: 8,
      width: 128,
      height: 128,
      "@media (max-width: 1024px)": {
        width: 64,
        height: 64,
      },
    },
    buttonGroup: {
      textAlign: "left",
    },
    landingPageImage: {
      width: "100%",
      height: "80vh",
    },
    callToActionContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    callToAction: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      padding: 100,
      [theme.breakpoints.down("md")]: {
        padding: 0,
      },
    },
    ctaText: {
      color: theme.palette.primary.main,
      fontSize: 28,
    },
    aboutUsHeading: {
      color: theme.palette.primary.main,
      textAlign: "center",
      padding: 64,
    },
    aboutUsText: {
      textAlign: "center",
      fontSize: 24,
      paddingBottom: 32,
    },
    footer: {
      background: "#79747E",
      margin: 0,
      padding: 0,
      width: "100%",
    },
    footerText: {
      padding: 4,
      textAlign: "center",
    },
  };
});

function LandingPage() {
  const { classes } = useStyles();
  return (
    <>
      <Box>
        <AppBar position="static" className={classes.root} elevation={0}>
          <Toolbar className={classes.toolbar}>
            <img
              className={classes.logoImage}
              src={croppedppLogo}
              alt="person with a camera"
            />
            <div className={classes.buttonGroup}>
              <Link to="/contact-us" className={classes.link}>
                <Button variant="contained" className={classes.appBarButton}>
                  Contact Us
                </Button>
              </Link>
              <Link to="/register-photo-studio" className={classes.link}>
                <Button variant="contained" className={classes.appBarButton}>
                  Partner With Us
                </Button>
              </Link>
            </div>
          </Toolbar>
        </AppBar>
      </Box>
      <Grid container className={classes.callToActionContainer}>
        <Grid item container xs={6}>
          <Box className={classes.callToAction}>
            <Typography
              variant="h3"
              color="inherit"
              className={classes.contactUsHeading}
            >
              <img
                src={ppLogo}
                alt="person with a camera with name of project"
              />
            </Typography>
            <Typography
              color="inherit"
              className={classes.ctaText}
              align="center"
            >
              Find The Perfect Photographer For Your Event
            </Typography>
            <Link to="/login" className={classes.link}>
              <Button variant="contained" className={classes.ctaButton}>
                Log In
              </Button>
            </Link>
            <Link to="/signup" className={classes.link}>
              <Button variant="contained" className={classes.ctaButton}>
                Sign Up
              </Button>
            </Link>
          </Box>
        </Grid>

        <Grid
          item
          xs={6}
          sx={{
            display: { xs: "none", sm: "none", md: "none", lg: "block" },
          }}
        >
          <img
            src="https://picture-perfect-pesto.s3.ap-south-1.amazonaws.com/landing-page-image.jpg"
            className={classes.landingPageImage}
            alt="person with a camera in a studio setting"
          />
        </Grid>
      </Grid>

      <Divider />

      <Typography
        variant="h3"
        color="inherit"
        className={classes.aboutUsHeading}
      >
        ABOUT US
      </Typography>
      <Typography color="inherit" className={classes.aboutUsText}>
        Picture Perfect is a platform which helps users find photographers in
        their city for their events - weddings, birthdays, engagements,
        corporate events etc.
      </Typography>
      <Divider />
      <Typography
        variant="h3"
        color="inherit"
        className={classes.aboutUsHeading}
      >
        SOME GLIMPSES
      </Typography>

      <Paper className={classes.footer}>
        <Typography color="inherit" className={classes.footerText}>
          Picture Perfect @ Team Prateek
        </Typography>
      </Paper>
    </>
  );
}

export default LandingPage;
