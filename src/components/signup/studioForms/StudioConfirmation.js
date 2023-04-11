import React from "react";
import { Link } from "react-router-dom";
import { Button, Typography } from "@mui/material";

function StudioConfirmation() {
  return (
    <div>
      <Typography>Your details have been successfully submitted. </Typography>
      <Typography>Our Team is evaluating your profile.</Typography>
      <Typography>
        You will receive an email shortly on your registered email address
        regarding activation of your profile.
      </Typography>
      <Link to="/">
        <Button>Go To Home</Button>
      </Link>
    </div>
  );
}

export default StudioConfirmation;
