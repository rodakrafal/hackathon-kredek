import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { Modal } from "./components/Modal";

export const FeatureAdd = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Button
        variant="contained"
        endIcon={<AddIcon />}
        onClick={handleClickOpen}
      >
        Add sugestion
      </Button>
      <Modal open={open} handleClose={handleClose} />
    </>
  );
};
