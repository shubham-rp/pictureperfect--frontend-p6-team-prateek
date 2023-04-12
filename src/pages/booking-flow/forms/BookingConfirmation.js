import React from "react";
import { Typography } from "@mui/material";

function BookingConfirmation({ bookingId }) {
  return (
    <div>
      Your booking is successful.
      <Typography variant="body">Booking Id: {bookingId}</Typography>
    </div>
  );
}

export default BookingConfirmation;
