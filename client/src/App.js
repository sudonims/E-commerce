import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignIn from "./components/signin.js";
import SignUp from "./components/signup.js";

const App = () => {
  return (
    <>
      <Router>
        <Route path="/login" component={() => <SignIn />} />
        <Route path="/signup" component={() => <SignUp />} />
      </Router>
    </>
  );
};

export default App;
