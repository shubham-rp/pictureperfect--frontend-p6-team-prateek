import React from "react";

import { useState, useEffect, createContext } from "react";
import Toolbar from "@mui/material/Toolbar";
import UploadIcon from "@mui/icons-material/Upload";
import { makeStyles } from "tss-react/mui";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

import {
  Box,
  Grid,
  Paper,
  Stack,
  Button,
  Divider,
  TextField,
  Typography,
  Card,
  FormGroup,
} from "@mui/material";
import {
  createTheme,
  ThemeProvider,
  styled,
  useTheme,
} from "@mui/material/styles";
import ViewAlbums from "../view-albums/ViewAlbums";

const useStyles = makeStyles()((theme) => {
  return {
    outerPage: {
      backgroundColor: "#FFFBFE",
      borderColor: "yellow", //"grey.500"
      border: 1,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-equal",
      alignItems: "center",
      padding: "20rem",
      marginLeft: "100rem",
      borderRadius: "3px",
      height: "40px",
      position: "absolute",
      width: "833px",
      height: "478px",
      left: "511px",
      top: "182px",
    },

    innerPage: {
      backgroundColor: "#FFFBFE",
      borderColor: "yellow", //"grey.500"
      border: 1,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "2rem",
      borderRadius: "3px",
      width: "833px",
      height: "20rem",
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
    },
    signInButton: {
      width: 128,
      height: 48,
      fontSize: 16,
      borderRadius: 24,
    },
  };
});

const albums = [
  {
    albumId: 100,
    albumName: "Punjabi Wedding",
    albumDescription: "ssss",
    albumCategory: "Birthday",
  },
];

function AlbumDetailsPage(props) {
  const Alubumcard = {
    AlbumName: "",
    Category: "",
    Discription: "",
  };
  const [componentToBeDisplayed, setComponentToBeDisplayed] = useState("");
  const [showCreateAlbum, setShowCreateAlbum] = useState(true);
  const [createAlbum, setCreateAlbum] = useState(Alubumcard);
  const [albumName, setAlbumName] = useState("");
  const [albumCreated, setAlbumCreated] = useState(false);
  const [error, seterror] = useState(false);
  const [category, setCategory] = useState("");
  const [discription, setDiscription] = useState("");
  const [images, setImages] = useState([]);
  const [imageURLS, setImageURLs] = useState([]);
  const [albumList, setAlbumList] = useState(albums);

  const handelClick = () => {
    setShowCreateAlbum(!showCreateAlbum);
  };
  const handleChange = (event) => {
    setCategory(event.target.value);
  };
  const handleCreateClick = () => {
    if (albumName == "" || category == "") {
      seterror(true);
      setAlbumCreated(false);
      return;
    }

    setCreateAlbum({
      AlbumName: albumName,
      Category: category,
      Discription: discription,
    });
    setAlbumList(createAlbum);
    setAlbumName("");
    setCategory("");
    setDiscription("");
    setAlbumCreated(true);
  };

  const onImageChange = (e) => {
    setImages([...images, e.target.file]);
  };

  useEffect(() => {
    seterror(false);
  }, [albumName, category]);
  const { classes } = useStyles();

  return (
    <Card
      sx={{
        minWidth: 275,
        minHeight: 100,
        backgroundColor: "#FFFBFE",
        display: "flex",
        flexWrap: "wrap",
        "& > :not(style)": {
          m: 1,
        },
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "column",
          alignItems: "center",
          marginLeft: 800,
        }}
      >
        <Typography
          variant="h2"
          sx={{ fontSize: 24, fontWeight: 300 }}
          color="text.secondary"
          gutterBottom
        >
          Create New Albums
        </Typography>

        <Divider />
        <Box
          className={classes.root}
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          {/* onSubmit={handleSubmit} */}
          <div>
            <TextField
              required
              label="Album Name"
              value={albumName}
              onChange={props.AlbumName}
            />

            <FormControl required sx={{ m: 1, minWidth: 120 }}>
              <InputLabel>Category</InputLabel>
              <Select
                id="outlined-search"
                value={category}
                label="Category"
                sx={{ minWidth: 120 }}
                onChange={props.category}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"Birthday"}>Birthday</MenuItem>
                <MenuItem value={"Wedding"}>Wedding</MenuItem>
                <MenuItem value={"Pre-wed shoot"}>Pre-wed shoot</MenuItem>
                <MenuItem value={"Babies and Kids"}>Babies and Kids</MenuItem>
                <MenuItem value={"Travel"}>Travel</MenuItem>
                <MenuItem value={"Special Occasion"}>Special Occasion</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Album Discription"
              helperText="Enter Your Album Details"
              sx={{ minWidth: 450 }}
              value={discription}
              onChange={props.discription}
            />
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={onImageChange}
            />
          </div>
        </Box>

        {/* </CardContent> */}
        <CardActions>
          <Button
            variant="contained"
            className={classes.signInButton}
            onClick={handleCreateClick}
            size="small"
          >
            Create
          </Button>
          <Button
            variant="contained"
            className={classes.signInButton}
            onClick={handelClick}
            size="small"
          >
            Back
          </Button>
        </CardActions>
      </CardContent>
      {error && (
        <Alert
          severity="error"
          fullwidth
          sx={{
            display: "flex",
            flexWrap: "nowrap",
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
          }}
        >
          <AlertTitle>Error</AlertTitle>
          This is an error alert —{" "}
          <strong>Please enter Required Fields!</strong>
        </Alert>
      )}
      {albumCreated && (
        <Alert
          severity="success"
          fullwidth
          sx={{
            display: "flex",
            flexWrap: "nowrap",
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
          }}
        >
          <AlertTitle>Success</AlertTitle>
          <strong>Album is successfully created!</strong>
        </Alert>
      )}
    </Card>
  );
}

export default AlbumDetailsPage;
