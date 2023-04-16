import React from "react";
import { Box, Stack, Button, CssBaseline, Typography } from "@mui/material";
import { makeStyles } from "tss-react/mui";
import CheckCircleTwoToneIcon from "@mui/icons-material/CheckCircleTwoTone";
import { Link } from "react-router-dom";

const useStyles = makeStyles()((theme) => {
  return {
    paymentDetailsBox: {
      marginTop: 50,
      padding: 50,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
    },
    successIconWrapper: {
      textAlign: "center",
    },
    goToHomeButtonWrapper: {
      textAlign: "center",
    },
    goToHomeButton: {
      width: 175,
      height: 48,
      fontSize: 14,
      borderRadius: 24,
    },
    successIcon: {
      color: "green",
      width: 75,
      height: 75,
    },
    bookingText: {
      fontWeight: "bolder",
    },
    goBackButtonLink: {
      textDecoration: "none",
    },
  };
});

function BookingConfirmation({ bookingId }) {
  const { classes } = useStyles();
  return (
    <>
      <CssBaseline />
      <Box
        className={classes.paymentDetailsBox}
        border={2}
        sx={{ borderColor: "primary.main" }}
        borderRadius={16}
      >
        <Stack spacing={4}>
          <Box className={classes.successIconWrapper}>
            <CheckCircleTwoToneIcon className={classes.successIcon} />
          </Box>

          <Typography variant="h5">Your booking is successful.</Typography>

          <Typography variant="h6">
            <span className={classes.bookingText}>Booking Id:</span> {bookingId}
          </Typography>
          <Box className={classes.goToHomeButtonWrapper}>
            <Link to="/dashboard" className={classes.goBackButtonLink}>
              <Button
                variant="contained"
                className={classes.goToHomeButton}
                type="submit"
              >
                Go To Home
              </Button>
            </Link>
          </Box>
        </Stack>
      </Box>
    </>
  );
}

export default BookingConfirmation;
