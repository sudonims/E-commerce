import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { useSnackbar } from "notistack";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
} from "@material-ui/core";
import StepOrderContext from "./stepOrderContext";
import AddressContext from "./addressContext";

const FormCust = ({ address, classes, getAddres, setOpen }) => {
  const { updateAddress } = React.useContext(AddressContext);
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

    updateAddress({
      firstName: firstName.value,
      lastName: lastName.value,
      house_number: address1.value,
      address2: address2.value,
      town: city.value,
      postcode: zip.value,
      state: state.value,
      country: country.value,
    });

    setOpen();
  };

  console.log(address);
  return (
    <form onSubmit={addressSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            // autoComplete="given-name"
            value={address ? address.firstName : ""}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            // autoComplete="family-name"
            value={address ? address.lastName : ""}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Address line 1"
            fullWidth
            // autoComplete="shipping address-line1"
            value={address ? address.house_number : ""}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address2"
            name="address2"
            label="Address line 2"
            fullWidth
            // autoComplete="shipping address-line2"
            value={address ? address.address2 : ""}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            // autoComplete="shipping address-level2"
            value={address ? address.town : ""}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="state"
            name="state"
            label="State/Province/Region"
            fullWidth
            value={address ? address.state : ""}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Zip / Postal code"
            fullWidth
            // autoComplete="shipping postal-code"
            value={address ? address.postcode : ""}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            fullWidth
            // autoComplete="shipping country"
            value={address ? address.country : ""}
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
  );
};

export default function AddressForm({ classes }) {
  const { enqueueSnackbar } = useSnackbar();
  const { activeStep, setActiveStep } = React.useContext(StepOrderContext);
  const { address, updateAddress } = React.useContext(AddressContext);

  const [open, setOpen] = React.useState(false);
  const [position, setPosition] = React.useState(null);

  React.useEffect(getLocation, []);

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
      enqueueSnackbar("Geolocation is not supported by this browser!!", {
        variant: "error",
      });
    }
  }

  function showError(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        enqueueSnackbar("User denied the request for Geolocation.", {
          variant: "error",
        });
        break;
      case error.POSITION_UNAVAILABLE:
        enqueueSnackbar("Location information is unavailable", {
          variant: "error",
        });
        break;
      case error.TIMEOUT:
        enqueueSnackbar("The request to get user location timed out.", {
          variant: "error",
        });
        break;
      case error.UNKNOWN_ERROR:
        enqueueSnackbar("An unknown error occurred", {
          variant: "error",
        });
      default:
        enqueueSnackbar("Something went wrong", {
          variant: "error",
        });
    }
  }

  async function getAddres() {
    await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${position.latitute}+${position.longitude}&key=79b83f97c27a423c9d683d449ef7fe46`
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        //   {
        //     "ISO_3166-1_alpha-2": "IN",
        //     "ISO_3166-1_alpha-3": "IND",
        //     "_category": "commerce",
        //     "_type": "restaurant",
        //     "continent": "Asia",
        //     "country": "India",
        //     "country_code": "in",
        //     "house_number": "15 New Subhedar lay out nashik nagar",
        //     "postcode": "440024",
        //     "restaurant": "Savis Kitchen",
        //     "state": "Maharashtra",
        //     "state_code": "MH",
        //     "state_district": "Jalna",
        //     "town": "Ambad"
        // }
        updateAddress(data.results[0].components);
      })
      .catch((err) => alert(err));
  }

  console.log("a", address);
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      {address && JSON.stringify(address)}
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
                // autoComplete="given-name"
                defaultValue={address ? address.firstName : ""}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="lastName"
                name="lastName"
                label="Last name"
                fullWidth
                // autoComplete="family-name"
                defaultValue={address ? address.lastName : ""}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="address1"
                name="address1"
                label="Address line 1"
                fullWidth
                // autoComplete="shipping address-line1"
                defaultValue={address ? address.house_number : ""}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="address2"
                name="address2"
                label="Address line 2"
                fullWidth
                // autoComplete="shipping address-line2"
                defaultValue={address ? address.address2 : ""}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="city"
                name="city"
                label="City"
                fullWidth
                // autoComplete="shipping address-level2"
                defaultValue={address ? address.town : ""}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="state"
                name="state"
                label="State/Province/Region"
                fullWidth
                defaultValue={address ? address.state : ""}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="zip"
                name="zip"
                label="Zip / Postal code"
                fullWidth
                // autoComplete="shipping postal-code"
                defaultValue={address ? address.postcode : ""}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="country"
                name="country"
                label="Country"
                fullWidth
                // autoComplete="shipping country"
                defaultValue={address ? address.country : ""}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(!open)}>Cancel</Button>
          <Button onClick={confirmAdress}>Confirm</Button>
        </DialogActions>
      </Dialog>
      <FormCust
        address={address}
        classes={classes}
        getAddres={() => getAddres()}
        setOpen={() => setOpen(!open)}
      />
    </React.Fragment>
  );
}
