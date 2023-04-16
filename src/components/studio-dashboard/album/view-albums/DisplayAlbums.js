import * as React from "react";
import {
  Box,
  Button,
  Grid,
  Card,
  CardMedia,
  Typography,
  Stack,
  ImageList,
  ImageListItem,
  useMediaQuery,
} from "@mui/material";

import { makeStyles } from "tss-react/mui";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";

const useStyles = makeStyles()((theme) => {
  return {
    backButton: {
      borderRadius: 16,
      height: 36,
      width: 72,
      textAlign: "center",
    },
    albumDescriptionContent: {
      background: "#D3D3D3",
      paddingTop: 16,
      paddingBottom: 16,
      paddingLeft: 2,
    },
    albumNameHeader: {
      display: "flex",
      justifyContent: "space-between",
      paddingTop: 8,
      paddingBottom: 8,
    },
    backButtonWrapper: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 8,
    },
    albumName: {
      color: "white",
      backgroundColor: theme.palette.primary.main,
      padding: 2,
      borderRadius: 8,
    },
  };
});

export default function DisplayAlbums({
  albumName,
  albumDescription,
  albumImages,
  handelClick,
}) {
  const { classes } = useStyles();
  const isSmallScreen = useMediaQuery("(max-width:1024px)");

  return (
    <Stack>
      <Grid container rowSpacing={2}>
        <Grid
          item
          spacing={2}
          display={"flex"}
          flexDirection={"column"}
          xs={12}
        >
          <Grid item xs={12} className={classes.albumNameHeader}>
            {" "}
            <Typography variant="h4" className={classes.albumName}>
              {albumName}
            </Typography>
            <Button
              variant="outlined"
              color="error"
              onClick={handelClick}
              size="small"
              paddingTop="8"
              alignItems={"end"}
              marginLeft={300}
              className={classes.backButton}
            >
              <RotateLeftIcon />
              Back
            </Button>
          </Grid>

          <Card className={classes.albumDescriptionContent}>
            <Typography variant="body">{albumDescription}</Typography>
          </Card>
        </Grid>
        {isSmallScreen &&
          albumImages.map((image, index) => {
            return (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <Card>
                  <CardMedia component="img" image={image.imagesUrl} />
                </Card>
              </Grid>
            );
          })}
        {!isSmallScreen && (
          <ImageList variant="masonry" cols={3} gap={8}>
            {albumImages.map((image) => (
              <ImageListItem key={image.img}>
                <img
                  src={`${image.imagesUrl}`}
                  srcSet={`${image.imagesUrl}`}
                  alt=" Loaded from the albums"
                  loading="lazy"
                />
              </ImageListItem>
            ))}
          </ImageList>
        )}
      </Grid>
      <Box className={classes.backButtonWrapper}>
        <Button
          variant="outlined"
          color="error"
          onClick={handelClick}
          size="small"
          paddingTop="8"
          alignItems={"end"}
          marginLeft={300}
          className={classes.backButton}
        >
          <RotateLeftIcon />
          Back
        </Button>
      </Box>
    </Stack>
  );
}
