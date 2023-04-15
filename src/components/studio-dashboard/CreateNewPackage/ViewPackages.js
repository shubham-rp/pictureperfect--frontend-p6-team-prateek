import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { makeStyles } from "tss-react/mui";
import { cardData } from "./sampleCardData";
import PackageDataDisplay from "./PackageDataDisplay";

const useStyles = makeStyles()((theme) => {
  return {
    signInButton: {
      width: 175,
      height: 48,
      fontSize: 14,
      borderRadius: 24,
      marginLeft: 150,
    },
    grid: { display: "flex", justifyContent: "center", flexWrap: "wrap" },
  };
});

export default function ViewPackages() {
  const [currentForm, setCurrentForm] = React.useState("viewPackages");
  const [packageId, setPackageId] = React.useState({});
  const [showPage, setShowPage] = React.useState(false);
  const { classes } = useStyles();

  const handleViewButton = (e) => {
    setCurrentForm("packageDataDisplay");
  };

  const handleViewClick = (cardId) => {
    setShowPage(true);
    setPackageId(cardId);
  };

  return (
    <>
      {!showPage && (
        <Grid className={classes.grid}>
          {cardData.map((card) => {
            return (
              <Card
                key={card.id}
                sx={{ maxWidth: 345, margin: "10px", padding: "10px" }}
              >
                <CardMedia
                  sx={{ height: 140 }}
                  image={card.imageURL}
                  title="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {card.cardTitle}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    onClick={() => handleViewClick(card.id)}
                    variant="contained"
                    className={classes.signInButton}
                    size="small"
                  >
                    View
                  </Button>
                </CardActions>
              </Card>
            );
          })}
        </Grid>
      )}
      {showPage && <PackageDataDisplay id={packageId} />}
    </>
  );
}
