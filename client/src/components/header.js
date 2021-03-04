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

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

export default function Header({ rightlinks, leftlinks }) {
  const classes = useStyles();

  return (
    <header class="header_area bg-img background-overlay-white">
      <div class="top_header_area">
        <div class="container h-100">
          <div class="row h-100 align-items-center justify-content-end">
            <div class="col-12 col-lg-7">
              <div class="top_single_area d-flex align-items-center">
                <div class="top_logo">
                  <a href="#">
                    <img src="img/core-img/logo.png" alt="" />
                  </a>
                </div>
                <div class="header-cart-menu d-flex align-items-center ml-auto">
                  <div class="cart">
                    <a href="#" id="header-cart-btn" target="_blank">
                      <span class="cart_quantity">2</span>{" "}
                      <i class="ti-bag"></i> Your Bag $20
                    </a>

                    <ul class="cart-list">
                      <li>
                        <a href="#" class="image">
                          <img
                            src="img/product-img/product-10.jpg"
                            class="cart-thumb"
                            alt=""
                          />
                        </a>
                        <div class="cart-item-desc">
                          <h6>
                            <a href="#">Women's Fashion</a>
                          </h6>
                          <p>
                            1x - <span class="price">$10</span>
                          </p>
                        </div>
                        <span class="dropdown-product-remove">
                          <i class="icon-cross"></i>
                        </span>
                      </li>
                      <li>
                        <a href="#" class="image">
                          <img
                            src="img/product-img/product-11.jpg"
                            class="cart-thumb"
                            alt=""
                          />
                        </a>
                        <div class="cart-item-desc">
                          <h6>
                            <a href="#">Women's Fashion</a>
                          </h6>
                          <p>
                            1x - <span class="price">$10</span>
                          </p>
                        </div>
                        <span class="dropdown-product-remove">
                          <i class="icon-cross"></i>
                        </span>
                      </li>
                      <li class="total">
                        <span class="pull-right">Total: $20.00</span>
                        <a href="cart.html" class="btn btn-sm btn-cart">
                          Cart
                        </a>
                        <a
                          href="checkout-1.html"
                          class="btn btn-sm btn-checkout"
                        >
                          Checkout
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div class="header-right-side-menu ml-15">
                    <a href="#" id="sideMenuBtn">
                      <i class="ti-menu" aria-hidden="true"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="main_header_area">
        <div class="container h-100">
          <div class="row h-100">
            <div class="col-12 d-md-flex justify-content-between">
              <div class="header-social-area">
                <a href="#">
                  <span class="karl-level">Share</span>{" "}
                  <i class="fa fa-pinterest" aria-hidden="true"></i>
                </a>
                <a href="#">
                  <i class="fa fa-facebook" aria-hidden="true"></i>
                </a>
                <a href="#">
                  <i class="fa fa-twitter" aria-hidden="true"></i>
                </a>
                <a href="#">
                  <i class="fa fa-linkedin" aria-hidden="true"></i>
                </a>
              </div>
              <div class="main-menu-area">
                <nav class="navbar navbar-expand-lg align-items-start">
                  <button
                    class="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#karl-navbar"
                    aria-controls="karl-navbar"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  >
                    <span class="navbar-toggler-icon">
                      <i class="ti-menu"></i>
                    </span>
                  </button>

                  <div
                    class="collapse navbar-collapse align-items-start collapse"
                    id="karl-navbar"
                  >
                    <ul class="navbar-nav animated" id="nav">
                      <li class="nav-item active">
                        <a class="nav-link" href="index.html">
                          Home
                        </a>
                      </li>
                      <li class="nav-item dropdown">
                        <a
                          class="nav-link dropdown-toggle"
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
                          class="dropdown-menu"
                          aria-labelledby="karlDropdown"
                        >
                          <a class="dropdown-item" href="index.html">
                            Home
                          </a>
                          <a class="dropdown-item" href="shop.html">
                            Shop
                          </a>
                          <a class="dropdown-item" href="product-details.html">
                            Product Details
                          </a>
                          <a class="dropdown-item" href="cart.html">
                            Cart
                          </a>
                          <a class="dropdown-item" href="checkout.html">
                            Checkout
                          </a>
                        </div>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link" href="#">
                          Dresses
                        </a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link" href="#">
                          <span class="karl-level">hot</span> Shoes
                        </a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link" href="#">
                          Contact
                        </a>
                      </li>
                    </ul>
                  </div>
                </nav>
              </div>
              <div class="help-line">
                <a href="tel:+346573556778">
                  <i class="ti-headphone-alt"></i> +34 657 3556 778
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
