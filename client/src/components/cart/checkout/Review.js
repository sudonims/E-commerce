import React from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Button } from "@material-ui/core";
import StepOrderContext from "./stepOrderContext";
import { APP } from "../../firebase/firebaseConfig";
import server from "../../serverChoose";
import DNA from "../../assets/logo.png";
import { AuthContext } from "../../firebase/firebase";
const products = [];
const addresses = [
  "1 Material-UI Drive",
  "Reactville",
  "Anytown",
  "99999",
  "USA",
];
const payments = [];

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

export default function Review({ classes1 }) {
  const cart = Cookies.getJSON("cart");
  const amount = cart.cart.reduce((a, b) => a + (b["effectivePrice"] || 0), 0);
  const { currentUser } = React.useContext(AuthContext);
  const classes = useStyles();
  const { activeStep, setActiveStep, orderId, setOrderId } = React.useContext(
    StepOrderContext
  );

  const placeOrder = async (id) => {
    APP.auth()
      .currentUser.getIdToken()
      .then(async (token) => {
        const res = await loadScript(
          "https://checkout.razorpay.com/v1/checkout.js"
        );

        if (!res) {
          alert("Razorpay SDK failed to load. Are you online?");
          return;
        }

        const options = {
          key: "rzp_test_B96U3f6ow70StF",
          currency: "INR",
          amount: `${amount * 100}`,
          order_id: id,
          name: "DNA Match",
          description: "Thank you.",
          image: DNA,
          handler: function (response) {
            axios
              .post(
                server + "api/verifyPayment",
                {
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_order_id: response.razorpay_order_id,
                  order_id: id,
                  razorpay_signature: response.razorpay_signature,
                },
                {
                  headers: {
                    authorization: token,
                  },
                }
              )
              .then((res) => {
                if (res.status === 200) {
                  if (res.data === "success") {
                    alert("Payment Success");
                  }
                }
              });
          },
          prefill: {
            name: currentUser.displayName,
            email: currentUser.email,
            phone_number: currentUser.phone_number,
          },
        };
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      });
  };

  const makeOrder = () => {
    APP.auth()
      .currentUser.getIdToken()
      .then((token) => {
        axios
          .post(
            server + "api/orders",
            {
              amount: amount * 100,
              currency: "INR",
            },
            {
              headers: {
                authorization: token,
              },
            }
          )
          .then((res) => {
            if (res.status === 200) {
              console.log(res.data);
              placeOrder(res.data.id);
            }
          });
      });
  };

  console.log(amount);

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {cart.cart.map((product) => (
          <ListItem className={classes.listItem} key={product.name}>
            <ListItemText primary={product.name} secondary={product.desc} />
            <Typography variant="body2">{product.price}</Typography>
          </ListItem>
        ))}
        <ListItem>
          <ListItemText>Total Price:</ListItemText>
          <Typography>{amount}</Typography>
        </ListItem>
      </List>
      <div className={classes1.buttons}>
        <Button
          style={{
            backgroundColor: "#ff084e",
            color: "white",
            fontWeight: 900,
          }}
          onClick={() => setActiveStep(activeStep - 1)}
          className={classes1.button}
        >
          Back
        </Button>
        <Button
          style={{
            backgroundColor: "#ff084e",
            color: "white",
            fontWeight: 900,
          }}
          variant="contained"
          color="primary"
          className={classes1.button}
          onClick={makeOrder}
        >
          Place order
        </Button>
      </div>
    </React.Fragment>
  );
}
