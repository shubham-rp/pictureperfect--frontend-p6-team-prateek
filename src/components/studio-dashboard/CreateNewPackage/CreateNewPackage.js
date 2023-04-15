import { useState } from "react";
import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";

import { styled } from "@mui/material/styles";
import { makeStyles } from "tss-react/mui";
import TextField from "@mui/material/TextField";

import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Divider } from "@mui/material";
import Stack from "@mui/material/Stack";

import OutlinedInput from "@mui/material/OutlinedInput";

import InputAdornment from "@mui/material/InputAdornment";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

const useStyles = makeStyles()((theme) => {
  return {
    signInButton: {
      width: 175,
      height: 48,
      fontSize: 14,
      borderRadius: 24,
    },
    cardContent: {
      display: "flex",
      justifyContent: "space-between",
      width: "50%",
      marginLeft: "20%",
      marginTop: 50,
    },
    nameTextField: {
      width: 250,
    },
    categoryWidth: {
      width: 250,
    },
    mainGridCreatePakage: {
      display: "flex",
      justifyContent: "space-between",
    },
    addNewPakageButton: {
      width: 175,
      height: 48,
      fontSize: 14,
      borderRadius: 24,
    },
    buttonsStack: {
      display: "flex",
      alignItems: "center",
    },
  };
});
export default function CreateNewPackage() {
  const [toggle, setToggle] = useState(true);
  const { classes } = useStyles();
  const [packageFormData, setPackageFormData] = React.useState({
    pakageName: "",
    dailyRate: "",
    pakageContents: "",
    optionalPakageContents: "",
    eventRate: "",
    hourlyRate: "",
    packageCategory: "",
  });

  const handlePackageFormData = (e) => {
    const { id, value } = e.target;

    setPackageFormData((prev) => {
      return {
        ...prev,
        [id]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      {toggle ? (
        <Card style={{ height: "150px" }}>
          <Grid className={classes.cardContent}>
            <CardContent>
              <Typography style={{ fontWeight: "800" }}>
                Add New Pakages
              </Typography>
            </CardContent>

            <Button
              className={classes.addNewPakageButton}
              variant="contained"
              onClick={() => {
                setToggle(false);
              }}
            >
              Add New Pakages
            </Button>
          </Grid>
        </Card>
      ) : (
        <div>
          <Grid className={classes.mainGridCreatePakage}>
            <Grid>
              <Stack spacing={2}>
                <TextField
                  required
                  className={classes.nameTextField}
                  id="pakageName"
                  label="Enter Pakage Name"
                  onChange={handlePackageFormData}
                />
                <FormControl>
                  <InputLabel htmlFor="outlined-adornment-amount">
                    Enter Daily Rate
                  </InputLabel>
                  <OutlinedInput
                    id="dailyRate"
                    startAdornment={
                      <InputAdornment position="start">₹</InputAdornment>
                    }
                    label="Amount"
                    onChange={handlePackageFormData}
                  />
                </FormControl>

                <TextField
                  id="pakageContents"
                  label="Pakage Contents"
                  multiline
                  rows={4}
                  defaultValue=""
                  onChange={handlePackageFormData}
                />
                <TextField
                  id="optionalPakageContents"
                  label="Optional Pakage Contents"
                  multiline
                  rows={4}
                  defaultValue=""
                  onChange={handlePackageFormData}
                />
              </Stack>
            </Grid>

            <Grid>
              <Stack spacing={2}>
                <FormControl>
                  <InputLabel htmlFor="outlined-adornment-amount">
                    Enter Event Rate
                  </InputLabel>
                  <OutlinedInput
                    id="eventRate"
                    startAdornment={
                      <InputAdornment position="start">₹</InputAdornment>
                    }
                    label="Amount"
                    onChange={handlePackageFormData}
                  />
                </FormControl>
                <FormControl>
                  <InputLabel htmlFor="outlined-adornment-amount">
                    Enter Hourly Rate
                  </InputLabel>
                  <OutlinedInput
                    id="hourlyRate"
                    startAdornment={
                      <InputAdornment position="start">₹</InputAdornment>
                    }
                    label="Amount"
                    onChange={handlePackageFormData}
                  />
                </FormControl>
              </Stack>
            </Grid>
            <Grid>
              <Box className={classes.categoryWidth}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Category
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="packageCategory"
                    label="Category"
                    onChange={handlePackageFormData}
                  >
                    <MenuItem value="Wedding">Wedding</MenuItem>
                    <MenuItem value="Babies and Kids">Babies and Kids</MenuItem>
                    <MenuItem value="Special Occasion">
                      Special Occasion
                    </MenuItem>
                    <MenuItem value="Commercial">Commercial</MenuItem>
                    <MenuItem value="Nature">Nature</MenuItem>
                    <MenuItem value="Fashion and Portfolio">
                      Fashion and Portfolio
                    </MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Grid>
          </Grid>
          <Stack className={classes.buttonsStack} spacing={2}>
            <Button
              className={classes.signInButton}
              variant="contained"
              onClick={() => setToggle(true)}
            >
              Back
            </Button>
            <Button
              className={classes.signInButton}
              variant="contained"
              onClick={handleSubmit}
            >
              Create New Package
            </Button>
          </Stack>
        </div>
      )}
    </div>
  );
}
