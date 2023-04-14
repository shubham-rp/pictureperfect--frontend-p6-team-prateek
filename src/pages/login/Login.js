import { useState } from "react";
import { Link } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin";
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
      borderColor: "grey",
      border: 2,
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
    signInButton: {
      width: 128,
      height: 48,
      fontSize: 16,
      borderRadius: 24,
    },
    forgotPasswordText: {
      textAlign: "right",
      width: "100%",
      "@media (max-width: 720px)": {
        textAlign: "center",
      },
    },
    forgotPasswordLink: {
      color: "grey",
      textDecoration: "none",
    },
    signUpRedirectText: {
      display: "inline-flex",
      flexDirection: "row",
      marginTop: 300,
      marginBottom: 10,
    },
    signUpRedirectLink: {
      color: theme.palette.primary.main,
      textDecoration: "none",
    },
    landingPageLink: {
      padding: 32,
    },
    error: {
      width: "95%",
      opacity: "80%",
      padding: 10,
      backgroundColor: "#B3261E",
      textAlign: "center",
      fontSize: 18,
      margin: 10,
      borderRadius: 24,
      fontFamily: "Roboto",
    },
  };
});

function Login() {
  const { classes } = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(email, password);
  };
  return (
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
            "https://picture-perfect-pesto.s3.ap-south-1.amazonaws.com/pp-user-login-image.jpg"
          }
          alt="Person focussing camera with escalator behind likely in a subway station"
        />
      </Grid>
      <Divider orientation="vertical" flexItem />
      <Grid item md={7} xs={12} className={classes.root}>
        <Box component="form" onSubmit={handleSubmit}>
          <Stack spacing={2} className={classes.loginItems}>
            <Link to="/" className={classes.landingPageLink}>
              <Tooltip title="Go To Home" placement="right">
                <img src={ppLogo} alt="person with camera" />
              </Tooltip>
            </Link>
            {error && <div className={classes.error}>{error}</div>}
            {isLoading && <CircularProgress />}
            <TextField
              className={classes.loginTextField}
              label="Email Id"
              type="email"
              variant="outlined"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <TextField
              className={classes.loginTextField}
              label="Password"
              type="password"
              variant="outlined"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <Typography className={classes.forgotPasswordText}>
              <Link className={classes.forgotPasswordLink}>
                Forgot Password ?
              </Link>
            </Typography>
            <Button
              variant="contained"
              className={classes.signInButton}
              type="submit"
              disabled={isLoading}
            >
              Sign In
            </Button>

            <Stack>
              <Typography className={classes.signUpRedirectText}>
                New To Picture Perfect ?
                <Link to="/signup" className={classes.signUpRedirectLink}>
                  Sign Up Here.
                </Link>
              </Typography>
            </Stack>
          </Stack>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Login;
