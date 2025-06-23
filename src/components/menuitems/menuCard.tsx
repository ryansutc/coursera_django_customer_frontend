import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";

import { useStateContext } from "@/contexts";
import { zodiosAPI } from "@/types/axiosClient";

type MenuCardProps = {
  id: number;
  title: string;
  price: number;
  inventory: number;
  category: string;
};
export default function MenuCard({
  title,
  price,
  category,
  id,
}: MenuCardProps) {
  const { cartItems, setCartItems } = useStateContext();
  const handleAddToCart = async (id: number) => {
    // Logic to add the item to the cart
    console.log(`Added ${title} to cart`);

    try {
      const existingItem = cartItems.find((v) => v.id === id);
      let newOrModifiedItem = null;
      if (!existingItem) {
        // @ts-expect-error method does not exist.
        newOrModifiedItem = await zodiosAPI.api_cart_items_create({
          menuitem: id,
          quantity: 1,
        });
      } else {
        // @ts-expect-error method does not exist.
        newOrModifiedItem = await zodiosAPI.api_cart_items_partial_update({
          menuitem: id,
          quantity: existingItem?.quantity ? existingItem.quantity + 1 : 1,
        });
      }

      setCartItems([
        ...cartItems.filter((item) => item.id !== id), // Remove existing item if it exists
        {
          id,
          quantity: existingItem?.quantity ? existingItem.quantity + 1 : 1,
        },
      ]);
    } catch (error) {
      console.error("Failed to add item to cart:", error.message);
    }
  };
  return (
    <Card
      sx={{
        transition: "filter 0.1s ",
        margin: "8px",
        marginBottom: "16px",
        "&:hover": {
          backgroundColor: "action.selectedHover",
          filter: "brightness(0.95)",
        },
        color: "secondary.contrastText",
        borderRadius: { xs: "8px", sm: "12px" },
        width: "100%",
      }}
    >
      <div
        style={{
          maxHeight: "400px",
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          title={title}
          sx={{
            width: "110%",
            bgcolor: "secondary.light",
            height: "200px",
          }}
        />
      </div>
      <CardContent
        style={{ padding: "8px" }}
        sx={{ color: "secondary.contrastText" }}
      >
        <Typography variant="h5" sx={{ marginBottom: "4px" }}>
          {title}
        </Typography>

        <Typography variant="body1" sx={{ marginBottom: "4px" }}>
          {price}
        </Typography>

        <Typography variant="body1" sx={{ marginBottom: "4px" }}>
          {category}
        </Typography>

        <div style={{ marginTop: "16px", marginBottom: "16px" }}>
          <Grid container justifyContent="center" alignItems="center">
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleAddToCart(id)}
            >
              Add to Cart
            </Button>
          </Grid>
        </div>
      </CardContent>
    </Card>
  );
}
