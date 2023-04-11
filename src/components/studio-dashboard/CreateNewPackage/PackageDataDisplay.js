import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import { makeStyles } from "tss-react/mui";
import Button from "@mui/material/Button";
import { cardData } from "./sampleCardData";

const useStyles = makeStyles()((theme) => {
  return {
    mainGrid: {
      display: "flex",
      justifyContent: "space-evenly",
    },
    signInButton: {
      width: 175,
      height: 48,
      fontSize: 11,
      borderRadius: 24,
      marginLeft: 450,
      // background: "#6750a4",
      // color: "white",
    },
  };
});
export default function PackageDataDisplay({ id }) {
  const packageDetails = cardData.filter((card) => card.id === id);
  const { classes } = useStyles();

  return (
    <Grid className={classes.mainGrid}>
      <Stack spacing={4}>
        <Typography style={{ fontWeight: "800" }}>Package Name</Typography>
        <Typography style={{ fontWeight: "800" }}>Event Rate</Typography>
        <Typography style={{ fontWeight: "800" }}>Daily Rate</Typography>
        <Typography style={{ fontWeight: "800" }}>Hourly Rate</Typography>
        <Typography style={{ fontWeight: "800" }}>Category</Typography>
        <Typography style={{ fontWeight: "800" }}>Package Contents</Typography>
        <Typography style={{ fontWeight: "800" }}>
          Optional Pakage Contents
        </Typography>
      </Stack>
      <Stack spacing={4}>
        <Typography style={{ fontWeight: "800" }} color="red">
          {packageDetails[0].packageName}
        </Typography>
        <Typography style={{ fontWeight: "800" }} color="red">
          {packageDetails[0].eventRate}
        </Typography>
        <Typography style={{ fontWeight: "800" }} color="red">
          {packageDetails[0].dailyRate}
        </Typography>
        <Typography style={{ fontWeight: "800" }} color="red">
          {packageDetails[0].hourlyRate}
        </Typography>
        <Typography style={{ fontWeight: "800" }} color="red">
          {packageDetails[0].packageCategory}
        </Typography>
        <Typography style={{ fontWeight: "800" }} color="red">
          {packageDetails[0].packageContents}
        </Typography>
        <Typography style={{ fontWeight: "800" }} color="red">
          {packageDetails[0].optionalPakageContents}
        </Typography>
      </Stack>
    </Grid>
  );
}
