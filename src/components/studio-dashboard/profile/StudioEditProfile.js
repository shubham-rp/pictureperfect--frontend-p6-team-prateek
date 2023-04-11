import { useState } from "react";
import { cities } from "../../../assets/mock-data/cities";

import {
  Box,
  Divider,
  Toolbar,
  Button,
  TextField,
  Autocomplete,
  Grid,
  Stack,
} from "@mui/material";
import { makeStyles } from "tss-react/mui";

import StudioUpdatePassword from "./StudioUpdatePassword";

const useStyles = makeStyles()((theme) => {
  return {
    editProfileButtonWrapper: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      margin: 8,
    },
    editProfileButton: {
      borderRadius: 24,
    },
    updatePasswordButtonWrapper: {
      display: "flex",
      justifyContent: "right",
    },
    updatePasswordButton: {
      borderRadius: 24,
      height: 32,
      backgroundColor: "#B3261E",
    },
    basicDetailsTextInputField: {
      width: "90%",
    },
    addressTextInputField: {
      width: "90%",
    },
    emailIdTextField: {
      width: 429,
    },
    passwordField: {
      width: 500,
    },
  };
});

function StudioEditProfile() {
  const { classes } = useStyles();
  const [updatePasswordView, setUpdatePasswordView] = useState(false);

  return (
    <>
      {updatePasswordView ? (
        <StudioUpdatePassword setUpdatePasswordView={setUpdatePasswordView} />
      ) : (
        <>
          <Toolbar />
          <Box className={classes.updatePasswordButtonWrapper}>
            {" "}
            <Button
              variant="contained"
              className={classes.updatePasswordButton}
              onClick={() => {
                setUpdatePasswordView(true);
              }}
            >
              Update Password
            </Button>
          </Box>
          <Stack>
            <Grid container xs={12} spacing={2} sx={{ padding: 2 }}>
              <Grid item xs={6}>
                <TextField
                  id="outlined-basic"
                  label="Studio Name"
                  variant="outlined"
                  className={classes.basicDetailsTextInputField}
                />
              </Grid>
              <Grid container item xs={6} spacing={3}>
                <Grid item xs={4}>
                  <TextField
                    id="outlined-basic"
                    label="Calling Number"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    id="outlined-basic"
                    label="WhatsApp Number"
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid container xs={12} sx={{ padding: 2 }}>
              <Grid item xs={6}>
                <TextField
                  id="outlined-basic"
                  label="Address"
                  variant="outlined"
                  multiline
                  rows={4}
                  className={classes.addressTextInputField}
                />
              </Grid>
              <Grid container item xs={6} spacing={3}>
                <Grid item xs={4}>
                  <Autocomplete
                    freeSolo
                    id="free-solo-2-demo"
                    disableClearable
                    options={cities.map((city) => city.cityName)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="City"
                        InputProps={{
                          ...params.InputProps,
                          type: "search",
                        }}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    id="outlined-basic"
                    label="Pin Code"
                    variant="outlined"
                  />
                </Grid>
              </Grid>{" "}
            </Grid>
            <Box className={classes.editProfileButtonWrapper}>
              <Button variant="contained" className={classes.editProfileButton}>
                Update Basic Details
              </Button>
            </Box>
          </Stack>
          <Divider />
          <Grid container xs={12} spacing={2} sx={{ padding: 4 }}>
            <Grid item xs={5}>
              <TextField
                id="outlined-basic"
                label="Email Id"
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

          <Grid container spacing={2}>
            <Grid item xs={12}>
              category(s)
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="outlined-basic"
                label="Service Location(s)"
                variant="outlined"
                className={classes.basicDetailsTextInputField}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="outlined-basic"
                label="Language(s) Known"
                variant="outlined"
                className={classes.basicDetailsTextInputField}
              />
            </Grid>
            <Grid item xs={12} sx={{ padding: 2 }}>
              <TextField
                id="outlined-basic"
                label="About Photo Studio"
                variant="outlined"
                multiline
                rows={4}
                className={classes.addressTextInputField}
              />
            </Grid>
          </Grid>
        </>
      )}{" "}
    </>
  );
}

export default StudioEditProfile;
