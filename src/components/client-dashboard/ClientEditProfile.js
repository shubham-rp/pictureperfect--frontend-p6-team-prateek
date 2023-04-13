import { useState } from "react";
import { CircularProgress } from "@mui/material";
import axios from "axios";
import { useAuthContext } from "../../hooks/useAuthContext";
import ErrorTwoToneIcon from "@mui/icons-material/ErrorTwoTone";

import toast from "react-hot-toast";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Toolbar,
  Typography,
  Button,
  TextField,
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
    dialogAlertHeader: {
      textAlign: "center",
      color: "red",
      fontSize: 32,
    },
  };
});

const ClientEditProfile = ({
  clientFirstName,
  clientLastName,
  clientDefaultCity,
}) => {
  const { classes } = useStyles();
  const { user } = useAuthContext();
  const [editUserFirstName, setEditUserFirstName] = useState(clientFirstName);
  const [editUserLastName, setEditUserLastName] = useState(clientLastName);
  const [editUserEmail, setEditUserEmail] = useState(user.email);
  const [basicDetailsOpen, setBasicDetailsOpen] = useState(false);
  const [isUpdateBasicDetailsDisabled, setIsUpdateBasicDetailsDisabled] =
    useState(true);

  const [emailOpen, setEmailOpen] = useState(false);
  const [passwordOpen, setPasswordOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleUserFirstName = (e) => {
    e.preventDefault();

    if (e.target.value !== clientFirstName && e.target.value !== "") {
      setIsUpdateBasicDetailsDisabled(false);
    }

    if (e.target.value === "" || editUserLastName === "") {
      setIsUpdateBasicDetailsDisabled(true);
    }

    if (
      e.target.value === clientFirstName &&
      editUserLastName === clientLastName
    ) {
      setIsUpdateBasicDetailsDisabled(true);
    }

    setEditUserFirstName(e.target.value);
  };

  const handleUserLastName = (e) => {
    e.preventDefault();

    if (e.target.value !== clientLastName && e.target.value !== "") {
      setIsUpdateBasicDetailsDisabled(false);
    }

    if (e.target.value === "" || editUserFirstName === "") {
      setIsUpdateBasicDetailsDisabled(true);
    }
    if (
      e.target.value === clientLastName &&
      editUserFirstName === clientFirstName
    ) {
      setIsUpdateBasicDetailsDisabled(true);
    }

    setEditUserLastName(e.target.value);
  };

  const handleUpdateBasicDetails = async (e) => {
    // handle axios request to update basic details
    e.preventDefault();
    setBasicDetailsOpen(false);
    setIsLoading(true);

    axios
      .get(
        `${process.env.REACT_APP_BACKEND_API_URL}/api/client/profile`,
        {
          editUserFirstName,
          editUserLastName,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then((response) => {
        toast.success("Successfully toasted!");
        console.log(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        toast.error("Details not updated");
        setIsLoading(false);
        console.error(error);
      });

    console.log(editUserFirstName, editUserLastName);
  };

  const handleEditUserEmail = (e) => {
    e.preventDefault();

    setEditUserEmail(e.target.value);
  };

  const handleUpdateUserEmail = (e) => {
    e.preventDefault();
    console.log(editUserEmail);
  };

  const handleBasicDetailsOpen = () => {
    setBasicDetailsOpen(true);
  };

  const handleBasicDetailsClose = () => {
    setBasicDetailsOpen(false);
  };

  return (
    <div>
      <Toolbar />

      <Typography paragraph>Edit Profile</Typography>
      <Typography paragraph>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <Grid container xs={12} spacing={2} sx={{ padding: 4 }}>
            <Grid item xs={6}>
              <TextField
                id="outlined-basic"
                label="First Name"
                variant="outlined"
                className={classes.basicDetailsTextInputField}
                value={editUserFirstName}
                InputLabelProps={{ shrink: true }}
                onChange={handleUserFirstName}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="outlined-basic"
                label="Last Name"
                variant="outlined"
                className={classes.basicDetailsTextInputField}
                value={editUserLastName}
                InputLabelProps={{ shrink: true }}
                onChange={handleUserLastName}
              />
            </Grid>
            <Grid item xs={12} className={classes.editProfileButtonWrapper}>
              {" "}
              <Button
                variant="contained"
                className={classes.editProfileButton}
                onClick={handleBasicDetailsOpen}
                disabled={isUpdateBasicDetailsDisabled}
              >
                Update Basic Details
              </Button>
            </Grid>
          </Grid>
        )}

        <Dialog
          open={basicDetailsOpen}
          onClose={handleBasicDetailsClose}
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
              Are you sure you want to update your basic details ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleBasicDetailsClose}>No</Button>
            <Button onClick={handleUpdateBasicDetails} autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </Typography>
      <Divider />
      <Grid container xs={12} spacing={2} sx={{ padding: 4 }}>
        <Grid item xs={5}>
          <TextField
            id="outlined-basic"
            label="Edit Email Id"
            variant="outlined"
            className={classes.emailIdTextField}
            value={editUserEmail}
            onChange={handleEditUserEmail}
          />
        </Grid>

        <Grid item xs={7}>
          {" "}
          <Button
            variant="contained"
            className={classes.editProfileButton}
            onClick={handleUpdateUserEmail}
          >
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
