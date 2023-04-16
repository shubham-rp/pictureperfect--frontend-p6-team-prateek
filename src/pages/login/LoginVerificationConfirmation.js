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
      height: 48,
      fontSize: 20,
      textTransform: "none",
      background: "#7D5260",
      borderRadius: 20,
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
      height: "100vh",
      background: `linear-gradient(to right, rgb(161, 255, 206, 0.3), rgb(250, 255, 209, 0.3))`,
    },
    confirmationStack: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 200,
    },
  };
});

function LoginVerificationConfirmation() {
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
        <Typography variant="h5">
          Thanks for registering with us. We'll contact you via email shortly{" "}
        </Typography>

        <Link to="/" className={classes.contactUsLink}>
          <Button
            variant="contained"
            className={classes.contactUsButton}
            onClick={() => {
              logout();
            }}
          >
            Go To Home
          </Button>
        </Link>

        <Typography className={classes.contactUsText} variant="h5">
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

export default LoginVerificationConfirmation;
