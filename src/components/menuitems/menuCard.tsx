import {
  useAddCartItem,
  useCartItems,
  useUpdateCartItem,
} from "@/hooks/useCartItems";
import { useStateContext } from "@/contexts";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";

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
  const existingItem = cartItems?.find((v) => v.menuitem === id);
  const handleAddToCart = (id: number) => {
    // Logic to add the item to the cart

    if (!existingItem) {
      addCartItemMutation.mutate({
        menuitem: id,
        quantity: 1,
      });
    } else {
      updateCartItemMutation.mutate({
        id: existingItem.id,
        data: {
          quantity: (existingItem?.quantity ?? 0) + 1,
        },
      });
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
              disabled={!!existingItem}
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
