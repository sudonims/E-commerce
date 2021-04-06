import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

export default function AlertMessage({ message, severity, onClose }) {
  const [open, setOpen] = React.useState(true);
  function handleClose(event, reason) {
    if (reason === "clickaway") {
      return;
    }
    onClose();
    setOpen(false);
  }

  console.log(message, severity);

  return (
    <div>
      <Snackbar
        style={{ backgroundColor: severity, borderRadius: "5px" }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message={message}
        ContentProps={{
          "aria-describedby": "message-id",
          style: {
            backgroundColor: severity,
            borderRadius: "5px",
          },
        }}
        action={
          <IconButton
            style={{ backgroundColor: severity }}
            key="close"
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        }
      />
    </div>
  );
}
