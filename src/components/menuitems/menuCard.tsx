import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";

type MenuCardProps = {
  title: string;
  price: number;
  inventory: number;
  category: string;
};
export default function MenuCard({
  title,
  price,
  category,
}: MenuCardProps) {
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
          <Grid container justifyContent="center" alignItems="center"></Grid>
        </div>
      </CardContent>
    </Card>
  );
}
