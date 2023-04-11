import React from "react";
import { Typography } from "@mui/material";

function ClientBookingCard({
  bookingDate,
  fromDate,
  toDate,
  userAddress,
  userAlternateContactNumber,
  userContactNumber,
  userEmail,
  userName,
  userPinCode,
  userSelectCategory,
}) {
  return (
    <div>
      <Typography>
        {userSelectCategory}
        {userName} {userAddress} {userPinCode}
      </Typography>
      <Typography>
        {userAlternateContactNumber} {userContactNumber}
      </Typography>
      <Typography>{userEmail}</Typography>
      <Typography>
        {bookingDate} {fromDate} {toDate}
      </Typography>
    </div>
  );
}

export default ClientBookingCard;
