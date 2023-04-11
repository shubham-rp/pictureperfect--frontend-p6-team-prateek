import * as React from "react";
import {
  Box,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Stack,
  Divider,
} from "@mui/material";
import { makeStyles } from "tss-react/mui";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import axios from "axios";

const useStyles = makeStyles()((theme) => {
  return {
    backButtonWrapper: {
      textAlign: "right",
    },
    backButton: {
      borderRadius: 16,
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

  console.log(albumName, albumDescription, albumImages);

  // React.useEffect(() => {
  //   axios
  //     .get(`${process.env.REACT_APP_BACKEND_API_URL}/api/studios/albums/${id}`)
  //     .then((response) => {
  //       setAlbumDetails(response.data);
  //       setImageList(response.data.images);
  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, [id]);
  // React.useEffect(() => {
  //   imagelist.map((imageid) => {
  //     axios
  //       .get(`http://localhost:3333/api/studios/albums/image/${imageid}`)
  //       .then((response) => {
  //         setImageUrl([...imageUrl, response.data.imagesUrl]);
  //         setImgLoading(false);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   });
  // }, [imagelist]);

  // setLoading(true);

  // if (ImgLoading) {
  //   return <div>ImageLoading...</div>;
  // }
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
          <Grid item xs={4}>
            {" "}
            <Typography variant="h4">{albumName}</Typography>
          </Grid>
          <Grid item xs={4}>
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
          </Grid>

          <Card sx={{ background: "#D3D3D3" }}>
            <Typography variant="h6" marginLeft={1}>
              <Typography variant="h5" fontWeight={"bold"}>
                {" "}
                Description{" "}
              </Typography>
              {albumDescription}
            </Typography>
          </Card>
        </Grid>

        {/* item xs={2} sm={4} md={4} */}
        <Grid container spacing={1} paddingTop={2} xm={2} paddingLeft={1}>
          {albumImages.map((image, index) => {
            return (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <Card>
                  {console.log("URLS " + image.imagesUrl)}
                  <CardMedia component="img" image={image.imagesUrl} />
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Grid>
      <Stack spacing={2} alignItems={"center"} paddingTop={2}>
        <Grid>
          {" "}
          <Button
            variant="contained"
            // className={classes.signInButton}
            onClick={handelClick}
            size="small"
            paddingTop="8"
          >
            Back
          </Button>
        </Grid>
      </Stack>
    </Stack>
  );
}
