import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Grid,
  Stack,
  TextField,
  Toolbar,
  AppBar,
  Typography,
} from "@mui/material";
import { makeStyles } from "tss-react/mui";
import ppLogo from "../../images/pp-logo.png";
import croppedppLogo from "../../images/cropped-pp-logo.png";

const useStyles = makeStyles()((theme) => {
  return {
    loginItems: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },

    contactUsTextField: {
      width: 507,
      "@media (max-width: 720px)": {
        width: 400,
      },
    },

    submitButton: {
      width: 128,
      height: 48,
      fontSize: 16,
      borderRadius: 24,
    },
    appBar: {
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
    contactUsDescription: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      padding: 100,
      "@media (max-width: 1440px)": {
        display: "none",
      },
    },
    contactUsHeading: {
      padding: 20,
      color: theme.palette.primary.main,
    },
    contactUsText: {
      padding: 20,
      fontSize: 24,
    },
    appBarButton: {
      margin: 13,
      height: 72,
      fontSize: 28,
      textTransform: "none",
      background: "#7D5260",
      borderRadius: 100,
      "@media (max-width: 720px)": {
        marginTop: 8,
        height: 48,
        fontSize: 18,
      },
    },
    logoImage: {
      marginTop: 8,
      width: 128,
      height: 128,
      "@media (max-width: 720px)": {
        marginTop: 8,
        width: 64,
        height: 64,
      },
    },
    buttonGroup: {
      textAlign: "left",
    },
  };
});

function ContactUs() {
  const { classes } = useStyles();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState();
  const [yourQuery, setYourQuery] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  };
  return (
    <>
      <Box>
        <AppBar position="static" className={classes.appBar} elevation={0}>
          <Toolbar className={classes.toolbar}>
            <img
              className={classes.logoImage}
              src={croppedppLogo}
              alt="person holding camera"
            />
            <div className={classes.buttonGroup}>
              <Link to="/" className={classes.link}>
                <Button variant="contained" className={classes.appBarButton}>
                  Go To Home
                </Button>
              </Link>
            </div>
          </Toolbar>
        </AppBar>
      </Box>
      <Grid container>
        <Grid
          item
          container
          xs={5}
          sx={{
            display: { xs: "none", sm: "none", md: "none", lg: "block" },
          }}
        >
          <div className={classes.contactUsDescription}>
            <Typography
              variant="h3"
              color="inherit"
              className={classes.contactUsHeading}
            >
              Contact Us
            </Typography>
            <Typography
              color="inherit"
              className={classes.contactUsText}
              align="center"
            >
              Picture Perfect is a platform which helps users find photographers
              in their city for their events - weddings, birthdays, engagements,
              corporate events etc.
            </Typography>
            <Typography
              color="inherit"
              className={classes.contactUsText}
              align="center"
            >
              Feel free to contact us in case you have any questions for us.
            </Typography>
          </div>
        </Grid>

        <Grid item xs={12} lg={6}>
          <Box component="form" onSubmit={handleSubmit}>
            <Stack spacing={2} className={classes.loginItems}>
              <img src={ppLogo} alt="Person holding camera" />

              <TextField
                required
                className={classes.contactUsTextField}
                label="Name"
                variant="outlined"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
              <TextField
                required
                className={classes.contactUsTextField}
                label="Email Id"
                type="email"
                variant="outlined"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <TextField
                className={classes.contactUsTextField}
                label="Phone Number"
                type="number"
                variant="outlined"
                onChange={(e) => setPhoneNumber(e.target.value)}
                value={phoneNumber}
              />
              <TextField
                required
                multiline
                rows={4}
                className={classes.contactUsTextField}
                label="Your Query"
                variant="outlined"
                onChange={(e) => setYourQuery(e.target.value)}
                value={yourQuery}
              />
              <Button
                variant="contained"
                className={classes.submitButton}
                type="submit"
              >
                Submit
              </Button>
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default ContactUs;
