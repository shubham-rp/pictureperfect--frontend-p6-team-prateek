import React from "react";
import { Link } from "react-router-dom";
import { useLogout } from "../../hooks/useLogout";
import { makeStyles } from "tss-react/mui";
import { Box, Button, Stack, Tooltip, Typography } from "@mui/material";

import ppLogo from "../../images/pp-logo.png";

const useStyles = makeStyles()((theme) => {
  return {
    contactUsText: {
      display: "inline-flex",
      flexDirection: "row",
    },
    contactUsLink: {
      textDecoration: "none",
      color: theme.palette.primary.main,
    },
    contactUsButton: {
      margin: 13,
      height: 72,
      fontSize: 28,
      textTransform: "none",
      background: "#7D5260",
      borderRadius: 100,
      "@media (max-width: 1024px)": {
        height: 48,
        fontSize: 20,
        margin: 8,
      },
    },

    confirmationBox: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      height: "100%",
    },
    confirmationStack: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 200,
    },
  };
});

function RegisterPhotoStudioConfirmation() {
  const { classes } = useStyles();
  const { logout } = useLogout();
  return (
    <Box className={classes.confirmationBox}>
      <Stack spacing={2} className={classes.confirmationStack}>
        <Tooltip title="Go To Home" placement="top">
          <Link
            to="/"
            onClick={() => {
              logout();
            }}
          >
            <img src={ppLogo} alt="person holding camera" />
          </Link>
        </Tooltip>

        <Typography variant="h3">We Are Evaluating Your Profile </Typography>
        <Typography>
          Our Team takes an extra effort to ensure that our users can connect
          with the best photographers in their respective city.{" "}
        </Typography>
        <Typography>
          Your request for listing on our platform is pending approval from our
          team. You will receive an email shortly regarding activation of your
          profile.{" "}
        </Typography>
        <Typography className={classes.contactUsText}>
          Have any questions ?{" "}
        </Typography>
        <Link to="/contact-us" className={classes.contactUsLink}>
          <Button
            variant="contained"
            className={classes.contactUsButton}
            onClick={() => {
              logout();
            }}
          >
            Contact Us
          </Button>
        </Link>
      </Stack>
    </Box>
  );
}

export default RegisterPhotoStudioConfirmation;
