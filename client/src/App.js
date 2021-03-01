import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignIn from "./components/signin.js";
import SignUp from "./components/signup.js";
import {AuthProvider} from './components/firebase/firebase';
import HomePage from './components/homepage/index.js'

const App = () => {
  return (
    <>
    <AuthProvider>
      <Router>
        <Route path="/login" component={() => <SignIn />} />
        <Route path="/signup" component={() => <SignUp />} />
        <Route path="/" component={() => <HomePage />} />
        
      </Router>

    </AuthProvider>
    </>
  );
};

export default App;
