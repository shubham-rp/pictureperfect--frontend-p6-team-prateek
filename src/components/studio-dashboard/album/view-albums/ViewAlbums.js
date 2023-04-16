import React, { useEffect } from "react";
import { useAuthContext } from "../../../../hooks/useAuthContext";

import DisplayAlbums from "./DisplayAlbums";
import { Grid, Stack } from "@mui/material";
import { CircularProgress } from "@mui/material";

import { useState } from "react";
import Pagination from "@mui/material/Pagination";
import { makeStyles } from "tss-react/mui";
import CardHeader from "@mui/material/CardHeader";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";

import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import { Box } from "@mui/material";

import axios from "axios";

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
export default function ViewAlbums() {
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
        setAlbumlist(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user]);
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
  }, [deleteAlbum, user]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };
  const handleViewClick = (cardId) => {
    const albumToBeDisplayed = albumlist.filter((album) => {
      return album._id === cardId;
    });

    setAlbumName(albumToBeDisplayed[0].name);
    setAlbumDescription(albumToBeDisplayed[0].description);
    setAlbumImages(albumToBeDisplayed[0].images);
    setShowPage(!showPage);
  };

  const handleDeleteButton = (cardId) => {
    axios
      .delete(
        `${process.env.REACT_APP_BACKEND_API_URL}/api/studios/albums/delete/${cardId}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then((response) => {
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
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
                    }}
                    title="green iguana"
                  />
                  <CardActions>
                    <Button
                      onClick={() => handleDeleteButton(item._id)}
                      variant="contained"
                      sx={{ background: "#ff4d4d" }}
                      size="small"
                      fullWidth
                    >
                      Delete
                    </Button>
                    <Button
                      onClick={() => handleViewClick(item._id)}
                      variant="contained"
                      className={classes.signInButton}
                      size="small"
                      fullWidth
                    >
                      View
                    </Button>
                  </CardActions>
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
