import * as React from "react";

import CssBaseline from "@mui/material/CssBaseline";

import { makeStyles } from "tss-react/mui";
import { Box, Button, Grid, Stack, TextField } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { FormHelperText } from "@mui/material";

import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

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
      display: "flex",
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
    },
    nameTextField: {
      width: 100,
      marginRight: 12,
      marginLeft: 12,
    },
    signInButton: {
      width: 175,
      height: 48,
      fontSize: 11,
      borderRadius: 24,
      margin: 64,
    },
    signUpHeading: {
      color: theme.palette.primary.main,
    },
    dropDown: {
      width: 400,
    },

    logoImage: {
      width: 120,
      height: 48,
    },
    navBarIcons: { display: "flex", justifyContent: "space-between" },

    accountIcon: { width: 120, height: 48 },
    drawer: { display: "flex", flexDirection: "column", alignItems: "center" },
    address: {
      width: 240,
    },
    pinCode: {
      width: 250,
    },
    gridWrapper: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  };
});

export default function BookingFlow(props) {
  const { classes } = useStyles();

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "45ch" },
      }}
    >
      <CssBaseline />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Grid item md={7} xs={12}>
          <Box className={classes.mainBox}>
            <Stack spacing={0} className={classes.loginItems}>
              <Grid>
                <Grid container xs={12} className={classes.loginItems}>
                  <Grid item md={12} lg={6} className={classes.loginItems}>
                    <TextField
                      className={classes.nameTextField}
                      label="Your Name*"
                      variant="outlined"
                      id="userName"
                      value={props.values.userName}
                      disabled
                    />
                  </Grid>
                  <Grid item md={12} lg={6} className={classes.loginItems}>
                    <TextField
                      className={classes.nameTextField}
                      label="Email ID*"
                      variant="outlined"
                      id="userEmail"
                      value={props.values.userEmail}
                      disabled
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid>
                <Grid container xs={12} className={classes.loginItems}>
                  <Grid item md={12} lg={6} className={classes.loginItems}>
                    <FormControl>
                      <TextField
                        className={classes.nameTextField}
                        label="Contact Number*"
                        variant="outlined"
                        type="tel"
                        id="userContactNumber"
                        value={props.values.userContactNumber}
                        onChange={props.handler}
                        inputProps={{ maxLength: 10 }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              +91
                            </InputAdornment>
                          ),
                        }}
                        error={props.errorMessage.userContactNumber}
                      />
                      {props.errorMessage.userContactNumber && (
                        <FormHelperText error>
                          {props.errorMessage.userContactNumber}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item md={12} lg={6} className={classes.loginItems}>
                    <FormControl>
                      <TextField
                        className={classes.nameTextField}
                        label="Alternate Contact Number"
                        variant="outlined"
                        type="tel"
                        id="userAlternateContactNumber"
                        value={props.values.userAlternateContactNumber}
                        onChange={props.handler}
                        inputProps={{ maxLength: 10 }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              +91
                            </InputAdornment>
                          ),
                        }}
                        error={props.errorMessage.userAlternateContactNumber}
                      />
                      {props.errorMessage.userAlternateContactNumber && (
                        <FormHelperText error>
                          {props.errorMessage.userAlternateContactNumber}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
              <Grid>
                <Grid container xs={12} className={classes.loginItems}>
                  <Grid item md={12} lg={6} className={classes.loginItems}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={["DatePicker"]}>
                        <DatePicker
                          label="From Date"
                          value={dayjs(props.values.fromDate)}
                          defaultValue={new Date()}
                          disablePast={true}
                          onChange={props.fromDateHandler}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </Grid>
                  <Grid item md={12} lg={6} className={classes.loginItems}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={["DatePicker"]}>
                        <DatePicker
                          label="To Date"
                          value={dayjs(props.values.toDate)}
                          disablePast={true}
                          shouldDisableDate={(day) => {
                            return day < props.values.fromDate;
                          }}
                          onChange={props.toDateHandler}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </Grid>
                </Grid>
              </Grid>

              <Grid>
                <Grid container xs={12} className={classes.loginItems}>
                  <Grid item md={12} lg={6} className={classes.loginItems}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={["DatePicker"]}>
                        <DatePicker
                          label="Visit Date"
                          value={dayjs(props.values.bookingDate)}
                          defaultValue={new Date()}
                          disablePast={true}
                          onChange={props.bookingDateHandler}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </Grid>
                  <Grid
                    item
                    md={12}
                    lg={6}
                    sx={{ paddingTop: 2, paddingLeft: 1 }}
                    className={classes.loginItems}
                  >
                    <div>
                      {!!props.errorMessage.userSelectCategory && (
                        <span style={{ color: "red" }}>
                          {props.errorMessage.userSelectCategory}
                        </span>
                      )}
                    </div>

                    <FormControl className={classes.dropDown}>
                      <InputLabel id="demo-simple-select-label">
                        Category*
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        name="userSelectCategory"
                        label="Category*"
                        value={props.values.userSelectCategory}
                        onChange={props.handler}
                      >
                        {props.studioCategories.map((category) => {
                          return (
                            <MenuItem value={category}>{category}</MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
              <Grid>
                <Grid container xs={12} className={classes.loginItems}>
                  <Grid item md={12} lg={6} className={classes.loginItems}>
                    <FormControl>
                      <TextField
                        className={classes.address}
                        label="Address*"
                        multiline
                        rows={4}
                        defaultValue=""
                        id="userAddress"
                        value={props.values.userAddress}
                        onChange={props.handler}
                        error={props.errorMessage.userAddress}
                      />
                      {props.errorMessage.userAddress && (
                        <FormHelperText error>
                          {props.errorMessage.userAddress}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item md={12} lg={6} className={classes.loginItems}>
                    <FormControl>
                      <TextField
                        className={classes.pinCode}
                        label="Pin Code*"
                        variant="outlined"
                        type="number"
                        id="userPinCode"
                        value={props.values.userPinCode}
                        onChange={props.handler}
                        inputProps={{ maxLength: 6 }}
                        error={props.errorMessage.userPinCode}
                      />
                      {props.errorMessage.userPinCode && (
                        <FormHelperText error>
                          {props.errorMessage.userPinCode}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>

              <Button
                variant="contained"
                className={classes.signInButton}
                type="submit"
                onClick={() => {
                  props.handlePaymentDetails();
                  props.handleCurrentForm("bookingPayment");
                }}
                disabled={props.disabled || props.isLoading}
              >
                Finalize Booking
              </Button>
            </Stack>
          </Box>
        </Grid>
      </Box>
    </Box>
  );
}
