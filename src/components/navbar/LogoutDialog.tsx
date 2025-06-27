import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

interface LogoutDialogProps {
  open: boolean;
  cartQuantity: number;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function LogoutDialog({
  open,
  cartQuantity,
  onConfirm,
  onCancel,
}: LogoutDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={onCancel}
      aria-labelledby="logout-dialog-title"
      aria-describedby="logout-dialog-description"
    >
      <DialogTitle id="logout-dialog-title">
        Confirm Logout
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="logout-dialog-description">
          You have {cartQuantity} item{cartQuantity !== 1 ? 's' : ''} in your cart. 
          If you log out, your cart will be lost. Are you sure you want to continue?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="primary">
          Cancel
        </Button>
        <Button onClick={onConfirm} color="error" autoFocus>
          Logout
        </Button>
      </DialogActions>
    </Dialog>
  );
}