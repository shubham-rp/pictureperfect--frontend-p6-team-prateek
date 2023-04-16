import { useState, useEffect } from "react";
import { useAuthContext } from "../../../../hooks/useAuthContext";
import { makeStyles } from "tss-react/mui";
import axios from "axios";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

import ImageUploading from "react-images-uploading";
import { Grid, Paper, Button, TextField, Typography } from "@mui/material";

const useStyles = makeStyles()((theme) => {
  return {
    outerPage: {
      backgroundColor: "#FFFBFE",
      borderColor: "yellow",
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
      borderColor: "yellow",
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
    cardContent: {
      display: "flex",
      justifyContent: "space-around",
      flexWrap: "wrap",
      width: "90%",
      marginLeft: "200%",
      margin: "1%",
      padding: "20%",

      marginTop: 10,
      border: "1px Black Solid",
      borderRadius: "10px",
    },

    innerCard: {
      width: "100%",
      height: "100%",
      borderColor: "text.primary",
      height: "5rem",
      alignItems: "Center",
    },
  };
});

const CreateNewAlbum = ({ studioCategory }) => {
  console.log(studioCategory);
  const { user } = useAuthContext();
  const Alubumcard = {
    name: "",
    category: "",
    description: "",
  };

  const [createAlbum, setCreateAlbum] = useState(Alubumcard);
  const [albumCreated, setAlbumCreated] = useState(false);
  const [error, seterror] = useState(false);
  const [images, setImages] = useState([]);
  const maxNumber = 10;

  const handleCreateClick = async () => {
    if (
      createAlbum.name === "" ||
      createAlbum.category === "" ||
      images.length === 0
    ) {
      seterror(true);
      setAlbumCreated(false);
      setTimeout(() => {
        setAlbumCreated(false);
      }, 3000);
      return;
    }

    const data = await axios.post(
      `${process.env.REACT_APP_BACKEND_API_URL}/api/studios/albums/album`,
      {
        ...createAlbum,
        images: [...images],
      },
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    setAlbumCreated(true);
    setCreateAlbum(Alubumcard);
    setImages([]);
    setTimeout(() => {
      setAlbumCreated(false);
    }, 3000);
  };

  const onChange = (imageList, addUpdateIndex) => {
    setImages(imageList);
  };

  useEffect(() => {
    seterror(false);
  }, [createAlbum.name, createAlbum.category]);

  const { classes } = useStyles();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "image") {
      return;
    }

    setCreateAlbum((x) => ({
      ...x,
      [name]: value,
    }));
  };

  return (
    <>
      <Paper
        sx={{
          width: "100%",
          height: "100%",
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontSize: 24,
            fontWeight: 300,
            width: 310,
            alignItems: "center",
          }}
          color="text.secondary"
          gutterBottom
        >
          {" "}
          Create new Album
        </Typography>
        <Grid container spacing={1} className={classes.cardContent}>
          <Grid
            container
            rowSpacing={10}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid xs={7} paddingTop={2}>
              <TextField
                required
                label="Album Name"
                value={createAlbum.name}
                name="name"
                onChange={handleInputChange}
              />
            </Grid>
            <Grid paddingTop={2}>
              <FormControl required sx={{ minWidth: 120 }}>
                <InputLabel>Category</InputLabel>
                <Select
                  id="outlined-search"
                  value={createAlbum.category}
                  name="category"
                  label="Category"
                  sx={{ minWidth: 200 }}
                  onChange={handleInputChange}
                >
                  {studioCategory.map((category) => {
                    return <MenuItem value={category}>{category}</MenuItem>;
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid rowSpacing={1} paddingTop={3} xm={1}>
              <TextField
                label="Album Description"
                name="description"
                helperText="Enter Your Album Details"
                sx={{ minWidth: 120, width: 532 }}
                value={createAlbum.description}
                inputProps={{
                  style: {
                    height: "50px",
                  },
                }}
                onChange={handleInputChange}
              />
              <Grid paddingBottom={2} paddingTop={2}>
                {" "}
                <ImageUploading
                  multiple
                  value={images}
                  onChange={onChange}
                  maxNumber={maxNumber}
                  dataURLKey="data_url"
                  acceptType={["jpg", "gif", "png", "jpeg"]}
                >
                  {({
                    imageList,
                    onImageUpload,
                    onImageRemoveAll,
                    onImageRemove,
                    errors,
                  }) => (
                    <div>
                      <Button onClick={onImageUpload}>Image Upload</Button>
                      <Button onClick={onImageRemoveAll}>
                        {" "}
                        Remove all Images
                      </Button>
                      {errors && (
                        <div>
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
                            <strong>Please Add valid Images!</strong>
                          </Alert>
                        </div>
                      )}
                      <Grid
                        container
                        spacing={2}
                        paddingTop={2}
                        xm={1}
                        paddingLeft={2}
                      >
                        {imageList.map((image, index) => (
                          <div
                            key={index}
                            className="image-item"
                            display="flex"
                            flexDirection="row"
                          >
                            <img
                              src={image["data_url"]}
                              alt=""
                              width="200"
                              height="200"
                            />
                            <div className="image-item__btn-wrapper">
                              <button onClick={() => onImageRemove(index)}>
                                X
                              </button>
                            </div>
                          </div>
                        ))}
                      </Grid>
                    </div>
                  )}
                </ImageUploading>
              </Grid>
              <Grid columnGap={3}>
                <Button
                  item
                  variant="contained"
                  className={classes.signInButton}
                  onClick={handleCreateClick}
                  size="small"
                  paddingTop="2"
                >
                  Create
                </Button>
              </Grid>
            </Grid>
          </Grid>
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
        </Grid>
      </Paper>
    </>
  );
};

export default CreateNewAlbum;
