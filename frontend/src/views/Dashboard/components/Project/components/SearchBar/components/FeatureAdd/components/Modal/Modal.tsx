import {
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  Dialog,
  TextField,
  Button,
} from "@mui/material";
export const Modal = ({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) => {
  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Share</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add a suggestion to the project, please fill the text fields
            below. Make sure yours suggestion doesn't repeat itself!
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            fullWidth
            variant="filled"
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Subject of the suggestion"
            multiline
            rows={4}
            fullWidth
            variant="filled"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Add sugestion</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
