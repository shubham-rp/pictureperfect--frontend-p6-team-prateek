import {
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import CallIcon from "@mui/icons-material/Call";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import { Link } from "react-router-dom";
import { makeStyles } from "tss-react/mui";
import ppLogo from "../../images/cropped-pp-logo.png";

const useStyles = makeStyles()((theme) => {
  return {
    studioProfilePicture: {
      width: 128,
      height: 128,
      margin: 16,
    },
    studioDetails: {
      height: 300,
      backgroundColor: "#E8DEF8",
    },
    studioAboutUs: {
      height: 150,
    },
    studioLocation: {
      height: 150,
      textAlign: "center",
    },
    studioAlbumsPackages: {
      height: 240,
    },
    profilePicture: {
      display: "flex",
      justifyContent: "right",
      alignItems: "center",
    },
    buttonGroup: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    studioDetailsContent: {
      display: "flex",
      justifyContent: "left",
      alignItems: "center",
    },
    studioAlbumsPackagesHeader: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: theme.palette.secondary.main,
    },
    studioTitle: {
      color: theme.palette.secondary.main,
      margin: 4,
    },
    studioCity: {
      display: "flex",
      alignItems: "center",
      flexWrap: "wrap",
      fontSize: 20,
      color: theme.palette.primary.main,
      margin: 2,
    },
    studioContact: {
      display: "flex",
      alignItems: "center",
      flexWrap: "wrap",
      fontSize: 16,
      color: theme.palette.secondary.main,
      margin: 2,
      "& a": {
        textDecoration: "none",
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
      },
    },
    categoryTextItem: {
      display: "inline-block",
      color: "white",
      backgroundColor: "#7D5260",
      padding: 2,
      borderRadius: 3,
      margin: 4,
    },
    locationTextItem: {
      display: "inline-block",
      color: "white",
      fontSize: 14,
      backgroundColor: theme.palette.secondary.main,
      padding: 2,
      borderRadius: 3,
      margin: 4,
    },
    languageTextItem: {
      display: "inline-block",
      color: "white",
      fontSize: 14,
      backgroundColor: theme.palette.primary.main,
      padding: 2,
      borderRadius: 3,
      margin: 4,
    },
    callIcon: { marginRight: 4, color: theme.palette.primary.main },
    whatsAppIcon: { marginRight: 4, marginLeft: 4, color: "#12B47D" },
    checkIcon: { marginRight: 4 },
    locationIcon: { marginRight: 4 },
    bookNowLink: {
      textDecoration: "none",
    },
    subHeading: {
      color: theme.palette.secondary.main,

      margin: 16,
    },

    locationText: {
      marginTop: 16,
    },
    aboutUsText: {
      margin: 16,
    },
    callButton: {
      borderRadius: 16,
      margin: 16,
    },
    callButtonIcon: {
      marginRight: 4,
      color: "white",
    },
    whatsAppButton: {
      backgroundColor: "#12B47D",
      borderRadius: 16,
      margin: 16,
    },
    whatsAppButtonIcon: {
      marginRight: 4,
      color: "white",
    },
    rotateLeftIcon: {
      marginRight: 4,
    },
    studioButtons: {
      margin: 16,

      borderRadius: 16,
    },
    contactLinks: {
      textDecoration: "none",
    },
  };
});

function StudioDashboardProfile({
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
}) {
  const { classes } = useStyles();

  return (
    <Box>
      <Grid container className={classes.studioDetails}>
        <Grid item xs={2} className={classes.profilePicture}>
          <Avatar
            alt="Remy Sharp"
            src={ppLogo}
            className={classes.studioProfilePicture}
          />
        </Grid>

        <Grid item xs={6} className={classes.studioDetailsContent}>
          <Stack>
            <Typography variant="h4" className={classes.studioTitle}>
              {studioName}
            </Typography>
            <Typography variant="body" className={classes.studioCity}>
              {" "}
              <LocationOnIcon className={classes.locationIcon} />
              {studioCity}
            </Typography>
            <Typography className={classes.studioContact}>
              <a href={`tel:+91${studioPhoneNumber}`}>
                <CallIcon className={classes.callIcon} /> {studioPhoneNumber}
              </a>
              <a
                target="_blank"
                rel="noreferrer"
                href={`https://wa.me/+91${studioWhatsAppNumber}`}
              >
                <WhatsAppIcon className={classes.whatsAppIcon} />{" "}
                {studioWhatsAppNumber}
              </a>{" "}
            </Typography>

            <Typography variant="body">
              {studioCategory.map((category, index) => {
                return (
                  <span key={index} className={classes.categoryTextItem}>
                    {category}
                  </span>
                );
              })}
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={4} className={classes.buttonGroup}>
          {" "}
          <Stack>
            <div>
              <Button variant="contained" className={classes.studioButtons}>
                <CheckCircleIcon className={classes.checkIcon} /> Book Now
              </Button>

              <Button
                className={classes.studioButtons}
                variant="outlined"
                color="error"
                onClick={() => {
                  console.log("Hey");
                }}
              >
                <RotateLeftIcon />
                Go Back
              </Button>
            </div>
            <div>
              <a
                href={`tel:+91${studioPhoneNumber}`}
                className={classes.contactLinks}
              >
                <Button variant="contained" className={classes.callButton}>
                  <CallIcon className={classes.callButtonIcon} /> Call
                </Button>
              </a>
              <a
                target="_blank"
                rel="noreferrer"
                href={`https://wa.me/+91${studioWhatsAppNumber}`}
                className={classes.contactLinks}
              >
                <Button variant="contained" className={classes.whatsAppButton}>
                  <WhatsAppIcon className={classes.whatsAppButtonIcon} />
                  WhatsApp
                </Button>
              </a>
            </div>
          </Stack>
        </Grid>
      </Grid>
      <Divider orientation="horizontal" flexItem />
      <Grid container>
        <Grid item xs={7} className={classes.studioAboutUs}>
          <Typography variant="h6" className={classes.subHeading}>
            About Us
          </Typography>
          <Typography variant="body" className={classes.aboutUsText}>
            {" "}
            {studioAbout}
          </Typography>
        </Grid>
        <Divider orientation="vertical" flexItem />
        <Grid item xs={4} className={classes.studioLocation}>
          <Typography variant="h6" className={classes.subHeading}>
            Location
          </Typography>
          <Stack>
            {" "}
            <Typography variant="body"> {studioAddress}</Typography>
            <Typography variant="body" className={classes.locationText}>
              {" "}
              {studioPincode}
            </Typography>
          </Stack>
        </Grid>
      </Grid>
      <Divider orientation="horizontal" flexItem />
      <Grid container className={classes.studioAlbumsPackages}>
        <Grid item xs={2} className={classes.studioAlbumsPackagesHeader}>
          <Typography variant="h6"> Albums</Typography>
        </Grid>
        <Grid item xs={10} className={classes.studioAlbumsPackages}>
          Album List
        </Grid>
      </Grid>
    </Box>
  );
}

export default StudioDashboardProfile;
