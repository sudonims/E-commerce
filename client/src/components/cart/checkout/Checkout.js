import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Typography from "@material-ui/core/Typography";
import AddressForm from "./AddressForm";
import Review from "./Review";
import Header from "../../starters/header";
import Footer from "../../starters/footer";
import StepOrderContext from "./stepOrderContext";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const steps = ["Shipping address", "Review your order"];

function getStepContent(step, classes, buyNow) {
  switch (step) {
    case 0:
      return <AddressForm classes={classes} />;
    case 1:
      return <Review buyNow={buyNow} classes1={classes} />;
    default:
      throw new Error("Unknown step");
  }
}

export default function Checkout({ buyNow }) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [orderId, setOrderId] = React.useState("");
  const [address, setAddress] = React.useState({
    firstName: "",
    lastName: "",
    address1: "",
    address2: "",
    city: "",
    zip: "",
    state: "",
    country: "",
  });

  return (
    <StepOrderContext.Provider
      value={{
        activeStep,
        setActiveStep,
        orderId,
        setOrderId,
        address,
        setAddress,
      }}
    >
      <CssBaseline />
      <AppBar position="absolute" color="default" className={classes.appBar}>
        <Header />
      </AppBar>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography
            style={{
              padding: "10px 0px 10px 0px",
              borderRadius: 10,
              backgroundColor: "#ff084e",
              color: "white",
              fontWeight: 900,
            }}
            component="h1"
            variant="h4"
            align="center"
          >
            Checkout with DNA Match
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is {orderId}. We have emailed your order
                  confirmation, and will send you an update when your order has
                  shipped.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep, classes, buyNow)}
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
        <Footer />
      </main>
    </StepOrderContext.Provider>
  );
}
