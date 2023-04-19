import { useContext } from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { makeStyles } from "tss-react/mui";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Box } from "@mui/material";

import {
  StudioProfileDisplayContext,
  StudioProfileDataContext,
} from "./ClientDashboardLayout";

const useStyles = makeStyles()((theme) => {
  return {
    star: {
      color: "#FFD700",
    },
    cardTitle: {
      textAlign: "left",
    },
    cardText: {
      textAlign: "left",
      fontSize: 16,
      display: "flex",
      alignItems: "center",
      flexWrap: "wrap",
      color: theme.palette.primary.main,
    },
    categoryText: {
      textAlign: "left",
      fontSize: 14,
      padding: 8,
    },
    categoryTextItem: {
      display: "inline-block",
      color: "white",
      backgroundColor: "#7D5260",
      padding: 2,
      borderRadius: 3,
      margin: 2,
    },
    bookNowLink: {
      textDecoration: "none",
    },
    buttonGroup: {
      textAlign: "right",
    },
    button: {
      marginTop: 8,
      marginBottom: 4,
      marginLeft: 2,
      marginRight: 2,
      borderRadius: 16,
    },
    cardWrapper: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  };
});

export default function StudioCard({
  isStarred = false,
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
  albums,
}) {
  const { classes } = useStyles();
  const { setComponentToBeDisplayed } = useContext(StudioProfileDisplayContext);
  const { setStudioData } = useContext(StudioProfileDataContext);
  return (
    <Box className={classes.cardWrapper}>
      <Card sx={{ width: 320, borderRadius: 4, margin: 2 }}>
        <CardHeader
          className={classes.cardTitle}
          avatar={<Avatar alt={studioName} src={studioProfilePicture} />}
          action={
            <IconButton aria-label="settings">
              {isStarred ? (
                <StarIcon className={classes.star} />
              ) : (
                <StarBorderIcon />
              )}
            </IconButton>
          }
          titleTypographyProps={{ variant: "h6" }}
          title={studioName}
        />
        <CardMedia
          component="img"
          height="194"
          src={studioProfilePicture}
          alt="Wedding"
        />
        <CardContent>
          <Typography
            variant="body2"
            color="text.secondary"
            className={classes.cardText}
          >
            <LocationOnIcon />
            {studioCity}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            className={classes.categoryText}
          >
            {studioCategory?.map((category, index) => {
              return (
                <p key={index} className={classes.categoryTextItem}>
                  {category}
                </p>
              );
            })}
          </Typography>
          <span className={classes.buttonGroup}>
            <Button
              variant="outlined"
              className={classes.button}
              onClick={() => {
                setComponentToBeDisplayed("studioProfile");
                setStudioData({
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
                  albums,
                });
              }}
            >
              View Details
            </Button>

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
                studioDailyRate,
                albums,
              }}
            >
              <Button variant="contained" className={classes.button}>
                Book Now
              </Button>
            </Link>
          </span>
        </CardContent>
      </Card>
    </Box>
  );
}
