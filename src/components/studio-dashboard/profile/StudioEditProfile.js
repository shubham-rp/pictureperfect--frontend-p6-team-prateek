import { useState } from "react";
import { cities } from "../../../assets/mock-data/cities";
import { useAuthContext } from "../../../hooks/useAuthContext";
import ErrorTwoToneIcon from "@mui/icons-material/ErrorTwoTone";

import axios from "axios";
import toast from "react-hot-toast";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
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

  const [isUpdateEmailDisabled, setIsUpdateEmailDisabled] = useState(true);
  const [emailOpen, setEmailOpen] = useState(false);
  const [isEmailLoading, setIsEmailLoading] = useState(false);

  const [isUpdateNameDisabled, setIsUpdateNameDisabled] = useState(true);
  const [studioNameOpen, setStudioNameOpen] = useState(false);
  const [isStudioNameLoading, setIsStudioNameLoading] = useState(false);

  const handleEditStudioName = (e) => {
    e.preventDefault();

    if (e.target.value !== "" && e.target.value !== studioName) {
      setIsUpdateNameDisabled(false);
    }

    if (e.target.value === "" || e.target.value === studioName) {
      setIsUpdateNameDisabled(true);
    }

    setStudioNameValue(e.target.value);
  };

  const handleUpdateStudioName = (e) => {
    e.preventDefault();
    setStudioNameOpen(false);
    setIsStudioNameLoading(true);

    axios
      .put(
        `${process.env.REACT_APP_BACKEND_API_URL}/api/studios/profile/name`,
        {
          studioNameValue,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then((response) => {
        toast.success("Studio Name Successfully updated!");
        console.log(response.data);
        setIsEmailLoading(false);
      })
      .catch((error) => {
        toast.error("Studio Name not updated");

        setIsEmailLoading(false);
        console.error(error);
      });

    console.log(studioEmailValue);
  };

  const handleStudioNameOpen = () => {
    setStudioNameOpen(true);
  };

  const handleStudioNameClose = () => {
    setStudioNameOpen(false);
  };

  const handleEditStudioEmail = (e) => {
    e.preventDefault();

    if (e.target.value !== "" && e.target.value !== user.email) {
      setIsUpdateEmailDisabled(false);
    }

    if (e.target.value === "" || e.target.value === user.email) {
      setIsUpdateEmailDisabled(true);
    }

    setStudioEmailValue(e.target.value);
  };

  const handleUpdateStudioEmail = (e) => {
    e.preventDefault();
    setEmailOpen(false);
    setIsEmailLoading(true);

    axios
      .put(
        `${process.env.REACT_APP_BACKEND_API_URL}/api/studios/profile/email`,
        {
          studioEmailValue,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then((response) => {
        toast.success("Email Successfully updated!");
        console.log(response.data);
        setIsEmailLoading(false);
      })
      .catch((error) => {
        toast.error("Email not updated");

        setIsEmailLoading(false);
        console.error(error);
      });

    console.log(studioEmailValue);
  };

  const handleEmailOpen = () => {
    setEmailOpen(true);
  };

  const handleEmailClose = () => {
    setEmailOpen(false);
  };

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
                  onChange={handleEditStudioName}
                />
              </Grid>
              <Button
                variant="contained"
                className={classes.editProfileButton}
                onClick={handleStudioNameOpen}
                disabled={isUpdateNameDisabled}
              >
                Update Studio Name
              </Button>
              <Dialog
                open={studioNameOpen}
                onClose={handleStudioNameClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle
                  id="alert-dialog-title"
                  className={classes.dialogAlertHeader}
                >
                  <ErrorTwoToneIcon />
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Are you sure you want to update your Studio name ?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleStudioNameClose}>No</Button>
                  <Button onClick={handleUpdateStudioName} autoFocus>
                    Yes
                  </Button>
                </DialogActions>
              </Dialog>
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
                onChange={handleEditStudioEmail}
              />
            </Grid>

            <Grid item xs={7}>
              {" "}
              <Button
                variant="contained"
                className={classes.editProfileButton}
                onClick={handleEmailOpen}
                disabled={isUpdateEmailDisabled}
              >
                Verify & Update Email
              </Button>
              <Dialog
                open={emailOpen}
                onClose={handleEmailClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle
                  id="alert-dialog-title"
                  className={classes.dialogAlertHeader}
                >
                  <ErrorTwoToneIcon />
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Are you sure you want to update your email ?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleEmailClose}>No</Button>
                  <Button onClick={handleUpdateStudioEmail} autoFocus>
                    Yes
                  </Button>
                </DialogActions>
              </Dialog>
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
