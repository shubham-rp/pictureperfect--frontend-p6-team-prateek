import React from "react";

import Box from "@mui/material/Box";

import { FormHelperText } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import { makeStyles } from "tss-react/mui";
import Grid from "@mui/material/Grid";

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

    nameTextField: {
      width: 507,
      "@media (max-width: 720px)": {
        width: 400,
      },
    },
    signInButton: {
      width: 150,
      height: 48,
      fontSize: 20,
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
  };
});

export default function LoginInfo(props) {
  const { classes } = useStyles();
  return (
    <div>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1 },
        }}
      >
        <Stack spacing={3} className={classes.loginItems}>
          <Grid>
            {/* <div>
              {!!props.errorMessage.studioName && (
                <span style={{ color: "red" }}>
                  {props.errorMessage.studioName}
                </span>
              )}
            </div> */}
            <FormControl>
              <TextField
                className={classes.nameTextField}
                required
                id="studioName"
                value={props.values.studioName}
                onChange={props.handler}
                label="Name of Photo Studio"
                error={props.errorMessage.studioName}
              />
              {props.errorMessage.studioName && (
                <FormHelperText error>
                  {props.errorMessage.studioName}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>

          {/* {!!props.errorMessage && <span>{props.errorMessage}</span>} */}
          <Grid>
            {/* <div>
              {!!props.errorMessage.studioEmail && (
                <span style={{ color: "red" }}>
                  {props.errorMessage.studioEmail}
                </span>
              )}
            </div> */}
            <FormControl>
              <TextField
                required
                className={classes.nameTextField}
                id="studioEmail"
                value={props.values.studioEmail}
                onChange={props.handler}
                label="Email Id"
                error={props.errorMessage.studioEmail}
              />
              {props.errorMessage.studioEmail && (
                <FormHelperText error>
                  {props.errorMessage.studioEmail}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid>
            {/* <div>
              {!!props.errorMessage.password && (
                <span style={{ color: "red" }}>
                  {props.errorMessage.password}
                </span>
              )}
            </div> */}
            <FormControl>
              <Tooltip
                arrow
                title=" Password must be minimum 8 characters with an uppercase letter, a lowercase letter, a number & a special symbol"
                placement="top"
              >
                <TextField
                  required
                  className={classes.nameTextField}
                  id="password"
                  type="password"
                  value={props.values.password}
                  onChange={props.handler}
                  label="Password"
                  error={props.errorMessage.password}
                />
              </Tooltip>
              {props.errorMessage.password && (
                <FormHelperText error>
                  {props.errorMessage.password}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid>
            {/* <div>
              {!!props.errorMessage.confirmPassword && (
                <span style={{ color: "red" }}>
                  {props.errorMessage.confirmPassword}
                </span>
              )}
            </div> */}
            <FormControl>
              <TextField
                required
                className={classes.nameTextField}
                id="confirmPassword"
                type="password"
                value={props.values.confirmPassword}
                onChange={props.handler}
                label="Re-enter Password"
                error={props.errorMessage.confirmPassword}
              />
              {props.errorMessage.confirmPassword && (
                <FormHelperText error>
                  {props.errorMessage.confirmPassword}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid>
            <Button
              className={classes.signInButton}
              onClick={props.next}
              variant="contained"
              disabled={props.disabled}
            >
              Next
            </Button>
          </Grid>
        </Stack>
      </Box>
    </div>
  );
}
