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

import { Button } from "@material-ui/core";
import { Route, Switch, useRouteMatch } from "react-router";

export default function Cart() {
  const [cart, setCart] = React.useState(Cookies.getJSON("cart"));
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

  const pdf = () => {
    var doc = new jsPDF();
    const tableColumn = ["Name", "Price", "Shop", "Address"];
    var sum = 0;
    const tableRows = cart.cart.map((item) => {
      sum += parseInt(item.price);
      return [
        item.name,
        item.price,
        item.shop,
        `https://www.google.co.in/maps/@${item.latitude},${item.longitude},16z`,
      ];
    });

    tableRows.push([`Approximate shopping expendicture: Rs. ${sum}`]);

    doc.autoTable({
      startY: 20,
      columns: tableColumn,
      body: tableRows,
    });
    doc.save("list.pdf");
  };
  console.log(url)
  return cart ? (
    <Switch>
      <Route exact path={`${url}`}>
      <Header />
      <div id="cart">
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>Product</TableCell>
                <TableCell>Shop</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Remove</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cart.cart.map((item) => {
                return (
                  <TableRow>
                    <TableCell>
                      <img
                        height="150px"
                        width="150px"
                        alt={item.name}
                        src={item.image_link}
                      />
                    </TableCell>
                    <TableCell>{item.id}</TableCell>
                    <TableCell> {item.name} </TableCell>
                    <TableCell> {item.price} </TableCell>
                    <TableCell>
                      <form onSubmit={remove}>
                        <input name="id" hidden value={item.id} />
                        <Button style={{ backgroundColor: "#ff084e",
                        color: "white",}}type="submit">Remove</Button>
                      </form>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <div className="flex flex-row">
          <div className="flex-1" />
        <Button 
        onClick={()=>{
          window.location.href="/cart/checkout"
        }}
        style={{ backgroundColor: "#ff084e",
                        color: "white",}} >Pay</Button>
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
