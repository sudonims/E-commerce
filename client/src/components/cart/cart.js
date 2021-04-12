import React from "react";
import Cookies from "js-cookie";
import "jspdf-autotable";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Header from "../starters/header.js";
import Checkout from "./checkout/Checkout.js";
import Card from '@material-ui/core/Card';

import { Button, Typography } from "@material-ui/core";
import { Route, Switch, useRouteMatch } from "react-router";
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function Cart() {
  const classes = useStyles();
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const [cart, setCart] = React.useState(Cookies.getJSON("cart"));
  const [totalAmount, setTotalAmount] = React.useState(
    cart.cart.reduce(
      (a, b) => parseFloat((a + (b["effectivePrice"] || 0)).toFixed(2)),
      0
    )
  );
  const { url } = useRouteMatch();
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
        <div id="cart">
          <Card>
          <TableContainer>
            <Table
              style={{
                textAlign: "center",
              }}
            >
              <TableHead>
                <TableRow>
                  <TableCell style={{ width: "16%", textAlign: "center" }}>
                    Image
                  </TableCell>
                  <TableCell style={{ width: "16%", textAlign: "center" }}>
                    ProductID
                  </TableCell>
                  <TableCell style={{ width: "16%", textAlign: "center" }}>
                    Shop
                  </TableCell>
                  <TableCell style={{ width: "16%", textAlign: "center" }}>
                    Size
                  </TableCell>
                  <TableCell style={{ width: "16%", textAlign: "center" }}>
                    Price
                  </TableCell>
                  <TableCell style={{ width: "16%", textAlign: "center" }}>
                    Quantity
                  </TableCell>
                  <TableCell style={{ width: "16%", textAlign: "center" }}>
                    Remove
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cart.cart.map((item) => {
                  return (
                    <TableRow>
                      <TableCell style={{ width: "16%", textAlign: "center" }}>
                        <img
                          height="150px"
                          width="150px"
                          className="ml-8"
                          alt={item.name}
                          src={item.image_link}
                        />
                      </TableCell>
                      <TableCell style={{ width: "16%", textAlign: "center" }}>
                        {item.id}
                      </TableCell>
                      <TableCell style={{ width: "16%", textAlign: "center" }}>
                        {" "}
                        {item.name}{" "}
                      </TableCell>
                      <TableCell style={{ width: "16%", textAlign: "center" }}>
                        {" "}
                        <FormControl className={classes.formControl}>
                      <InputLabel
                        style={{ color: "black" }}
                        id="demo-simple-select-label"
                      >
                        Size
                      </InputLabel>
                      <Select
                        color="secondary"
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        // value={size}
                        onChange={handleChange}
                        className="text-2xl text-black font-black"
                      >
                        {/* {prod.sizes.map((size) => {
                          return (
                            <MenuItem
                              className="text-2xl text-black font-black"
                              value={size}
                            >
                              <p className="text-lg m-0 text-black font-bold">
                                {size}
                              </p>
                            </MenuItem>
                          );
                        })} */}
                      </Select>
                    </FormControl>
                      </TableCell>
                      <TableCell style={{ width: "16%", textAlign: "center" }}>
                        {" "}
                        {item.price}{" "}
                      </TableCell>
                      
                      <TableCell style={{ width: "16%", textAlign: "center" }}>
                        <div className="flex md:flex-row flex-col justify-evenly">
                          <Button
                            style={{
                              // marginRight: -40,
                              backgroundColor: "#ff084e",
                              color: "white",
                            }}
                            onClick={() => quan("+", item.id)}
                          >
                            +
                          </Button>
                          <Typography>{item.quantity}</Typography>
                          <Button
                            style={{
                              // marginLeft: -40,
                              backgroundColor: "#ff084e",
                              color: "white",
                            }}
                            onClick={() => quan("-", item.id)}
                          >
                            -
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell style={{ width: "16%", textAlign: "center" }}>
                        <form onSubmit={remove}>
                          <input name="id" hidden value={item.id} />
                          <Button
                            style={{
                              marginTop: 25,
                              backgroundColor: "#ff084e",
                              color: "white",
                            }}
                            type="submit"
                          >
                            Remove
                          </Button>
                        </form>
                      </TableCell>
                    </TableRow>
                  );
                })}
                <TableRow>
                  <TableCell style={{ width: "16%", textAlign: "center" }}>
                    Total Cart Value:{" "}
                  </TableCell>
                  <TableCell />
                  <TableCell />
                  <TableCell style={{ width: "16%", textAlign: "center" }}>
                    {totalAmount}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          
          </Card>
          <div className="flex flex-row">
            <div className="flex-1" />
            <Button
              onClick={() => {
                window.location.href = "/cart/checkout";
              }}
              style={{ backgroundColor: "#ff084e", color: "white" }}
              disabled={cart.cart.length == 0}
            >
              Pay
            </Button>
            <div className="flex-1" />
          </div>
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
