import React from "react";
import { useRegisterStudio } from "../../hooks/useRegisterStudio";
import { Link } from "react-router-dom";

import Tooltip from "@mui/material/Tooltip";

import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import { Box } from "@mui/material";

import StepLabel from "@mui/material/StepLabel";

import logo from "../../images/pp-logo.png";
import LoginInfo from "./studioForms/LoginInfo";
import ContactDetails from "./studioForms/ContactDetails";
import ProfileInfo from "./studioForms/ProfileInfo";

import validator from "../../utils/validator";

import { makeStyles } from "tss-react/mui";
import { Stack } from "@mui/system";

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
      "@media (max-width: 1440px)": {
        display: "none",
      },
    },
    loginImage: {
      marginRight: "auto",
      marginLeft: "auto",
      height: "101%",
    },
    loginTextField: {
      width: 507,
      "@media (max-width: 720px)": {
        width: 400,
      },
    },
    signInButton: {
      width: 175,
      height: 48,
      fontSize: 11,
      borderRadius: 24,
    },

    imgLogo: {
      width: 250,
      paddingTop: 32,
      paddingBottom: 32,
    },
    error: {
      width: "40%",
      opacity: "80%",
      padding: 10,
      backgroundColor: "#B3261E",
      textAlign: "center",
      fontSize: 18,
      margin: 10,
      borderRadius: 24,
    },
  };
});

const steps = ["Login Information", "Contact Details", "Profile Information"];

export default function StudioSignUp({ cities, categories }) {
  const { register, isLoading, registerStudioError } = useRegisterStudio();
  const [flag, setFlag] = React.useState(true);
  const [contactFlag, setContactFlag] = React.useState(true);
  const [profileFlag, setProfileFlag] = React.useState(true);
  const { classes } = useStyles();
  const [currentForm, setCurrentForm] = React.useState("loginFrom");

  const [loginFormData, setLoginFormData] = React.useState({
    studioName: "",
    studioEmail: "",
    password: "",
    confirmPassword: "",
  });

  const [contactDetailsData, setContactDetailsData] = React.useState({
    studioAddress: "",
    studioCity: "",
    studioPincode: "",
    studioPhoneNumber: "",
    studioWhatsAppNumber: "",
  });

  const [profileInfoData, setprofileInfoData] = React.useState({
    studioProfilePicture: "",
    studioCategory: [],
    studioAbout: "",
    studioDailyRate: "",
  });

  const [error, setError] = React.useState({});

  React.useEffect(() => {}, [currentForm]);

  React.useEffect(() => {
    if (
      loginFormData.studioName !== "" &&
      loginFormData.studioEmail !== "" &&
      loginFormData.password !== "" &&
      loginFormData.confirmPassword !== "" &&
      error.studioName === "" &&
      error.studioEmail === "" &&
      error.password === "" &&
      error.confirmPassword === ""
    ) {
      setFlag(false);
    } else {
      setFlag(true);
    }
  }, [loginFormData, error]);

  React.useEffect(() => {
    if (
      contactDetailsData.studioAddress !== "" &&
      contactDetailsData.studioCity !== "" &&
      contactDetailsData.studioPincode !== "" &&
      contactDetailsData.studioPhoneNumber !== "" &&
      contactDetailsData.studioWhatsAppNumber !== "" &&
      contactDetailsData.studioCity !== "" &&
      error.studioAddress === "" &&
      error.studioCity === "" &&
      error.studioPincode === "" &&
      error.studioPhoneNumber === "" &&
      error.studioWhatsAppNumber === "" &&
      error.studioCity === ""
    ) {
      setContactFlag(false);
    } else {
      setContactFlag(true);
    }
  }, [contactDetailsData, error]);

  React.useEffect(() => {
    if (
      profileInfoData.studioCategory !== "" &&
      profileInfoData.studioDailyRate !== "" &&
      profileInfoData.studioAbout !== "" &&
      error.studioCategory === "" &&
      error.studioDailyRate === "" &&
      error.studioAbout === ""
    ) {
      setProfileFlag(false);
    } else {
      setProfileFlag(true);
    }
  }, [profileInfoData, error]);

  const handleBack = (e) => {
    if (currentForm === "contactDetails") {
      setCurrentForm("loginFrom");
    } else {
      setCurrentForm("contactDetails");
    }
  };

  const handleContinue = (e) => {
    setCurrentForm("profileInfo");
  };

  const handleLoginForm = (e) => {
    const { id, value } = e.target;
    if (id === "studioName") {
      setLoginFormData((prev) => {
        return {
          ...prev,
          [id]: value,
        };
      });
      if (validator(id, value)) {
        setError((prev) => {
          return {
            ...prev,
            [id]: "",
          };
        });
      } else {
        setError((prev) => {
          return {
            ...prev,
            [id]: "Enter a valid name.",
          };
        });
      }
    }
    if (id === "studioEmail") {
      setLoginFormData((prev) => {
        return {
          ...prev,
          [id]: value,
        };
      });
      if (validator(id, value)) {
        setError((prev) => {
          return {
            ...prev,
            [id]: "",
          };
        });
      } else {
        setError((prev) => {
          return {
            ...prev,
            [id]: "Enter a valid email address.",
          };
        });
      }
    }
    if (id === "password") {
      setLoginFormData((prev) => {
        return {
          ...prev,
          [id]: value,
        };
      });

      if (validator(id, value)) {
        setError((prev) => {
          return {
            ...prev,
            [id]: "",
          };
        });
      } else {
        setError((prev) => {
          return {
            ...prev,
            [id]: "Enter a valid password",
          };
        });
      }
      if (loginFormData.confirmPassword) {
        if (
          validator("confirmPassword", value, loginFormData.confirmPassword)
        ) {
          setError((prev) => {
            return {
              ...prev,
              confirmPassword: "",
            };
          });
        } else {
          setError((prev) => {
            return {
              ...prev,
              confirmPassword: "Passwords do not match",
            };
          });
        }
      }
    }
    if (id === "confirmPassword") {
      setLoginFormData((prev) => {
        return {
          ...prev,
          [id]: value,
        };
      });
      if (validator(id, loginFormData.password, value)) {
        setError((prev) => {
          return {
            ...prev,
            [id]: "",
          };
        });
      } else {
        setError((prev) => {
          return {
            ...prev,
            [id]: "Passwords do not match",
          };
        });
      }
    }
  };

  const handleContactDetailsForm = (e) => {
    const { id, value, name } = e.target;

    if (id === "studioAddress") {
      setContactDetailsData((prev) => {
        return {
          ...prev,
          [id]: value,
        };
      });
      if (contactDetailsData.studioAddress !== "") {
        setError((prev) => {
          return {
            ...prev,
            [id]: "",
          };
        });
      } else {
        setError((prev) => {
          return {
            ...prev,
            [id]: "Enter a valid address.",
          };
        });
      }
    }

    if (name === "studioCity") {
      setContactDetailsData((prev) => {
        return {
          ...prev,
          [name]: value,
        };
      });
      if (setContactDetailsData.studioCity !== "") {
        setError((prev) => {
          return {
            ...prev,
            [name]: "",
          };
        });
      } else {
        setError((prev) => {
          return {
            ...prev,
            [name]: "Please Select a City",
          };
        });
      }
    }
    if (id === "studioPincode") {
      setContactDetailsData((prev) => {
        return {
          ...prev,
          [id]: value,
        };
      });
      if (validator(id, value)) {
        setError((prev) => {
          return {
            ...prev,
            [id]: "",
          };
        });
      } else {
        setError((prev) => {
          return {
            ...prev,
            [id]: "Enter a valid pin code",
          };
        });
      }
    }
    if (id === "studioPhoneNumber") {
      setContactDetailsData((prev) => {
        return {
          ...prev,
          [id]: value,
        };
      });
      if (validator(id, value)) {
        setError((prev) => {
          return {
            ...prev,
            [id]: "",
          };
        });
      } else {
        setError((prev) => {
          return {
            ...prev,
            [id]: "Enter a valid phone number",
          };
        });
      }
    }
    if (id === "studioWhatsAppNumber") {
      setContactDetailsData((prev) => {
        return {
          ...prev,
          [id]: value,
        };
      });
      if (validator(id, value)) {
        setError((prev) => {
          return {
            ...prev,
            [id]: "",
          };
        });
      } else {
        setError((prev) => {
          return {
            ...prev,
            [id]: "Enter a valid whatsapp number",
          };
        });
      }
    }
  };

  const handleProfileInfoForm = (e) => {
    const { id, value, name } = e.target;

    if (id === "studioDailyRate") {
      setprofileInfoData((prev) => {
        return {
          ...prev,
          [id]: value,
        };
      });
      if (validator(id, value)) {
        setError((prev) => {
          return {
            ...prev,
            [id]: "",
          };
        });
      } else {
        setError((prev) => {
          return {
            ...prev,
            [id]: "Enter value between ₹1000 - ₹99,999",
          };
        });
      }
    }

    if (name === "studioCategory") {
      setprofileInfoData((prev) => {
        return {
          ...prev,
          [name]: value,
        };
      });
      if (setprofileInfoData.studioCategory !== "") {
        setError((prev) => {
          return {
            ...prev,
            [name]: "",
          };
        });
      } else {
        setError((prev) => {
          return {
            ...prev,
            [name]: "Please Select a Category",
          };
        });
      }
    }

    if (id === "studioAbout") {
      setprofileInfoData((prev) => {
        return {
          ...prev,
          [id]: value,
        };
      });
      if (validator(id, value)) {
        setError((prev) => {
          return {
            ...prev,
            [id]: "",
          };
        });
      } else {
        setError((prev) => {
          return {
            ...prev,
            [id]: "Please enter a few words about your Studio ",
          };
        });
      }
    }
  };
  const handleProfileImage = (e) => {
    const localImg = e.target.files[0];

    if (localImg && localImg.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setprofileInfoData((prev) => {
          return {
            ...prev,
            studioProfilePicture: reader.result,
          };
        });
      };
      reader.onerror = () => {};
      reader.readAsDataURL(localImg);
    } else {
      alert("Upload correct image");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let signUpData = {
      ...loginFormData,
      ...contactDetailsData,
      ...profileInfoData,
    };

    await register(signUpData);
  };

  const renderForm = () => {
    switch (currentForm) {
      case "contactDetails":
        return (
          <ContactDetails
            cities={cities}
            disabled={contactFlag}
            errorMessage={error}
            continue={handleContinue}
            goback={handleBack}
            handler={handleContactDetailsForm}
            values={contactDetailsData}
          />
        );
      case "profileInfo":
        return (
          <ProfileInfo
            categories={categories}
            disabled={profileFlag}
            errorMessage={error}
            goback={handleBack}
            handler={handleProfileInfoForm}
            imageHandler={handleProfileImage}
            values={profileInfoData}
            handleSubmit={handleSubmit}
          />
        );

      default:
        return (
          <LoginInfo
            disabled={flag}
            errorMessage={error}
            next={() => {
              setCurrentForm("contactDetails");
            }}
            handler={handleLoginForm}
            values={loginFormData}
          />
        );
    }
  };

  return (
    <Grid container spacing={0}>
      <Grid
        item
        md={4}
        className={classes.loginImageContainer}
        sx={{
          display: { xs: "none", sm: "none", md: "none", lg: "block" },
        }}
      >
        <img
          className={classes.loginImage}
          alt="photographer holding camera and smiling"
          src="https://picture-perfect-pesto.s3.ap-south-1.amazonaws.com/pp-register-studio-image.jpg"
        />
      </Grid>
      <Grid item md={8} xs={12}>
        <Stack spacing={2} className={classes.loginItems}>
          <Link to="/" className={classes.landingPageLink}>
            <Tooltip title="Go To Home" placement="right">
              <img
                className={classes.imgLogo}
                alt="person with camera"
                src={logo}
              />
            </Tooltip>
          </Link>

          <Stepper
            activeStep={
              currentForm === "loginFrom"
                ? 0
                : currentForm === "contactDetails"
                ? 1
                : currentForm === "profileInfo"
                ? 2
                : null
            }
            alternativeLabel
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {isLoading && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CircularProgress />
            </Box>
          )}
          {registerStudioError && (
            <div className={classes.error}>{registerStudioError}</div>
          )}

          <Box>{renderForm()}</Box>
        </Stack>
      </Grid>
    </Grid>
  );
}
