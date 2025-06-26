import { Box, Divider, Grid, Typography } from "@mui/material";

import NumberInput from "../common/NumberInput";
import { useUpdateCartItem } from "@/hooks/useCartItems";

export default function CartItemCard({
  id,
  title,
  price,
  quantity,
}: {
  id: number;
  title: string;
  price: number;
  quantity: number;
}) {
  const updateCartItem = useUpdateCartItem();

  const handleQuantityChange = (newQuantity: number) => {
    updateCartItem.mutate({
      id,
      data: { quantity: newQuantity },
    });
  };

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
          <NumberInput
            value={quantity}
            onChange={handleQuantityChange}
            min={1}
            max={40}
            disabled={updateCartItem.isPending}
          />
        </Grid>
      </Grid>
      <Divider flexItem />
    </>
  );
}
