import { Box, Divider, Grid, IconButton, Typography } from "@mui/material";
import { useDeleteCartItem, useUpdateCartItem } from "@/hooks/useCartItems";

import DeleteIcon from "@mui/icons-material/Delete";
import NumberInput from "../common/NumberInput";

export default function CartItemCard({
  id,
  title,
  price,
  quantity,
}: {
  id: number;
  title: string;
  price: string;
  quantity: number;
}) {
  const updateCartItem = useUpdateCartItem();
  const deleteCartItem = useDeleteCartItem();

  const handleQuantityChange = (newQuantity: number) => {
    updateCartItem.mutate({
      data: {
        quantity: newQuantity,
      },
      id,
    });
  };

  const handleDelete = () => {
    deleteCartItem.mutate(id);
  };

  return (
    <>
      <Grid
        container
        size={12}
        spacing={2}
        sx={{
          margin: "12px",
          minHeight: "40px",
        }}
      >
        <Grid size={4} sx={{ bgcolor: "secondary.light" }}>
          {/* Cart item content goes here */}
          <Box>Image here</Box>
        </Grid>
        <Grid size={8}>
          {/* Cart item content goes here */}
          <Box
            sx={{
              alignItems: "flex-start",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Typography variant="h6">{title}</Typography>
              <Typography variant="body1">Price: ${price}</Typography>
              <NumberInput
                value={quantity}
                onChange={handleQuantityChange}
                min={1}
                max={40}
                disabled={updateCartItem.isPending}
              />
            </Box>
            <IconButton
              onClick={handleDelete}
              disabled={deleteCartItem.isPending}
              title="remove item from cart"
              aria-label="Remove item from cart"
              sx={{ color: "error.dark" }}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        </Grid>
      </Grid>
      <Divider flexItem />
    </>
  );
}
