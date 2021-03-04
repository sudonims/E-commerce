import React from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import Logo from './assets/logo.png';
import { Button, Drawer, Hidden } from "@material-ui/core";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

const useStyles = makeStyles((theme) => ({
  title: {
    justifyContent: "left",
    [theme.breakpoints.down("md")]: {
      justifyContent: 'center'
    },
  },
}));

export default function Header({ rightlinks, leftlinks }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [width, setWidth] = React.useState(window.innerWidth);

  React.useEffect((width) => {
    window.addEventListener('resize', () => {
      setWidth(window.innerWidth);
    });
  }, [width]);

  return (
    <>
    <Drawer anchor="right" open={open} onClose={() => setOpen(!open)}>
        <>Some Shit</>
    </Drawer>
    <header className="header_area bg-img background-overlay-white">
      <div className="top_header_area flex flex-row m-2 justify-between">
        <div className="">
                  <a href="#">
                    <img src={Logo} alt="" height={width>1200 ? width*0.1 : '100'} width={width>1200 ? width*0.1 : '100'} style={{}} />
                  </a>
        </div>
        <div className="main_header_area mt-8">
          <div className="row h-100">
            <div className="col-12 d-md-flex justify-content-between">
              <div className="main-menu-area">
                <nav className="navbar navbar-expand-lg align-items-start">
                  <button
                    onClick={() => setOpen(!open)}
                    style={{paddingLeft: -20}}
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#karl-navbar"
                    aria-controls="karl-navbar"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  >
                    <span className="navbar-toggler-icon">
                      <i className="ti-menu"></i>
                    </span>
                  </button>
                  <Hidden mdDown>
                    <ul className="navbar-nav animated" id="nav">
                      <li className="nav-item active">
                        <a className="nav-link" href="/">
                          Home
                        </a>
                      </li>
                      <li className="nav-item dropdown">
                        <a
                          className="nav-link dropdown-toggle"
                          href="#"
                          id="karlDropdown"
                          role="button"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          Pages
                        </a>
                        <div
                          className="dropdown-menu"
                          aria-labelledby="karlDropdown"
                        >
                          <a className="dropdown-item" href="index.html">
                            Home
                          </a>
                          <a className="dropdown-item" href="shop.html">
                            Shop
                          </a>
                          <a className="dropdown-item" href="product-details.html">
                            Product Details
                          </a>
                          <a className="dropdown-item" href="cart.html">
                            Cart
                          </a>
                          <a className="dropdown-item" href="checkout.html">
                            Checkout
                          </a>
                        </div>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="#">
                          About Us
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="/contactus">
                          Contact Us
                        </a>
                      </li>
                    </ul>

                  </Hidden>
                </nav>
              </div>
            </div>
          </div>
        </div>
        <Hidden mdDown>
        <div className="flex flex-row mt-8">
          <ul className="navbar-nav animated flex flex-row mt-8 mr-8 hidden md:block" id="nav">
          <li className="nav-item">
            <Button href='/signup' style={{backgroundColor:'#ff084e',color:'white',fontWeight:900}}>Join Us</Button>
          </li>
          <li className="nav-item">
            <IconButton href='/cart' style={{backgroundColor:'#ff084e',color:'white',fontWeight:900,marginTop:-10,marginLeft:10}}><ShoppingCartIcon /></IconButton>
          </li>
        </ul>
        </div>

        </Hidden>
      </div>
    </header>
    </>
  );
}


// <ul className="navbar-nav animated" id="nav">