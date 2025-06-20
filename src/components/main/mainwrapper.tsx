import { useContext } from "react";

import { StateContext } from "@/contexts";
import {
  Grid,
  Typography,
} from "@mui/material";

import MenuList from "../menuitems/menulist";

export default function MainWrapper() {
  // page state
  const { page, user } = useContext(StateContext);
  return (
    <Grid
      id="rootWrapper"
      container
      spacing={2}
      justifyContent="center"
      style={{ width: "100%" }}
      size={12}
    >
      <Typography variant="h3">{page} </Typography>
      {page === "menu" ? <MenuList /> : null}
    </Grid>
  );
}
