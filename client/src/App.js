import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignIn from "./components/signin.js";
import SignUp from "./components/signup.js";
import { AuthProvider } from "./components/firebase/firebase";
import HomePage from "./components/homepage/Card/index.js";
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
import './components/css/main1.css';
import Cart from './components/cart/cart.js';
import ContactUs from './components/homepage/Contact/contactus.js';
import AboutUs from "./components/homepage/AboutUs/AboutUs.js";

const App = () => {
  return (
    <>
      <AuthProvider>
        <Router>
          <Route path="/login" component={() => <SignIn />} />
          <Route path="/signup" component={() => <SignUp />} />
          <Route exact path="/" component={() => <HomePage />} />
          <Route path="/cart" component={() => <Cart />} />
          <Route path="/contactus" component={() => <ContactUs />} />
          <Route path="/aboutus" component={() => <AboutUs />} />
          
        </Router>
      </AuthProvider>
    </>
  );
};

export default App;
