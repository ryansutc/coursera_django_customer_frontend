import { Box, Grid, Typography } from "@mui/material";

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
    <Grid container size={12} spacing={2} sx={{ height: "240px" }}>
      <Grid size={4}>
        {/* Cart item content goes here */}
        <Box sx={{ bgColor: "primary.light" }}></Box>
      </Grid>
      <Grid size={8}>
        {/* Cart item content goes here */}
        <Typography variant="h6">{title}</Typography>
        <Typography variant="body1">Price: ${price.toFixed(2)}</Typography>
        <input type="number">Quantity: {quantity}</input>
      </Grid>
      {/* Add more cart items as needed */}
    </Grid>
  );
}
