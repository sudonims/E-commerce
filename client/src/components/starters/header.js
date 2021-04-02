import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import firebase from "firebase/app";
import "firebase/auth";
import Logo from "../assets/logo.png";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Avatar, Button, Drawer, Grid, Hidden, Paper } from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { AuthContext } from "../firebase/firebase";
import { APP } from "../firebase/firebaseConfig";
import Feedback from "../homepage/FeedBackForm/feedbackform";

const Profile = () => {
  const [width, setWidth] = React.useState(window.innerWidth);
  const { currentUser } = React.useContext(AuthContext);
  const [open, setOpen] = React.useState(false);

  React.useEffect(
    (width) => {
      window.addEventListener("resize", () => {
        setWidth(window.innerWidth);
      });
    },
    [width]
  );

  const setRecaptcha = () => {
    return new Promise((resolve) => {
      console.log("trying");
      try {
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
          "recaptcha-container",
          {
            size: "invisible",
            callback: (response) => {
              console.info("Invisible Captcha", response);
              // reCAPTCHA solved, allow signInWithPhoneNumber.
              console.log("Successssssss");
              resolve("success");
            },
            defaultCountry: "IN",
          }
        );
      } catch (err) {
        console.log(err);
      }
    });
  };

  const submit = async (e) => {
    e.preventDefault();
    const { email, name, phone } = e.target.elements;
    if (email.value !== currentUser.email) {
      APP.auth()
        .currentUser.verifyBeforeUpdateEmail(email.value)
        .then(() => {
          alert("Email will change once you verify");
        })
        .catch((err) => {
          console.log(err);
          alert("Check new email and try again after sign in");
        });
    }

    if (name.value !== currentUser.displayName) {
      APP.auth()
        .currentUser.updateProfile({
          displayName: name.value,
        })
        .then(() => {
          alert("Name updated");
        });
    }

    if (phone.value !== currentUser.phoneNumber) {
      await setRecaptcha().then((data) => {
        console.log(data);
        if (data === "success") {
          APP.auth()
            .currentUser.linkWithPhoneNumber(
              phone.value,
              window.recaptchaVerifier
            )
            .then(() => {
              alert("Phone Number Added");
            });
        }
      });
    }

    // if(phone)
  };

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
            <Grid item xs={12} sm={12} md={5} lg={5} xl={5}>
              <div className="flex flex-row">
                <div className="flex-1" />
                <Avatar
                  style={{
                    height: width > 1200 ? 400 : 150,
                    width: width > 1200 ? 400 : 150,
                  }}
                >
                  <img
                    src="https://thumbor.forbes.com/thumbor/250x382/https://blogs-images.forbes.com/dorothypomerantz/files/2011/09/Spongebob-squarepants.jpg"
                    height="100%"
                    width="100%"
                  />
                </Avatar>
                <div className="flex-1" />
              </div>
            </Grid>
            <Grid
              style={{ margin: 15 }}
              item
              xs={12}
              sm={12}
              md={6}
              lg={6}
              xl={6}
            >
              <form onSubmit={submit}>
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
                  {/* <Grid style={{ margin: 15 }} item xs={12}>
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
                  </Grid> */}
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
                  <Button type="submit">Update</Button>
                </Grid>
              </form>
            </Grid>
          </Grid>
          <div id="recaptcha-container"></div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClick} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default function Header({ rightlinks, leftlinks }) {
  const { currentUser } = React.useContext(AuthContext);
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
            <li className="nav-item">
              <Button href="/">Home</Button>
            </li>
            <li className="nav-item">
              <Button href="/aboutus">About Us</Button>
            </li>
            <li className="nav-item">
              <Button href="/contactus">Contact Us</Button>
            </li>
            <li className="nav-item">
              <Button onClick={feedChange}>Feed Back Form</Button>
              <Feedback open={openFeed} setOpen={feedChange} />
            </li>
          </ul>
          <div className="absolute bottom-2 m-2">
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
          </div>
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
                      style={{ marginTop: -25, paddingRight: 25 }}
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
                        <li className="nav-item">
                          <Button href="/">Home</Button>
                        </li>
                        <li className="nav-item">
                          <Button href="/aboutus">About Us</Button>
                        </li>
                        <li className="nav-item">
                          <Button href="/contactus">Contact Us</Button>
                        </li>
                        <li className="nav-item ">
                          <Button href="#" onClick={feedChange}>
                            Feed Back Form
                          </Button>
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