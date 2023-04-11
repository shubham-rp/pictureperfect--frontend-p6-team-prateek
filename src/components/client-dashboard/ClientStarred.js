import React from "react";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import StudioCard from "./StudioCard";

const ClientStarred = () => {
  return (
    <div>
      <Toolbar />
      <Typography paragraph>Starred </Typography>
      <StudioCard isStarred={true} />
    </div>
  );
};

export default ClientStarred;
