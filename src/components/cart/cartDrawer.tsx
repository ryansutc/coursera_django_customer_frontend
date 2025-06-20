import { Drawer } from "@mui/material";

export default function CartDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <Drawer
      anchor="right"
      open={open} // This should be controlled by a state variable
      onClose={onClose} // This should be a function to close the drawer
    >
      some cart stuff here
    </Drawer>
  );
}
