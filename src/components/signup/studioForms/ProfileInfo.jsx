import React, { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Typography } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { FormHelperText } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputAdornment from "@mui/material/InputAdornment";
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => {
  return {
    root: {
      bgcolor: "background.paper",
      borderColor: "grey.500",
      border: 1,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "1rem",
      borderRadius: "1px",
    },

    loginItems: {
      justifyContent: "center",
      alignItems: "center",
    },
    loginImageContainer: {
      height: "100vh",
    },
    loginImage: {
      marginRight: "auto",
      marginLeft: "auto",
      height: "98%",
    },
    loginTextField: {
      width: 507,
      "@media (max-width: 720px)": {
        width: 400,
      },
    },
    nameTextField: {
      width: 507,
      "@media (max-width: 720px)": {
        width: 400,
      },
    },
    signInButton: {
      width: 150,
      height: 30,
      fontSize: 15,
      borderRadius: 24,
    },
    signUpHeading: {
      color: theme.palette.primary.main,
    },
    dropDown: {
      width: 300,
    },
    mainBox: {
      marginLeft: 220,
    },
    logoImage: {
      width: 120,
      height: 48,
    },
    navBarIcons: { display: "flex", justifyContent: "space-between" },

    accountIcon: { width: 120, height: 48 },
    drawer: { display: "flex", flexDirection: "column", alignItems: "center" },
    categoryWidth: {
      width: 507,
      "@media (max-width: 720px)": {
        width: 400,
      },
    },
    style: {
      position: "absolute",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 400,
      background: "white",
      border: "2px solid #000",
      boxShadow: 24,
      p: 4,
    },
    imageWidth: {
      width: 400,
    },
    pictureButtons: {
      display: "flex",
      justifyContent: "center",
    },
  };
});

export default function ProfileInfo(props) {
  const { classes } = useStyles();

  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  useEffect(() => {
    if (props.values.studioProfilePicture !== "") {
      setIsImageUploaded(true);
    } else {
      setIsImageUploaded(false);
    }
  }, [props.values.studioProfilePicture]);

  return (
    <div>
      <Stack
        direction="row"
        alignItems="center"
        spacing={2}
        className={classes.pictureButtons}
      >
        <Button variant="contained" component="label">
          Upload Profile Picture
          <input
            onChange={props.imageHandler}
            hidden
            accept="image/jpg"
            multiple
            type="file"
          />
        </Button>
        {isImageUploaded && (
          <Button variant="contained" onClick={handleModalOpen}>
            View Profile Picture
          </Button>
        )}
        <Modal
          open={modalOpen}
          onClose={handleModalClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className={classes.style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Profile Picture
            </Typography>
            {props.values.studioProfilePicture !== "" ? (
              <img
                className={classes.imageWidth}
                src={props.values.studioProfilePicture}
                alt="person will upload"
              />
            ) : (
              ""
            )}
          </Box>
        </Modal>
      </Stack>

      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1 },
        }}
        noValidate
        autoComplete="off"
      >
        <Stack spacing={2} className={classes.loginItems}>
          <div>
            {!!props.errorMessage.studioCategory && (
              <span style={{ color: "red" }}>
                {props.errorMessage.studioCategory}
              </span>
            )}
          </div>
          <Box className={classes.categoryWidth}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Category*</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                name="studioCategory"
                value={props.values.studioCategory}
                label="Category"
                onChange={props.handler}
                multiple={true}
              >
                {props.categories.map((category, index) => {
                  return (
                    <MenuItem key={index} value={category.categoryName}>
                      {category.categoryName}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Box>
          <FormControl>
            <TextField
              id="studioDailyRate"
              value={props.values.studioDailyRate}
              className={classes.loginTextField}
              onChange={props.handler}
              label="Daily Rate*"
              type="number"
              placeholder=""
              inputProps={{ maxLength: 5 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">₹</InputAdornment>
                ),
              }}
              multiline
              error={props.errorMessage.studioDailyRate}
            />
            {props.errorMessage.studioDailyRate && (
              <FormHelperText error>
                {props.errorMessage.studioDailyRate}
              </FormHelperText>
            )}
          </FormControl>
          <div>
            {!!props.errorMessage.studioServiceLocations && (
              <span style={{ color: "red" }}>
                {props.errorMessage.studioServiceLocations}
              </span>
            )}
          </div>

          <FormControl>
            <TextField
              className={classes.loginTextField}
              id="studioAbout"
              value={props.values.studioAbout}
              label="Write a few words about your Photo Studio*"
              onChange={props.handler}
              multiline
              rows={4}
              error={props.errorMessage.studioAbout}
            />
            {props.errorMessage.studioAbout && (
              <FormHelperText error>
                {props.errorMessage.studioAbout}
              </FormHelperText>
            )}
          </FormControl>
          <Button
            className={classes.signInButton}
            onClick={props.goback}
            variant="contained"
          >
            Go Back
          </Button>
          <Button
            className={classes.signInButton}
            onClick={props.handleSubmit}
            variant="contained"
            disabled={props.disabled}
          >
            Submit
          </Button>
        </Stack>
      </Box>
    </div>
  );
}
