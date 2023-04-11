import React from "react";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { FormHelperText } from "@mui/material";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import { makeStyles } from "tss-react/mui";

import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

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
      // justifyContent: "center",
      alignItems: "center",
    },

    nameTextField: {
      width: 240,
      marginRight: 12,
      marginLeft: 12,
    },
    signInButton: {
      width: 150,
      height: 30,
      fontSize: 15,
      borderRadius: 24,
    },
    categoryWidth: {
      width: 550,
    },
  };
});

export default function ContactDetails(props) {
  const { classes } = useStyles();
  return (
    <div>
      {/* <div>
        {!!props.errorMessage && (
          <span style={{ color: "red" }}>{props.errorMessage}</span>
        )}
      </div> */}
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "70ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <Stack spacing={1} className={classes.loginItems}>
          <FormControl>
            <TextField
              id="studioAddress"
              value={props.values.studioAddress}
              className={classes.nameTextField}
              onChange={props.handler}
              label="Address*"
              multiline
              rows={4}
              error={props.errorMessage.studioAddress}
            />
            {props.errorMessage.studioAddress && (
              <FormHelperText error>
                {props.errorMessage.studioAddress}
              </FormHelperText>
            )}
          </FormControl>
          {/* <div>
            {!!props.errorMessage.studioAddress && (
              <span style={{ color: "red" }}>
                {props.errorMessage.studioAddress}
              </span>
            )}
          </div> */}
          <Box className={classes.categoryWidth}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">City</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                name="studioCity"
                value={props.values.studioCity}
                label="City"
                onChange={props.handler}
              >
                {props.cities.map((city, index) => {
                  return (
                    <MenuItem key={index} value={city.cityName}>
                      {city.cityName}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Box>
          {/* <TextField
            id="studioCity"
            value={props.values.studioCity}
            className={classes.nameTextField}
            onChange={props.handler}
            label="City*"
            multiline
            maxRows={4}
          /> */}
          <div>
            {!!props.errorMessage.studioCity && (
              <span style={{ color: "red" }}>
                {props.errorMessage.studioCity}
              </span>
            )}
          </div>
          <FormControl>
            <TextField
              id="studioPincode"
              value={props.values.studioPincode}
              className={classes.nameTextField}
              onChange={props.handler}
              label="Pin Code*"
              type="number"
              placeholder=""
              inputProps={{ maxLength: 6 }}
              multiline
              error={props.errorMessage.studioPincode}
            />
            {props.errorMessage.studioPincode && (
              <FormHelperText error>
                {props.errorMessage.studioPincode}
              </FormHelperText>
            )}
          </FormControl>
          {/* <div>
            {!!props.errorMessage.studioPincode && (
              <span style={{ color: "red" }}>
                {props.errorMessage.studioPincode}
              </span>
            )}
          </div> */}
          <FormControl>
            <TextField
              id="studioPhoneNumber"
              value={props.values.studioPhoneNumber}
              className={classes.nameTextField}
              onChange={props.handler}
              label="Phone Number*"
              inputProps={{ maxLength: 10 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">+91</InputAdornment>
                ),
              }}
              type="tel"
              placeholder=""
              error={props.errorMessage.studioPhoneNumber}
            />
            {props.errorMessage.studioPhoneNumber && (
              <FormHelperText error>
                {props.errorMessage.studioPhoneNumber}
              </FormHelperText>
            )}
          </FormControl>
          <FormControl>
            <TextField
              id="studioWhatsAppNumber"
              value={props.values.studioWhatsAppNumber}
              className={classes.nameTextField}
              onChange={props.handler}
              label="Whatsapp Number*"
              inputProps={{ maxLength: 10 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">+91</InputAdornment>
                ),
              }}
              type="tel"
              placeholder=""
              error={props.errorMessage.studioWhatsAppNumber}
            />
            {props.errorMessage.studioWhatsAppNumber && (
              <FormHelperText error>
                {props.errorMessage.studioWhatsAppNumber}
              </FormHelperText>
            )}
          </FormControl>
          {/* <div>
            {!!props.errorMessage.StudioPhoneNumber && (
              <span style={{ color: "red" }}>
                {props.errorMessage.StudioPhoneNumber}
              </span>
            )}
          </div> */}
          <Button
            className={classes.signInButton}
            onClick={props.goback}
            variant="contained"
          >
            Go Back
          </Button>
          <Button
            className={classes.signInButton}
            onClick={props.continue}
            variant="contained"
            disabled={props.disabled}
          >
            Continue
          </Button>
        </Stack>
      </Box>
    </div>
  );
}
