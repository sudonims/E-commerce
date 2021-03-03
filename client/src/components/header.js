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
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  return (
    <header class="header_area bg-img background-overlay-white">
      <div class="top_header_area flex flex-row m-2">
        <div class="top_logo">
                  <a href="#">
                    <img src={Logo} alt="" height='150' width='150' style={{}} />
                  </a>
        </div>
        <div className="flex-1" />
        <div style={{marginLeft: -200}} className="main_header_area mt-8">
          <div class="row h-100">
            <div class="col-12 d-md-flex justify-content-between">
              <div class="header-social-area content-center">
              
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
              <div className='flex-grow'></div>
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
              <div className='flex-grow'></div>
            </div>
          </div>
        </div>
        <div className="flex-1" />
      </div>
    </header>
  );
}
