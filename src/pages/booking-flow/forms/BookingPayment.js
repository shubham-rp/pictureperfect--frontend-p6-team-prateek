import CssBaseline from "@mui/material/CssBaseline";
import { makeStyles } from "tss-react/mui";
import { Box, Button, Stack, Typography } from "@mui/material";

const useStyles = makeStyles()((theme) => {
  return {
    paymentButton: {
      width: 175,
      height: 48,
      fontSize: 14,
      borderRadius: 24,
    },
    paymentButtonWrapper: {
      textAlign: "center",
    },

    paymentDetailsBox: {
      marginTop: 50,
      padding: 50,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },

    paymentDetailsText: {
      fontSize: 18,
      textAlign: "center",
    },
    paymentDetailsHeader: {
      fontWeight: "bold",
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
          <Typography className={classes.paymentDetailsText}>
            <span className={classes.paymentDetailsHeader}>
              Studio Daily Rate:
            </span>{" "}
            ₹{studioDailyRate}
          </Typography>
          <Typography className={classes.paymentDetailsText}>
            <span className={classes.paymentDetailsHeader}>
              Number of Days:
            </span>{" "}
            {numberOfDays}
          </Typography>
          <Typography className={classes.paymentDetailsText}>
            <span className={classes.paymentDetailsHeader}>Total Amount:</span>{" "}
            ₹{totalAmount}
          </Typography>
          <Box className={classes.paymentButtonWrapper}>
            <Button
              variant="contained"
              className={classes.paymentButton}
              type="submit"
              onClick={handleProccedToPayments}
            >
              Proceed To Pay
            </Button>
          </Box>
        </Stack>
      </Box>
    </>
  );
}
