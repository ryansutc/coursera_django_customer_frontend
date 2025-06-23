import { Box, Divider, Grid, Typography } from "@mui/material";

export default function CartItemCard({
  title,
  price,

  quantity,
}: {
  title: string;
  price: number;

  quantity: number;
}) {
  return (
    <>
      <Grid
        container
        size={12}
        spacing={2}
        sx={{ minHeight: "40px", margin: "12px" }}
      >
        <Grid size={4} sx={{ bgcolor: "secondary.light" }}>
          {/* Cart item content goes here */}
          <Box>Image here</Box>
        </Grid>
        <Grid size={8}>
          {/* Cart item content goes here */}
          <Typography variant="h6">{title}</Typography>
          <Typography variant="body1">Price: ${price.toFixed(2)}</Typography>
        </Grid>
      </Grid>
      <Divider flexItem />
    </>
  );
}
