import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Rating1 from "./Rating1";
import { APP } from "../../firebase/firebaseConfig";
import axios from "axios";
import server from "../../starters/serverChoose";

export default function Feedback({ open, setOpen }) {
  const [value, setValue] = React.useState(2);

  const submit = (e) => {
    e.preventDefault();
    const { subject, message } = e.target.elements;
    APP.auth()
      .currentUser.getIdToken()
      .then((token) => {
        axios
          .post(
            server + "api/feedback",
            {
              subject: subject.value,
              message: message.value,
              rating: value,
            },
            {
              headers: {
                authorization: token,
              },
            }
          )
          .then((res) => {
            if (res.data === "success") {
              alert("Thank you for your special feedback!!");
            } else {
              throw new Error("error while feedback");
            }
          })
          .catch((err) => {
            console.log(err);
            alert("Error Occured\nTry after some time");
          });
      });
  };
  return (
    <div>
      <Dialog open={open} onClose={setOpen} aria-labelledby="form-dialog-title">
        <form onSubmit={submit}>
          <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please provide feedback for DNA Match so that we can improve!!
            </DialogContentText>
            <TextField
              variant="outlined"
              autoFocus
              margin="dense"
              id="subject"
              label="Subject"
              type="text"
              name="subject"
              fullWidth
              required
            />

            <TextField
              variant="outlined"
              margin="dense"
              id="message"
              label="Message"
              type="text"
              name="message"
              fullWidth
              required
            />
            <Rating1 value={value} setValue={setValue} />
          </DialogContent>
          <DialogActions>
            <Button
              style={{ backgroundColor: "#ff084e", color: "white" }}
              onClick={setOpen}
            >
              Cancel
            </Button>
            <Button
              style={{ backgroundColor: "#ff084e", color: "white" }}
              type="submit"
              onClick={setOpen}
            >
              Send Feedback
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
