import React from "react";
import { cities } from "../../assets/mock-data/cities";

import {
  Divider,
  Toolbar,
  Typography,
  Button,
  TextField,
  Autocomplete,
  Grid,
} from "@mui/material";
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
  };
});

const ClientEditProfile = () => {
  const { classes } = useStyles();
  return (
    <div>
      <Toolbar />
      <Typography paragraph>Edit Profile</Typography>
      <Typography paragraph>
        <Grid container xs={12} spacing={2} sx={{ padding: 4 }}>
          <Grid item xs={6}>
            <TextField
              id="outlined-basic"
              label="Edit Name"
              variant="outlined"
              className={classes.basicDetailsTextInputField}
            />
          </Grid>
          <Grid item xs={6}>
            <Autocomplete
              freeSolo
              id="free-solo-2-demo"
              disableClearable
              options={cities.map((city) => city.cityName)}
              renderInput={(params) => (
                <TextField
                  className={classes.basicDetailsTextInputField}
                  {...params}
                  label="Edit Default City"
                  InputProps={{
                    ...params.InputProps,
                    type: "search",
                  }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} className={classes.editProfileButtonWrapper}>
            {" "}
            <Button variant="contained" className={classes.editProfileButton}>
              Update Basic Details
            </Button>
          </Grid>
        </Grid>
      </Typography>
      <Divider />
      <Grid container xs={12} spacing={2} sx={{ padding: 4 }}>
        <Grid item xs={5}>
          <TextField
            id="outlined-basic"
            label="Edit Email Id"
            variant="outlined"
            className={classes.emailIdTextField}
          />
        </Grid>

        <Grid item xs={7}>
          {" "}
          <Button variant="contained" className={classes.editProfileButton}>
            Verify & Update Email
          </Button>
        </Grid>
      </Grid>

      <Divider />
      <Grid
        container
        xs={12}
        spacing={2}
        sx={{ padding: 4, textAlign: "center" }}
      >
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
      </Grid>
    </div>
  );
};

export default ClientEditProfile;
