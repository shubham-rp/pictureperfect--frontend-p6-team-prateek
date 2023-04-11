import React, { useContext, useEffect } from "react";
import { useAuthContext } from "../../../../hooks/useAuthContext";
import Toolbar from "@mui/material/Toolbar";
import DisplayAlbums from "./DisplayAlbums";
import { Box, Grid, Paper, Stack } from "@mui/material";
import { CircularProgress } from "@mui/material";

import { useState } from "react";
import Pagination from "@mui/material/Pagination";
import { makeStyles } from "tss-react/mui";
import CardHeader from "@mui/material/CardHeader";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
// import Stack from "@mui/material/Stack";
import axios from "axios";
import {
  List,
  CssBaseline,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Chip,
} from "@mui/material";
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginTop: theme.spacing(4),
    },
  },
  item: {
    padding: theme.spacing(2),
  },
  cardContent: {
    display: "flex",
    justifyContent: "space-around",
    width: "190%",
    marginLeft: "50%",
    margin: "1%",
    padding: "20%",
    flexWrap: "wrap",
    marginTop: 10,
    border: "1px Black Solid",
    borderRadius: "10px",
  },
}));

const itemsPerPage = 6;
export default function ViewAlbums({ details }) {
  const { user } = useAuthContext();
  const classes = useStyles();
  const [currentPage, setCurrentPage] = useState(1);
  const [showPage, setShowPage] = React.useState(false);
  const [loading, setLoading] = useState(true);
  const [albumID, setAlbumID] = useState("");
  const [albumlist, setAlbumlist] = useState([]);
  const [deleteAlbum, setDeletealbum] = useState(false);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = albumlist.slice(indexOfFirstItem, indexOfLastItem);
  const pageCount = Math.ceil(albumlist.length / itemsPerPage);

  const [albumName, setAlbumName] = useState("");
  const [albumDescription, setAlbumDescription] = useState("");
  const [albumImages, setAlbumImages] = useState([]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_API_URL}/api/studios/albums`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setAlbumlist(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_API_URL}/api/studios/albums`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((response) => {
        setAlbumlist(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [deleteAlbum]);

  // useEffect(() => {
  //   indexOfLastItem = currentPage * itemsPerPage;
  //   indexOfFirstItem = indexOfLastItem - itemsPerPage;
  //   currentItems = albumlist.slice(indexOfFirstItem, indexOfLastItem);
  //   pageCount = Math.ceil(albumlist.length / itemsPerPage);
  // }, [handleDeleteButton]);
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    // setShowPage(!showPage);
  };
  const handleViewClick = (cardId) => {
    console.log("viwe click" + cardId);

    const albumToBeDisplayed = albumlist.filter((album) => {
      return album._id === cardId;
    });

    setAlbumName(albumToBeDisplayed[0].name);
    setAlbumDescription(albumToBeDisplayed[0].description);
    setAlbumImages(albumToBeDisplayed[0].images);
    setShowPage(!showPage);
  };

  const handleDeleteButton = (cardId) => {
    console.log("viwe click" + cardId);
    axios
      .delete(
        `${process.env.REACT_APP_BACKEND_API_URL}/api/studios/albums/delete/${cardId}`
      )
      .then((response) => {
        console.log("album deleted");
        setDeletealbum(!deleteAlbum);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleBackClick = () => {
    setShowPage(false);
  };

  return (
    <>
      {" "}
      {loading ? (
        <CircularProgress />
      ) : showPage ? (
        <DisplayAlbums
          albumName={albumName}
          albumDescription={albumDescription}
          albumImages={albumImages}
          handelClick={handleBackClick}
        />
      ) : (
        <Grid className={classes.cardContent} rowSpacing={2}>
          <Grid container spacing={2} paddingTop={2} xm={1}>
            {currentItems.map((item) => {
              return (
                <Card
                  key={item._id}
                  sx={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    flexDirection: "column",
                    maxWidth: 400,
                    height: 300,
                    width: 900,
                    marginBottom: "3%",
                    marginLeft: "4%",
                    marginTop: "0.1%",
                  }}
                >
                  {console.log(item.images[0].imagesUrl[0])}
                  <CardHeader
                    avatar={
                      <Avatar sx={{ bgcolor: "#6750A4" }} aria-label="recipe">
                        {item.name[0]}
                      </Avatar>
                    }
                    title={item.name}
                  />
                  <CardMedia
                    key={item._id}
                    image={item.images[0].imagesUrl}
                    sx={{
                      height: 250,
                      objectFit: "cover",
                      // 16:9 aspect ratio
                    }}
                    title="green iguana"
                  />
                  <CardActions>
                    <Button
                      // onClick={handleViewButton}
                      onClick={() => handleDeleteButton(item._id)}
                      variant="contained"
                      // className={classes.signInButton}
                      sx={{ background: "#ff4d4d" }}
                      size="small"
                      fullWidth
                    >
                      Delete
                    </Button>
                    <Button
                      // onClick={handleViewButton}
                      onClick={() => handleViewClick(item._id)}
                      variant="contained"
                      className={classes.signInButton}
                      size="small"
                      fullWidth
                    >
                      View
                    </Button>
                  </CardActions>
                  {/* <Grid item rowSpacing={4} xs={12} sm={4} md={4}>
                  <AlbumCard t={item.name} />
                </Grid> */}
                </Card>
              );
            })}
          </Grid>
          <Stack
            spacing={2}
            alignItems={"center"}
            position={"relative"}
            paddingTop={5}
          >
            <Pagination
              count={pageCount}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              alignItems={"center"}
            />
          </Stack>
        </Grid>
      )}
    </>
  );
}
