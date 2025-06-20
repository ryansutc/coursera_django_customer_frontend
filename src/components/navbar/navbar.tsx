import { Divider } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Grid from "@mui/material/Grid";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import NavBarMenu from "./navbarMenu";

export default function NavBar() {
  return (
    <AppBar
      position="fixed"
      enableColorOnDark
      sx={{
        boxShadow: 0,
        bgcolor: "background.default",
        backgroundImage: "none",
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          color="black"
          component="div"
          sx={{ flexGrow: 1 }}
        >
          Little Lemon Restaurant
        </Typography>
        <NavBarMenu />
      </Toolbar>
      <Grid container justifyContent="center">
        <Divider id="divider" style={{ width: "95%" }} />
      </Grid>
    </AppBar>
  );
}
