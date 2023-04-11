import React from "react";

import { Typography, Button, TextField, Stack, Grid } from "@mui/material";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => {
  return {
    editProfileButtonWrapper: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    editProfileButton: {
      borderRadius: 24,
    },
    updatePasswordButton: {
      borderRadius: 24,
      backgroundColor: "#B3261E",
    },
    basicDetailsTextInputField: {
      width: 333,
    },
    emailIdTextField: {
      width: 429,
    },
    passwordField: {
      width: 500,
    },
    goBackButton: {
      margin: 16,
      textAlign: "right",
      borderRadius: 16,
    },
  };
});

function StudioUpdatePassword({ setUpdatePasswordView }) {
  const { classes } = useStyles();
  return (
    <div>
      <Stack spacing={4} sx={{ padding: 4, textAlign: "center" }}>
        <div className={classes.goBackButton}>
          {" "}
          <Button
            variant="outlined"
            color="error"
            onClick={() => {
              setUpdatePasswordView(false);
            }}
          >
            <RotateLeftIcon />
            Go back
          </Button>
        </div>

        <Typography variant="h5">Change & Update Password</Typography>
        <Grid item xs={12}>
          <TextField
            id="outlined-password-input"
            label="Old Password"
            type="password"
            autoComplete="current-password"
            className={classes.passwordField}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-password-input"
            label="New Password"
            type="password"
            autoComplete="current-password"
            className={classes.passwordField}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-password-input"
            label="Re-enter New Password"
            type="password"
            autoComplete="current-password"
            className={classes.passwordField}
          />
        </Grid>

        <Grid item xs={12}>
          {" "}
          <Button variant="contained" className={classes.updatePasswordButton}>
            Update Password
          </Button>
        </Grid>
      </Stack>
    </div>
  );
}

export default StudioUpdatePassword;
