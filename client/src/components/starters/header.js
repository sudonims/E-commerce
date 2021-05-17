import React from "react";
import IconButton from "@material-ui/core/IconButton";
import firebase from "firebase/app";
import "firebase/auth";
import Logo from "../assets/logo.png";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import {
  Avatar,
  Button,
  ButtonBase,
  Drawer,
  Grid,
  Hidden,
  Paper,
} from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { AuthContext } from "../firebase/firebase";
import { APP } from "../firebase/firebaseConfig";
import Feedback from "../homepage/FeedBackForm/feedbackform";
import { useSnackbar } from "notistack";

const Profile = () => {
  const [width, setWidth] = React.useState(window.innerWidth);
  const { currentUser } = React.useContext(AuthContext);
  const [open, setOpen] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();

  React.useEffect(
    (width) => {
      window.addEventListener("resize", () => {
        setWidth(window.innerWidth);
      });
    },
    [width]
  );

  const submit = async (e) => {
    e.preventDefault();
    const { email, name, phone } = e.target.elements;
    var a = 0,
      b = 0,
      c = 0;
    try {
      if (email.value !== currentUser.email) {
        APP.auth()
          .currentUser.verifyBeforeUpdateEmail(email.value)
          .then(() => {
            a = 1;
            // alert("Email will change once you verify");

            enqueueSnackbar("Email will change once you verify", {
              variant: "warning",
            });
          })
          .catch((err) => {
            console.log(err);

            enqueueSnackbar("Check new email and try again after sign in", {
              variant: "warning",
            });
          });
      }

      if (name.value !== currentUser.displayName) {
        APP.auth()
          .currentUser.updateProfile({
            displayName: name.value,
          })
          .then(() => {
            b = 1;

            enqueueSnackbar("Name Updated", {
              variant: "success",
            });
          })
          .catch((err) => {
            alert("There is something error while updating name");
          });
      }
      if (phone.value !== currentUser.phoneNumber) {
        var recaptcha = new firebase.auth.RecaptchaVerifier(
          "recaptcha-container"
        );
        var number =
          phone.value.slice(0, 3) === "+91" ? phone.value : "+91" + phone.value;

        var provider = new firebase.auth.PhoneAuthProvider();
        provider
          .verifyPhoneNumber(number, recaptcha)
          .then((verificationId) => {
            var code = prompt("Enter the OTP", "");

            return firebase.auth.PhoneAuthProvider.credential(
              verificationId,
              code
            );
          })
          .then((cred) => {
            APP.auth()
              .currentUser.updatePhoneNumber(cred)
              .then(() => {
                c = 1;

                enqueueSnackbar("Phone Numeber Verified and changed!!", {
                  variant: "success",
                });

                (a || b || c) && window.location.reload();
              });
          })
          .catch((err) => {
            if (err.code === "auth/invalid-phone-number") {
              enqueueSnackbar("Check phone Number Again!!", {
                variant: "warning",
              });
            }
          });
      }
    } catch (err) {
      console.log("err", err);
      if (err === "auth/invalid-phone-number") {
        // alert("Inavlid Phone Number. Check Again");

        enqueueSnackbar("SignOut Successfull", {
          variant: "success",
        });
      }
    }
  };

  const handleClick = () => {
    setOpen(!open);
  };
  const uploadImage = (e) => {
    const storage = firebase.storage();
    var ref = storage.ref();
    var file = e.target.files[0];
    const name = new Date() + "-" + file.name;
    const uid = APP.auth().currentUser.photoURL;
    console.log(uid);

    if (uid) {
      ref.child(uid).delete();
    }

    const metadata = {
      contentType: file.type,
    };
    try {
      if (currentUser.photoURL) {
        var old_ref = storage.refFromURL(currentUser.photoURL);
        old_ref.delete().then(() => {
          // alert("Photo updated successfully");
          // window.location.reload();
        });
      }
      const task = ref.child(name).put(file, metadata);
      task
        .then((snapshot) => snapshot.ref.getDownloadURL())
        .then((url) => {
          console.log(url);
          APP.auth()
            .currentUser.updateProfile({
              photoURL: url,
            })
            .then(() => {
              enqueueSnackbar("Photo updated successfully", {
                variant: "success",
              });
              window.location.reload();
            });
        })
        .catch((err) => {
          throw new Error("Error Occured");
        });
    } catch (err) {
      console.log(err);
      if (
        err ==
        "FirebaseError: Firebase Storage: refFromUrl() expected a valid full URL but got an invalid one. (storage/invalid-argument)"
      ) {
        const task = ref.child(name).put(file, metadata);
        task
          .then((snapshot) => snapshot.ref.getDownloadURL())
          .then((url) => {
            console.log(url);
            APP.auth()
              .currentUser.updateProfile({
                photoURL: url,
              })
              .then(() => {
                enqueueSnackbar("Photo updated successfully", {
                  variant: "success",
                });
                window.location.reload();
              });
          })
          .catch((err) => {
            throw new Error("Error Occured");
          });
      } else {
        enqueueSnackbar("Error Occured. photo not updated.", {
          variant: "error",
        });
      }
    }
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
              <div className="flex flex-col place-content-center">
                <Avatar
                  style={{
                    height: width > 1200 ? 400 : 150,
                    width: width > 1200 ? 400 : 150,
                  }}
                >
                  <img
                    alt="your_img"
                    className="object-cover"
                    src={currentUser.photoURL}
                    height="100%"
                    width="100%"
                  />
                </Avatar>
                <div className="flex flex-row">
                  <div className="flex-1" />
                  <div style={{ margin: 15 }}>
                    <label htmlFor="uploadPhoto">
                      <input
                        type="file"
                        style={{ display: "none" }}
                        id="uploadPhoto"
                        name="uploadPhoto"
                        onChange={uploadImage}
                      />
                      <Button
                        component="span"
                        style={{ backgroundColor: "#ff084e", color: "white" }}
                      >
                        Upload Image
                      </Button>
                      {/* <span id="fileName" style={{ marginLeft: 10 }}>
                      Add File
                    </span> */}
                    </label>
                  </div>
                  <div className="flex-1" />
                </div>
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
                      defaultValue={currentUser.email || ""}
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
                      defaultValue={currentUser.displayName || ""}
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
                      defaultValue={currentUser.phoneNumber || ""}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      style={{
                        margin: 15,
                        backgroundColor: "#ff084e",
                        color: "white",
                      }}
                      onClick={() => {
                        window.location.href = "/myorders";
                      }}
                      hidden={!currentUser.emailVerified}
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
                              // alert();

                              enqueueSnackbar(
                                "Email was sent to your registered emailid for verification",
                                {
                                  variant: "info",
                                }
                              );
                            })
                        }
                        style={{ backgroundColor: "#ff084e", color: "white" }}
                      >
                        Verify Email
                      </Button>
                    )}
                  </Grid>
                  <div id="recaptcha-container"></div>
                  <Button
                    hidden={!currentUser.emailVerified}
                    style={{
                      margin: 15,
                      backgroundColor: "#ff084e",
                      color: "white",
                    }}
                    type="submit"
                  >
                    Update
                  </Button>
                </Grid>
              </form>
            </Grid>
          </Grid>
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
  const { enqueueSnackbar } = useSnackbar();

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
                        enqueueSnackbar("SignOut Successfull", {
                          variant: "success",
                        });

                        window.location.href = "/";
                      });
                  }}
                  style={{
                    backgroundColor: "#ff084e",
                    color: "white",
                    fontWeight: 900,
                    marginRight: 10,
                  }}
                >
                  SignOut
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
            <a href="/">
              <img
                src={Logo}
                alt="Logo"
                height={width > 1200 ? width * 0.075 : "100"}
                width={width > 1200 ? width * 0.075 : "100"}
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
                          <Button
                            disabled={
                              !(currentUser && currentUser.emailVerified)
                            }
                            href="#"
                            onClick={feedChange}
                          >
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
                              // alert("SignOut Successfull");

                              enqueueSnackbar("SignOut Successfull", {
                                variant: "success",
                              });
                            });
                        }}
                        style={{
                          backgroundColor: "#ff084e",
                          color: "white",
                          fontWeight: 900,
                          marginRight: 10,
                        }}
                      >
                        SignOut
                      </Button>,
                      <Profile />,
                      <IconButton
                        style={{
                          backgroundColor: "#ff084e",
                          color: "white",
                          fontWeight: 900,
                          marginLeft: 10,
                          height: "50px",
                          width: "50px",
                        }}
                        onClick={() => {
                          if (!currentUser.emailVerified) {
                            enqueueSnackbar("Please Verify Your Email", {
                              variant: "info",
                            });
                          } else {
                            window.location.href = "/cart";
                          }
                        }}
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
