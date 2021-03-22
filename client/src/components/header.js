import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Logo from "./assets/logo.png";
import { Button, ButtonBase, Drawer, Hidden } from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { AuthContext } from "./firebase/firebase";
import CustomDropdown from "./utils/CustomDropdown";
import { APP } from "./firebase/firebaseConfig";
import Feedback from './homepage/FeedBackForm/feedbackform';

const useStyles = makeStyles((theme) => ({
  title: {
    justifyContent: "left",
    [theme.breakpoints.down("md")]: {
      justifyContent: "center",
    },
  },
}));

export default function Header({ rightlinks, leftlinks }) {
  const { currentUser } = React.useContext(AuthContext);
  const classes = useStyles();
  const [openFeed, setOpenFeed] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [width, setWidth] = React.useState(window.innerWidth);

  const feedChange = () => setOpenFeed(!openFeed);

  React.useEffect(
    (width) => {
      window.addEventListener("resize", () => {
        setWidth(window.innerWidth);
      });
    },
    [width]
  );

  return (
    <>
      <Drawer anchor="right" open={open} onClose={() => setOpen(!open)}>
        <>Some Shit</>
      </Drawer>
      <header className="header_area bg-img background-overlay-white">
        <div className="top_header_area flex flex-row m-2 justify-between">
          <div className="">
            <a href="#">
              <img
                src={Logo}
                alt=""
                height={width > 1200 ? width * 0.1 : "100"}
                width={width > 1200 ? width * 0.1 : "100"}
                style={{}}
              />
            </a>
          </div>
          <div className="main_header_area mt-8">
            <div className="row h-100">
              <div className="col-12 d-md-flex justify-content-between">
                <div className="main-menu-area">
                  <nav className="navbar navbar-expand-lg align-items-start">
                    <button
                      onClick={() => setOpen(!open)}
                      style={{ paddingLeft: -20 }}
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
                          <a className="nav-link currentLink" href="/">
                            Home
                          </a>
                        </li>              
                        <li className="nav-item">
                          <a className="nav-link currentLink" href="/aboutus">
                            About Us
                          </a>
                        </li>
                        <li className="nav-item currentLink">
                          <a className="nav-link currentLink" href="/contactus">
                            Contact Us
                          </a>
                        </li>
                        <li className="nav-item currentLink">
                          <a onClick={feedChange} className="nav-link">
                            Feed Back Form
                          </a>
                          <Feedback open={openFeed} setOpen={feedChange} />
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
              <ul
                className="navbar-nav animated flex flex-row mt-8 mr-8 hidden md:block"
                id="nav"
              >
                <li className="nav-item">
                  {currentUser ? 
                    [
                      <Button
                      onClick={()=>{

                        APP.auth().signOut().then(()=>{
                          alert("SignOut Successfull")
                        });
                      }}
                      style={{
                        backgroundColor: "#ff084e",
                        color: "white",
                        fontWeight: 900,
                        marginRight:10
                      }}
                    >
                      SIgnOut
                    </Button>,
                    <Button
                      onClick={()=>{
                        
                      }}
                      style={{
                        backgroundColor: "#ff084e",
                        color: "white",
                        fontWeight: 900,
                      }}
                    >
                      Your Profile
                    </Button>,
                    <IconButton
                    href="/cart"
                    style={{
                      backgroundColor: "#ff084e",
                      color: "white",
                      fontWeight: 900,
                      marginTop: -10,
                      marginLeft: 10,
                    }}
                  >
                    <ShoppingCartIcon />
                  </IconButton>
                    
                    ]
                    
                   : (
                    <Button
                      href="/signup"
                      style={{
                        backgroundColor: "#ff084e",
                        color: "white",
                        fontWeight: 900,
                      }}
                    >
                      Join Us
                    </Button>
                  )}
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
