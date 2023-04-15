import { useState } from "react";
import { useSignUp } from "../../hooks/useSignUp";
import { Link } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

import {
  Box,
  Button,
  Divider,
  Grid,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";

import { makeStyles } from "tss-react/mui";
import ppLogo from "../../images/pp-logo.png";

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
      height: "99vh",
      "@media (max-width: 1440px)": {
        display: "none",
      },
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
    gridWrapper: {
      display: "flex",
      justifyContent: "space-between",
      "@media (max-width: 720px)": {
        flexDirection: "column",
      },
    },
    nameTextField: {
      width: 240,
      marginRight: 12,
      marginLeft: 12,
      "@media (max-width: 720px)": {
        width: 400,
        marginBottom: 16,
      },
    },
    signInButton: {
      width: 128,
      height: 48,
      fontSize: 16,
      borderRadius: 24,
    },
    signUpHeading: {
      color: theme.palette.primary.main,
      padding: 32,
    },
    redirectLink: {
      color: theme.palette.primary.main,
      textDecoration: "none",
    },
    redirectText: {
      fontSize: 16,
      display: "inline-flex",
      flexDirection: "row",

      marginTop: 200,
      marginBottom: 10,
    },
    error: {
      width: "90%",
      opacity: "80%",
      padding: 10,
      backgroundColor: "#B3261E",
      textAlign: "center",
      fontSize: 18,
      margin: 10,
    },
  };
});

function SignUpEndUser() {
  const { classes } = useStyles();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { signup, isLoading, error } = useSignUp();

  const validate = () => {
    let temp = {};
    temp.firstName = firstName ? "" : "This field is required";
    temp.lastName = lastName ? "" : "This field is required";
    temp.email = /$|.+@.+..+/.test(email) ? "" : "Email is not valid";
    setErrors({
      ...temp,
    });
    return Object.values(temp).every((x) => x === "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(email, firstName, lastName, password);
  };
  return (
    <div>
      <Grid container>
        <Grid
          item
          container
          md={4}
          className={classes.loginImageContainer}
          sx={{
            display: { xs: "none", sm: "none", md: "none", lg: "block" },
          }}
        >
          <img
            className={classes.loginImage}
            src={
              "https://picture-perfect-pesto.s3.ap-south-1.amazonaws.com/pp-client-signup.jpg"
            }
            alt="children enjoying at a birthday party with happy birthday in background"
          />
        </Grid>
        <Divider orientation="vertical" flexItem />
        <Grid item md={7} xs={12}>
          <Box
            className={classes.root}
            component="form"
            onSubmit={handleSubmit}
          >
            <Stack spacing={2} className={classes.loginItems}>
              <Link to="/" className={classes.landingPageLink}>
                <Tooltip title="Go To Home" placement="right">
                  <img src={ppLogo} alt="person with camera" />
                </Tooltip>
              </Link>

              <Typography color="inherit" className={classes.signUpHeading}>
                Sign Up To Find The Perfect Photographer For Your Event
              </Typography>
              {isLoading && <CircularProgress />}
              {error && <div className={classes.error}>{error}</div>}
              <TextField
                className={classes.loginTextField}
                label="Email Id"
                type="email"
                variant="outlined"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                {...(errors.email && { error: true, helperText: errors.email })}
              />
              <Grid className={classes.gridWrapper}>
                <TextField
                  className={classes.nameTextField}
                  label="First Name"
                  variant="outlined"
                  onChange={(e) => setFirstName(e.target.value)}
                  value={firstName}
                  {...(errors.firstName && {
                    error: true,
                    helperText: errors.firstName,
                  })}
                />
                <TextField
                  className={classes.nameTextField}
                  label="Last Name"
                  variant="outlined"
                  onChange={(e) => setLastName(e.target.value)}
                  value={lastName}
                />
              </Grid>
              <TextField
                className={classes.loginTextField}
                label="Password"
                type="password"
                variant="outlined"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <TextField
                className={classes.loginTextField}
                label="Confirm Password"
                type="password"
                variant="outlined"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
              />
              <Button
                variant="contained"
                className={classes.signInButton}
                type="submit"
                disabled={isLoading}
              >
                Sign Up
              </Button>

              <Stack>
                <Typography color="inherit" className={classes.redirectText}>
                  Are You a Photo Studio?{" "}
                  <Link
                    to="/register-photo-studio"
                    className={classes.redirectLink}
                  >
                    Partner With Us.
                  </Link>
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Grid>
      </Grid>{" "}
    </div>
  );
}

export default SignUpEndUser;
