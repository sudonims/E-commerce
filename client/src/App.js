import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Cookies from "js-cookie";
import SignIn from "./components/starters/signin.js";
import SignUp from "./components/starters/signup.js";
import { AuthProvider } from "./components/firebase/firebase";
import HomePage from "./components/homepage/Card/index.js";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "./components/css/animate.css";
import "./components/css/bootstrap.min.css";
import "./components/css/core-style.css";
import "./components/css/font-awesome.min.css";
import "./components/css/jquery-ui.min.css";
import "./components/css/magnific-popup.css";
import "./components/css/nouislider.css";
import "./components/css/owl.carousel.css";
import "./components/css/responsive.css";
import "./components/css/themify-icons.css";
import "./components/css/styles.css";
// import "./components/css/main1.css";
import "./components/css/form.css";
import Cart from "./components/cart/cart.js";
import ContactUs from "./components/homepage/Contact/contactus.js";
import AboutUs from "./components/homepage/AboutUs/AboutUs.js";
import Product from "./components/product/product.js";
import Myorders from "./components/Myorders/myorders.js";
import { SnackbarProvider } from "notistack";

const App = () => {
  React.useEffect(() => {
    var cart = { cart: [] };
    if (!Cookies.get("cart")) {
      Cookies.set("cart", cart);
    }
  }, []);

  return (
    <AuthProvider>
      <SnackbarProvider maxSnack={3}>
        <Router>
          <Switch>
            <Route path="/signin" component={() => <SignIn />} />
            <Route path="/signup" component={() => <SignUp />} />
            <Route exact path="/" component={() => <HomePage />} />
            <Route path="/cart" component={() => <Cart />} />
            <Route path="/contactus" component={() => <ContactUs />} />
            <Route path="/aboutus" component={() => <AboutUs />} />
            <Route path="/myorders" component={() => <Myorders />} />

            <Route
              path="/product/:id"
              component={(props) => <Product prodId={props.match.params.id} />}
            />
          </Switch>
        </Router>
      </SnackbarProvider>
    </AuthProvider>
  );
};

export default App;
