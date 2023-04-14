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
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from "@mui/material";

import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => {
  return {
    mainBox: {
      background: `linear-gradient(to right, rgb(161, 255, 206, 0.3), rgb(250, 255, 209, 0.3))`,
    },
    root: {
      flexGrow: 1,
      background: `linear-gradient(to right, rgb(161, 255, 206, 0.05), rgb(250, 255, 209, 0.05))`,
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
      height: 48,
      fontSize: 24,
      textTransform: "none",
      background: "#7D5260",
      borderRadius: 100,
      "@media (max-width: 1024px)": {
        height: 32,
        fontSize: 18,
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
      width: 144,
      height: 128,
      "@media (max-width: 1024px)": {
        width: 64,
        height: 64,
      },
    },
    buttonGroup: {
      textAlign: "left",
    },
    ppLogoCTA: {
      width: "50%",
    },
    landingPageImage: {
      float: "right",
      height: "80vh",
      borderRadius: 24,
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
      padding: 32,
    },
    aboutUsText: {
      textAlign: "center",
      fontSize: 22,
      paddingBottom: 32,
      [theme.breakpoints.down("md")]: {
        fontSize: 18,
      },
    },
    imageList: {
      display: "flex",
      justifyContent: "center",
    },
    imageListItemBar: {
      backgroundColor: theme.palette.primary.main,
      opacity: "75%",
    },
    footer: {
      background: "#79747E",
      opacity: "60%",
      margin: 0,
      padding: 0,
      width: "100%",
    },
    footerText: {
      padding: 4,
      textAlign: "center",
      fontWeight: "bold",
    },
  };
});

function LandingPage() {
  const { classes } = useStyles();
  return (
    <Box className={classes.mainBox}>
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
        <Grid item container xs={6} className={classes.callToActionContainer}>
          <Box className={classes.callToAction}>
            <Typography
              variant="h3"
              color="inherit"
              className={classes.contactUsHeading}
            >
              <Box className={classes.ppLogoCTA}>
                <img
                  src={ppLogo}
                  alt="person with a camera with name of project"
                />
              </Box>
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
        variant="h4"
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
        variant="h4"
        color="inherit"
        className={classes.aboutUsHeading}
      >
        SOME GLIMPSES
      </Typography>
      <Box className={classes.imageList}>
        <ImageList sx={{ width: 1024 }}>
          {itemData.map((item) => (
            <ImageListItem key={item.img}>
              <img
                src={`${item.img}?w=720&fit=crop&auto=format`}
                srcSet={`${item.img}?w=720&fit=crop&auto=format&dpr=2 2x`}
                alt={item.title}
                loading="lazy"
              />
              <ImageListItemBar
                title={item.title}
                className={classes.imageListItemBar}
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>

      <Paper className={classes.footer}>
        <Typography color="inherit" className={classes.footerText}>
          Picture Perfect ©
        </Typography>
      </Paper>
    </Box>
  );
}

export default LandingPage;

const itemData = [
  {
    img: "https://picture-perfect-pesto.s3.ap-south-1.amazonaws.com/wedding.jpeg",
    title: "Wedding",
  },
  {
    img: "https://picture-perfect-pesto.s3.ap-south-1.amazonaws.com/babies-and-kids.jpeg",
    title: "Babies & Kids",
  },
  {
    img: "https://picture-perfect-pesto.s3.ap-south-1.amazonaws.com/special-occasion.jpeg",
    title: "Special Occasion",
  },
  {
    img: "https://picture-perfect-pesto.s3.ap-south-1.amazonaws.com/fashion.png",
    title: "Fashion & Portfolio",
  },
  {
    img: "https://picture-perfect-pesto.s3.ap-south-1.amazonaws.com/commercial.jpeg",
    title: "Commercial",
  },
  {
    img: "https://picture-perfect-pesto.s3.ap-south-1.amazonaws.com/corporate.jpeg",
    title: "Corporate Events",
  },
];
