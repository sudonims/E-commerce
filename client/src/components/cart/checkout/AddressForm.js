import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
} from "@material-ui/core";
import StepOrderContext from "./stepOrderContext";
import { func } from "prop-types";

export default function AddressForm({ classes }) {
  const { activeStep, setActiveStep, address, setAddress } = React.useContext(
    StepOrderContext
  );

  const [open, setOpen] = React.useState(false);
  const [position, setPosition] = React.useState(null);

  React.useEffect(getLocation, []);

  const addressSubmit = (e) => {
    e.preventDefault();

    const {
      firstName,
      lastName,
      address1,
      address2,
      city,
      zip,
      state,
      country,
    } = e.target.elements;

    setAddress({
      firstName: firstName.value,
      lastName: lastName.value,
      address1: address1.value,
      address2: address2.value,
      city: city.value,
      zip: zip.value,
      state: state.value,
      country: country.value,
    });

    setOpen(!open);
  };

  const confirmAdress = () => {
    setActiveStep(activeStep + 1);
  };

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position);
        setPosition({
          latitute: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      }, showError);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  function showError(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        alert("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        alert("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        alert("The request to get user location timed out.");
        break;
      case error.UNKNOWN_ERROR:
        alert("An unknown error occurred.");
      default:
        alert("Something went wrong");
    }
  }

  async function getAddres() {
    await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?lating=${position.latitute},${position.longitude}&sensor=false&key=AIzaSyDuarGo4no_QhTQFLlJBW2do2LuOwiSLSQ`
    )
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => alert(err));
  }
  console.log(position);
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Dialog open={open} onClose={() => setOpen(!open)}>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="firstName"
                name="firstName"
                label="First name"
                fullWidth
                autoComplete="given-name"
                value={address.firstName || ""}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="lastName"
                name="lastName"
                label="Last name"
                fullWidth
                autoComplete="family-name"
                value={address.lastName || ""}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="address1"
                name="address1"
                label="Address line 1"
                fullWidth
                autoComplete="shipping address-line1"
                value={address.address1 || ""}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="address2"
                name="address2"
                label="Address line 2"
                fullWidth
                autoComplete="shipping address-line2"
                value={address.address2 || ""}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="city"
                name="city"
                label="City"
                fullWidth
                autoComplete="shipping address-level2"
                value={address.city || ""}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="state"
                name="state"
                label="State/Province/Region"
                fullWidth
                value={address.state || ""}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="zip"
                name="zip"
                label="Zip / Postal code"
                fullWidth
                autoComplete="shipping postal-code"
                value={address.zip || ""}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="country"
                name="country"
                label="Country"
                fullWidth
                autoComplete="shipping country"
                value={address.country || ""}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(!open)}>Cancel</Button>
          <Button onClick={confirmAdress}>Confirm</Button>
        </DialogActions>
      </Dialog>
      <form onSubmit={addressSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="firstName"
              name="firstName"
              label="First name"
              fullWidth
              autoComplete="given-name"
              defaultValue={address.firstName || ""}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="lastName"
              name="lastName"
              label="Last name"
              fullWidth
              autoComplete="family-name"
              defaultValue={address.lastName || ""}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="address1"
              name="address1"
              label="Address line 1"
              fullWidth
              autoComplete="shipping address-line1"
              defaultValue={address.address1 || ""}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="address2"
              name="address2"
              label="Address line 2"
              fullWidth
              autoComplete="shipping address-line2"
              defaultValue={address.address2 || ""}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="city"
              name="city"
              label="City"
              fullWidth
              autoComplete="shipping address-level2"
              defaultValue={address.city || ""}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="state"
              name="state"
              label="State/Province/Region"
              fullWidth
              defaultValue={address.state || ""}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="zip"
              name="zip"
              label="Zip / Postal code"
              fullWidth
              autoComplete="shipping postal-code"
              defaultValue={address.zip || ""}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="country"
              name="country"
              label="Country"
              fullWidth
              autoComplete="shipping country"
              defaultValue={address.country || ""}
            />
          </Grid>
        </Grid>
        <div className={classes.buttons}>
          <Button
            style={{
              backgroundColor: "#ff084e",
              color: "white",
              fontWeight: 900,
            }}
            className={classes.button}
            onClick={getAddres}
          >
            My current location
          </Button>
          <Button
            type="submit"
            style={{
              backgroundColor: "#ff084e",
              color: "white",
              fontWeight: 900,
            }}
            className={classes.button}
          >
            Next
          </Button>
        </div>
      </form>
    </React.Fragment>
  );
}
