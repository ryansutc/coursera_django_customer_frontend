import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import {
  useAddCartItem,
  useCartItems,
  useUpdateCartItem,
} from "@/hooks/useCartItems";

import { useStateContext } from "@/contexts";

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
  const { user } = useStateContext();
  const { data: cartItems } = useCartItems(user);
  const addCartItemMutation = useAddCartItem();
  const updateCartItemMutation = useUpdateCartItem();
  const existingItem = cartItems
    ? cartItems.find((v) => v.menuitem === id)
    : undefined;
  const handleAddToCart = (id: number) => {
    // Logic to add the item to the cart

    if (!existingItem) {
      addCartItemMutation.mutate({
        menuitem: id,
        quantity: 1,
      });
    } else {
      updateCartItemMutation.mutate({
        data: {
          quantity: (existingItem?.quantity ?? 0) + 1,
        },
        id: existingItem.id,
      });
    }
  };
  return (
    <Card
      sx={{
        "&:hover": {
          backgroundColor: "action.selectedHover",
          filter: "brightness(0.95)",
        },
        borderRadius: {
          sm: "12px",
          xs: "8px",
        },
        color: "secondary.contrastText",
        margin: "8px",
        marginBottom: "16px",
        transition: "filter 0.1s ",
        width: "100%",
      }}
    >
      <div
        style={{
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
          maxHeight: "400px",
          overflow: "hidden",
        }}
      >
        <Box
          title={title}
          sx={{
            bgcolor: "secondary.light",
            height: "200px",
            width: "110%",
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

        <div
          style={{
            marginBottom: "16px",
            marginTop: "16px",
          }}
        >
          <Grid container justifyContent="center" alignItems="center">
            {user && (
              <Button
                variant="contained"
                color="primary"
                disabled={!!existingItem}
                onClick={() => handleAddToCart(id)}
              >
                Add to Cart
              </Button>
            )}
          </Grid>
        </div>
      </CardContent>
    </Card>
  );
}
