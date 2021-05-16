import React from "react";
import Cookies from "js-cookie";
import "jspdf-autotable";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import { Route, Switch, useRouteMatch } from "react-router";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";

import Header from "../starters/header.js";
import Checkout from "./checkout/Checkout.js";
import { Avatar, IconButton } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 120,
  },
  cardRoot: {
    maxWidth: 345,
  },
}));

export default function Cart() {
  const classes = useStyles();

  const [cart, setCart] = React.useState(Cookies.getJSON("cart"));
  const { url } = useRouteMatch();
  const [totalAmount, setTotalAmount] = React.useState(
    cart.cart.reduce(
      (a, b) => parseFloat((a + (b["effectivePrice"] || 0)).toFixed(2)),
      0
    )
  );
  const handleChange = (e, id) => {
    console.log(e.target.value);
    var cart_ = cart.cart.map((item) => {
      if (item.id === id) {
        console.log({ ...item, size: e.target.value });
        return { ...item, size: e.target.value };
      }
      return item;
    });
    console.log(cart_);

    setCart({ cart: cart_ });

    Cookies.set("cart", { cart: cart_ });
  };
  const remove = (e) => {
    e.preventDefault();
    const { id } = e.target.elements;
    const cart_ = {
      cart: cart.cart.filter((item) => {
        return item.id != id.value;
      }),
    };
    Cookies.set("cart", cart_);
    setCart(cart_);
  };
  const quan = (opr, id) => {
    var cart_ = cart.cart;

    cart_ = cart_.map((item) => {
      if (item.id === id) {
        if (opr === "+") {
          item.quantity = item.quantity + 1;
          item.effectivePrice = parseFloat(
            (item.quantity * item.price).toFixed(2)
          );
        } else {
          if (item.quantity > 1) {
            item.quantity = item.quantity - 1;
            item.effectivePrice = parseFloat(
              (item.quantity * item.price).toFixed(2)
            );
          }
        }
      }
      return item;
    });
    cart_ = { cart: cart_ };
    console.log(cart_);
    Cookies.set("cart", cart_);
    setCart(cart_);
  };
  React.useEffect(() => {
    setTotalAmount(
      cart.cart.reduce(
        (a, b) => parseFloat((a + (b["effectivePrice"] || 0)).toFixed(2)),
        0
      )
    );
  }, [cart]);

  console.log(url);
  return cart ? (
    <Switch>
      <Route exact path={`${url}`}>
        <Header />
        <div className="flex">
          <div className="flex-1" />
          <div
            id="cart"
            className="w-2/4 flex flex-row flex-wrap justify-between"
          >
            {cart.cart.map((item) => {
              return (
                <div className="mb-4">
                  <Card className={classes.cardRoot}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        alt="Contemplative Reptile"
                        height="100px"
                        width="50vw"
                        image={item.image_link}
                        title="Contemplative Reptile"
                      />
                      <CardContent>
                        <div className="flex flex-col">
                          <div className="flex flex-row">
                            <p className="font-black text-3xl mb-2">
                              {item.name}
                            </p>
                            <p className="font-black text-3xl mb-2">
                              &#8377; {item.price}
                            </p>
                          </div>
                          <div className="flex flex-row">
                            <div className="flex flex-row">
                              <IconButton onClick={() => quan("+", item.id)}>
                                <AddIcon />
                              </IconButton>
                              <Avatar
                                style={{
                                  background: "none",
                                  color: "black",
                                  fontWeight: 500,
                                  paddingTop: 10,
                                }}
                              >
                                {item.quantity}
                              </Avatar>
                              <IconButton onClick={() => quan("-", item.id)}>
                                <RemoveIcon />
                              </IconButton>
                            </div>
                            <div>
                              <FormControl className={classes.formControl}>
                                <InputLabel id="demo-simple-select-label">
                                  <p className="font-black text-2xl">Size</p>
                                </InputLabel>
                                <Select
                                  color="secondary"
                                  labelId="demo-simple-select-label"
                                  id={item.id}
                                  defaultValue={item.size}
                                  onChange={(e) => handleChange(e, item.id)}
                                  className="text-2xl text-black font-black"
                                >
                                  {item.availSize.map((size) => {
                                    return (
                                      <MenuItem
                                        className="text-2xl text-black font-black"
                                        value={size}
                                      >
                                        <p className="mt-1 m-0 text-black font-bold">
                                          {size}
                                        </p>
                                      </MenuItem>
                                    );
                                  })}
                                </Select>
                              </FormControl>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                      <form className="m-0 w-full" onSubmit={remove}>
                        <input name="id" hidden value={item.id} />
                        <Button
                          style={{
                            backgroundColor: "#ff084e",
                            color: "white",
                            width: "100%",
                          }}
                          type="submit"
                        >
                          Remove
                        </Button>
                      </form>
                    </CardActions>
                  </Card>
                </div>
              );
            })}
          </div>
          <div className="flex-1" />
        </div>
        <div className="flex flex-row m-4">
          <div className="flex-1" />
          <Button
            onClick={() => {
              window.location.href = "/cart/checkout";
            }}
            style={{
              backgroundColor: "#ff084e",
              width: "12.5%",
              height: 50,
              color: "white",
              fontWeight: 900,
              fontSize: 20,
            }}
            disabled={cart.cart.length == 0}
          >
            Pay {totalAmount} &#8377;
          </Button>
          <div className="flex-1" />
        </div>
      </Route>
      <Route exact path={`${url}/checkout`}>
        <Checkout />
      </Route>
      <Route path={`${url}/checkout/buy`}>
        <Checkout buyNow />
      </Route>
    </Switch>
  ) : (
    <></>
  );
}
