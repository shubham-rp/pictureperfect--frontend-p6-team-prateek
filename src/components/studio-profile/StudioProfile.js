import { useContext } from "react";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  Stack,
  Typography,
  CardHeader,
  Card,
  CardActions,
  CardMedia,
} from "@mui/material";

import CallIcon from "@mui/icons-material/Call";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import { Link } from "react-router-dom";
import { makeStyles } from "tss-react/mui";
import ppLogo from "../../images/cropped-pp-logo.png";

import { StudioProfileDisplayContext } from "../client-dashboard/ClientDashboardLayout";

const useStyles = makeStyles()((theme) => {
  return {
    studioProfilePicture: {
      width: 128,
      height: 128,
      marginTop: 64,
      marginBottom: 64,
      "@media (max-width: 1024px)": {
        marginTop: 0,
        marginBottom: 0,
      },
    },
    studioDetails: {
      display: "flex",
      justifyContent: "space-evenly",
      backgroundColor: "#E8DEF8",
    },
    studioButtonsStack: {
      marginTop: 64,
      marginBottom: 64,
      "@media (max-width: 1024px)": {
        marginTop: 0,
        marginBottom: 0,
      },
    },
    studioDetailsStack: {
      marginTop: 64,
      marginBottom: 64,
      "@media (max-width: 1024px)": {
        marginTop: 0,
        marginBottom: 0,
      },
    },
    studioAboutUs: {
      textAlign: "center",
    },
    studioLocation: {
      height: 150,
      textAlign: "center",
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

    callIcon: { marginRight: 4, color: theme.palette.primary.main },
    whatsAppIcon: { marginRight: 4, marginLeft: 4, color: "#12B47D" },
    checkIcon: { marginRight: 4 },
    locationIcon: { marginRight: 4 },
    bookNowLink: {
      textDecoration: "none",
    },
    subHeading: {
      color: "white",
      backgroundColor: theme.palette.primary.main,
      fontWeight: "bold",
      borderRadius: 8,
      margin: 16,
    },

    locationText: {
      marginTop: 16,
    },
    aboutUsText: {
      textAlign: "center",
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
    noAlbumText: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    albumHeader: {
      color: "white",
      backgroundColor: theme.palette.primary.main,
      padding: 2,
      borderRadius: 8,
      margin: 16,
    },
  };
});

function StudioProfile({
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
  albums,
}) {
  const { classes } = useStyles();
  const { setComponentToBeDisplayed } = useContext(StudioProfileDisplayContext);

  return (
    <Box>
      <Grid container className={classes.studioDetails}>
        <Avatar
          alt="Remy Sharp"
          src={ppLogo}
          className={classes.studioProfilePicture}
        />

        <Stack className={classes.studioDetailsStack}>
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

        <Stack className={classes.studioButtonsStack}>
          <div>
            <Link
              to="/booking-flow"
              className={classes.bookNowLink}
              state={{
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
              }}
            >
              <Button variant="contained" className={classes.studioButtons}>
                <CheckCircleIcon className={classes.checkIcon} /> Book Now
              </Button>
            </Link>
            <Button
              className={classes.studioButtons}
              variant="outlined"
              color="error"
              onClick={() => {
                setComponentToBeDisplayed("explore");
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
      <Divider orientation="horizontal" flexItem />
      <Grid container>
        <Grid item lg={8} xs={12} className={classes.studioAboutUs}>
          <Typography variant="h6" className={classes.subHeading}>
            About Us
          </Typography>
          <Typography variant="body" className={classes.aboutUsText}>
            {" "}
            {studioAbout}
          </Typography>
        </Grid>

        <Grid item lg={4} xs={12} className={classes.studioLocation}>
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
      <Grid container className={classes.studioAlbumsPackagesHeader}>
        <Typography variant="h6" className={classes.albumHeader}>
          {" "}
          Albums
        </Typography>
        <Grid
          container
          spacing={2}
          paddingTop={2}
          xm={1}
          className={classes.noAlbumText}
        >
          {albums.length ? (
            albums.map((item) => {
              return (
                <Card
                  key={item._id}
                  sx={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    flexDirection: "column",
                    maxWidth: 400,
                    height: 300,
                    width: 900,
                    marginBottom: "3%",
                    marginLeft: "4%",
                    marginTop: "0.1%",
                  }}
                >
                  <CardHeader
                    avatar={
                      <Avatar sx={{ bgcolor: "#6750A4" }} aria-label="recipe">
                        {item.name[0]}
                      </Avatar>
                    }
                    title={item.name}
                  />
                  <CardMedia
                    key={item._id}
                    image={item.images[0].imagesUrl}
                    sx={{
                      height: 250,
                      objectFit: "cover",
                    }}
                    title="green iguana"
                  />
                  <CardActions>
                    <Button
                      onClick={() => console.log("Hey")}
                      variant="contained"
                      className={classes.signInButton}
                      size="small"
                      fullWidth
                    >
                      View
                    </Button>
                  </CardActions>
                </Card>
              );
            })
          ) : (
            <Typography variant="h6" sx={{ padding: 16 }}>
              No Albums present
            </Typography>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}

export default StudioProfile;
