import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Logo from "./assets/logo.png";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Avatar, Button, Drawer, Grid, Hidden, Paper } from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { AuthContext } from "./firebase/firebase";
import { APP } from "./firebase/firebaseConfig";
import Feedback from "./homepage/FeedBackForm/feedbackform";

const Profile = () => {
  const { currentUser } = React.useContext(AuthContext);
  const [open, setOpen] = React.useState(false);
  console.log(currentUser);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <Button
        style={{
          backgroundColor: "#ff084e",
          color: "white",
          fontWeight: 900,
        }}
        onClick={handleClick}
      >
        My Profile
      </Button>
      <Dialog
        fullWidth={true}
        maxWidth={"lg"}
        open={open}
        onClose={handleClick}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Profile</DialogTitle>
        <DialogContent>
          <Grid container>
            <Grid style={{ margin: 15 }} item xs={6}>
              <Grid container>
                <Grid style={{ margin: 15 }} item xs={12}>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="email"
                    label="Email Address"
                    type="email"
                    name="email"
                    fullWidth
                    defaultValue={currentUser.email}
                  />
                </Grid>
                <Grid style={{ margin: 15 }} item xs={12}>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    name="name"
                    label="Name"
                    type="text"
                    fullWidth
                    defaultValue={currentUser.displayName}
                  />
                </Grid>
                <Grid style={{ margin: 15 }} item xs={12}>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="phone"
                    name="phone"
                    label="Phone Number"
                    type="text"
                    fullWidth
                    defaultValue={currentUser.phone}
                  />
                </Grid>
                <Grid style={{ margin: 15 }} item xs={12}>
                  <Button
                    onClick={() => {
                      window.location.href = "/myorders";
                    }}
                  >
                    View Your Orders
                  </Button>
                </Grid>

                <Grid style={{ margin: 15 }} item xs={12}>
                  {!currentUser.emailVerified && (
                    <Button
                      onClick={() =>
                        APP.auth()
                          .currentUser.sendEmailVerification()
                          .then(() => {
                            alert("Check your Email");
                          })
                      }
                    >
                      Verify Email
                    </Button>
                  )}
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={5}>
              <Avatar
                style={{
                  marginLeft: 20,
                  height: 400,
                  width: 400,
                }}
              >
                <img
                  src="https://thumbor.forbes.com/thumbor/250x382/https://blogs-images.forbes.com/dorothypomerantz/files/2011/09/Spongebob-squarepants.jpg"
                  height="100%"
                  width="100%"
                />
              </Avatar>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClick} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClick} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

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
      <Drawer
        style={{ minWidth: "50vw" }}
        anchor="right"
        open={open}
        onClose={() => setOpen(!open)}
      >
        <Paper style={{ width: 280 }}>
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
            <li className="nav-item">
              {currentUser ? (
                [
                  <Button
                    onClick={() => {
                      APP.auth()
                        .signOut()
                        .then(() => {
                          alert("SignOut Successfull");
                        });
                    }}
                    style={{
                      backgroundColor: "#ff084e",
                      color: "white",
                      fontWeight: 900,
                      marginRight: 10,
                    }}
                  >
                    SIgnOut
                  </Button>,
                  <Profile />,
                  <IconButton
                    href="/cart"
                    style={{
                      backgroundColor: "#ff084e",
                      color: "white",
                      fontWeight: 900,
                      marginTop: -10,
                      marginLeft: 10,
                    }}
                    disabled={!currentUser.emailVerified}
                  >
                    <ShoppingCartIcon />
                  </IconButton>,
                ]
              ) : (
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
        </Paper>
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
                      style={{ marginTop:-25,paddingRight:25 }}
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
                  {currentUser ? (
                    [
                      <Button
                        onClick={() => {
                          APP.auth()
                            .signOut()
                            .then(() => {
                              alert("SignOut Successfull");
                            });
                        }}
                        style={{
                          backgroundColor: "#ff084e",
                          color: "white",
                          fontWeight: 900,
                          marginRight: 10,
                        }}
                      >
                        SIgnOut
                      </Button>,
                      <Profile />,
                      <IconButton
                        href="/cart"
                        style={{
                          backgroundColor: "#ff084e",
                          color: "white",
                          fontWeight: 900,
                          marginTop: -10,
                          marginLeft: 10,
                        }}
                        disabled={!currentUser.emailVerified}
                      >
                        <ShoppingCartIcon />
                      </IconButton>,
                    ]
                  ) : (
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
