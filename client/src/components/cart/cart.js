import React from "react";
import { jsPDF } from "jspdf";
import Cookies from "js-cookie";
import "jspdf-autotable";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Header from "../header.js";
import Checkout from "./checkout/Checkout.js";

import { Button, Typography } from "@material-ui/core";
import { Route, Switch, useRouteMatch } from "react-router";

export default function Cart() {
  const [cart, setCart] = React.useState(Cookies.getJSON("cart"));
  const [totalAmount, setTotalAmount] = React.useState(
    cart.cart.reduce((a, b) => a + (b["effectivePrice"] || 0), 0)
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
      cart.cart.reduce((a, b) => a + (b["effectivePrice"] || 0), 0)
    );
  }, [cart]);

  console.log(url);
  return cart ? (
    <Switch>
      <Route exact path={`${url}`}>
        <Header />
        <div id="cart">
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
                    Product
                  </TableCell>
                  <TableCell style={{ width: "16%", textAlign: "center" }}>
                    Shop
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
      <Route path={`${url}/checkout`}>
        <Checkout />
      </Route>
    </Switch>
  ) : (
    <></>
  );
}
