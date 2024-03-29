import React from "react";
import firebase from "firebase";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import logo from "../assets/logo.png";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { APP } from "../firebase/firebaseConfig";
import { AuthContext } from "../firebase/firebase";
import Footer from "./footer";
import Google from "./google1.png";
import { useSnackbar } from "notistack";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

var provider = new firebase.auth.GoogleAuthProvider();



const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    width: 100,
    height: 100,

    // backgroundColor: theme.pa  lette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function FormDialog({ open, setOpen }) {
  const { enqueueSnackbar } = useSnackbar();
  const submit = () => {
    var a = document.getElementById("name___").value;

    APP.auth()
      .sendPasswordResetEmail(a)
      .then(() => {
        
          enqueueSnackbar("Email sent. Check your Email for reset!!", {
            variant: "success",
          });
        
      });

    setOpen();
  };
  return (
    <div>
      <Dialog open={open} onClose={setOpen} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Reset</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name___"
            label="Email Address"
            type="email"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button
            style={{
              color: "black",
            }}
            onClick={setOpen}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            style={{
              color: "black",
            }}
            onClick={submit}
            color="primary"
          >
            Reset
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default function SignIn() {
  const { currentUser } = React.useContext(AuthContext);
  const [open, setopen] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [values, setValues] = React.useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const changeopen = () => {
    setopen(!open);
  };

  console.log(currentUser);
  const classes = useStyles();

  const handleGoogleSignIN = () => {
    APP.auth()
      .signInWithPopup(provider)
      .then((res) => {
        
          enqueueSnackbar("Signed IN!!", {
            variant: "success",
          });
        
        window.location.href = "/";
      })
      .catch((err) => {
        console.log(err);
        if (err.code === "auth/user-not-found") {
          
            enqueueSnackbar("Oops!! User not found!!", {
              variant: "warning",
            });
          
          window.location.reload();
        }
      });
  };

  const oldSchoolSignIn = (e) => {
    e.preventDefault();

    const { email, password, remember } = e.target.elements;
    console.log(remember.checked);

    var persist = remember.checked
      ? firebase.auth.Auth.Persistence.LOCAL
      : firebase.auth.Auth.Persistence.SESSION;

    APP.auth()
      .setPersistence(persist)
      .then(() => {
        APP.auth()
          .signInWithEmailAndPassword(email.value, password.value)
          .then((res) => {
            
              enqueueSnackbar("Signed IN!!", {
                variant: "success",
              });
            
            window.location.href = "/";
          })
          .catch((err) => {
            console.log(err);
            if (err.code === "auth/user-not-found") {
              
                enqueueSnackbar("Oops user not found!!", {
                  variant: "info",
                });
              
              window.location.reload();
            }
          });
      });
  };
  return (
    <>
      <FormDialog open={open} setOpen={changeopen} />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <img alt="img_logo" width={100} height={100} src={logo} />

          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form onSubmit={oldSchoolSignIn} className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <FormControl
              style={{width:"100%"}}
              variant="outlined"
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                name="password"
                id="outlined-adornment-password"
                type={values.showPassword ? "text" : "password"}
                value={values.password}
                onChange={handleChange("password")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={70}
              />
            </FormControl>
            <FormControlLabel
              control={
                <Checkbox name="remember" value="remember" color="primary" />
              }
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link onClick={() => changeopen()} variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
          <p> OR </p>
          <button
            className="flex flex-row bg-white"
            onClick={handleGoogleSignIN}
          >
            <Avatar style={{ backgroundColor: "rgba(0, 0, 0, 0)" }}>
              <img alt="img_google" height={24} width={24} src={Google} />
            </Avatar>
            <p className="mt-2 content-center">Google</p>
          </button>
        </div>
      </Container>
      <Footer />
    </>
  );
}
