import * as React from "react";
import {
  Box,
  Button,
  Grid,
  Card,
  CardMedia,
  Typography,
  Stack,
} from "@mui/material";
import { makeStyles } from "tss-react/mui";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";

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

        <Grid container spacing={1} paddingTop={2} xm={2} paddingLeft={1}>
          {albumImages.map((image, index) => {
            return (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <Card>
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
