import { useState, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import axios from "axios";
import { makeStyles } from "tss-react/mui";
import { Box, Button, Typography } from "@mui/material";

const useStyles = makeStyles()((theme) => {
  return {
    signInButton: {
      width: 175,
      height: 48,
      fontSize: 11,
      borderRadius: 24,
    },
  };
});

export default function BookingFlow({
  studioDailyRate,
  numberOfDays,
  totalAmount,
  handleProccedToPayments,
}) {
  const { classes } = useStyles();

  const paymentHandler = async (amount) => {
    // const { data } = await axios.get("http://localhost:7000", {
    //   amount,
    // });
  };

  return (
    <Box>
      <CssBaseline />
      Go back on booking payment
      <Typography>Studio Daily Rate: ₹{studioDailyRate}</Typography>
      <Typography>Number of Days: {numberOfDays}</Typography>
      <Typography>Total Amount: ₹{totalAmount}</Typography>
      <Button
        variant="contained"
        className={classes.signInButton}
        type="submit"
        onClick={handleProccedToPayments}
      >
        Pay
      </Button>
    </Box>
  );
}
