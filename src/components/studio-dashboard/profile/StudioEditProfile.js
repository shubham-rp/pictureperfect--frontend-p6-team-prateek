import { useState } from "react";
import { cities } from "../../../assets/mock-data/cities";
import { useAuthContext } from "../../../hooks/useAuthContext";

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
    editProfileDetailsButton: {
      borderRadius: 24,
    },
    editProfileDetailsButtonWrapper: {
      display: "flex",
      justifyContent: "center",
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
      paddingTop: "10px",
    },
    emailIdTextField: {
      width: 429,
    },
    passwordField: {
      width: 500,
    },
  };
});

function StudioEditProfile({
  studio,
  studioName,
  studioCity,
  studioPhoneNumber,
  studioWhatsAppNumber,
  studioAddress,
  studioPincode,
  studioAbout,
  studioDailyRate,
}) {
  const { classes } = useStyles();
  const { user } = useAuthContext();
  const [updatePasswordView, setUpdatePasswordView] = useState(false);

  const [studioEmailValue, setStudioEmailValue] = useState(user.email);
  const [studioNameValue, setStudioNameValue] = useState(studioName);
  const [studioCityValue, setStudioCityValue] = useState(studioCity);
  const [studioPhoneNumberValue, setStudioPhoneNumberValue] =
    useState(studioPhoneNumber);
  const [studioWhatsAppNumberValue, setStudioWhatsAppNumberValue] =
    useState(studioWhatsAppNumber);
  const [studioAddressValue, setStudioAddressValue] = useState(studioAddress);
  const [studioPincodeValue, setStudioPincodeValue] = useState(studioPincode);
  const [studioAboutValue, setStudioAboutValue] = useState(studioAbout);
  const [studioDailyRateValue, setStudioDailyRateValue] =
    useState(studioDailyRate);

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
              disabled
            >
              Update Password
            </Button>
          </Box>
          <Stack>
            <Grid container xs={12} spacing={2} sx={{ padding: 2 }}>
              <Grid item xs={8}>
                <TextField
                  id="outlined-basic"
                  label="Studio Name"
                  variant="outlined"
                  className={classes.basicDetailsTextInputField}
                  value={studioNameValue}
                />
              </Grid>
              <Button variant="contained" className={classes.editProfileButton}>
                Update Studio Name
              </Button>
              <Divider />
              <Grid container item xs={8} spacing={3}>
                <Grid item xs={4}>
                  <TextField
                    id="outlined-basic"
                    label="Phone Number"
                    variant="outlined"
                    value={studioPhoneNumberValue}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    id="outlined-basic"
                    label="WhatsApp Number"
                    variant="outlined"
                    value={studioWhatsAppNumberValue}
                  />
                </Grid>
                <Button
                  variant="contained"
                  className={classes.editProfileButton}
                >
                  Update Contact Details
                </Button>
              </Grid>
            </Grid>
            <Divider />
            <Grid container xs={12} sx={{ padding: 2 }}>
              <Grid item xs={6}>
                <TextField
                  id="outlined-basic"
                  label="Address"
                  variant="outlined"
                  multiline
                  rows={4}
                  className={classes.addressTextInputField}
                  value={studioAddressValue}
                />
              </Grid>
              <Grid container item xs={6} spacing={3}>
                <Grid item xs={4}>
                  <Autocomplete
                    freeSolo
                    id="free-solo-2-demo"
                    disableClearable
                    value={studioCityValue}
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
                    value={studioPincodeValue}
                  />
                </Grid>
              </Grid>{" "}
            </Grid>
            <Box className={classes.editProfileButtonWrapper}>
              <Button variant="contained" className={classes.editProfileButton}>
                Update Location Details
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
                value={studioEmailValue}
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
              <TextField
                id="outlined-basic"
                label="Daily Rate"
                variant="outlined"
                className={classes.addressTextInputField}
                value={studioDailyRateValue}
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
                value={studioAboutValue}
              />
            </Grid>
            <Grid
              item
              xs={12}
              className={classes.editProfileDetailsButtonWrapper}
            >
              <Button
                variant="contained"
                className={classes.editProfileDetailsButton}
              >
                Update Profile Details
              </Button>
            </Grid>
          </Grid>
        </>
      )}{" "}
    </>
  );
}

export default StudioEditProfile;
