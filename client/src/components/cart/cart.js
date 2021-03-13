import React from 'react';
import { jsPDF } from 'jspdf';
import Cookies from 'js-cookie';
import 'jspdf-autotable';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Header from '../header.js';


import { Button } from '@material-ui/core';


export default function Cart() {
  // const { cart, updateCart } = React.useContext(CartContext);
  const [cart, setCart] = React.useState(null);
  // const cart = Cookies.getJSON('cart');
  React.useEffect(() => {
    setCart({cart :[
        
        {
    id : 1,
    name: 'levis',
    price : '39.40$',

    }]});
  }, []);
  const remove = (e) => {
    e.preventDefault();
    const { name } = e.target.elements;
    const cart_ = {
      cart: cart.cart.filter((item) => {
        return item.name !== name.value;
      }),
    };
    Cookies.set('cart', cart_);
    setCart(cart_);
  };

  const pdf = () => {
    var doc = new jsPDF();
    const tableColumn = ['Name', 'Price', 'Shop', 'Address'];
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
    doc.save('list.pdf');
  };

  return cart ? (
    <>
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
                        <input name="name" hidden value={item.name} />
                        <Button type="submit">Remove</Button>
                      </form>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <Button onClick={pdf}>Download pdf</Button>
      </div>
    </>
  ) : (
    <></> 
  );
}