import React from "react";
import { Router, Route, Switch } from "react-router-dom";
// import "./SCSS/main.scss";
import "./index.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  Home,
  Login,
  Register,
  Explore,
  Profile,
  Upload,
  ProfileView,
  ErrorPage
} from "./pages";
import history from "./routes/history";
import PrivateRoute from "./routes/PrivateRoute";

function App() {
  return (
    <Router history={history}>
      <Switch>
        <PrivateRoute exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <PrivateRoute exact path="/explore" component={Explore} />
        <PrivateRoute exact path="/profile" component={Profile} />
        <PrivateRoute exact path="/upload" component={Upload} />
        <PrivateRoute exact path="/error" component={ErrorPage} />
        <PrivateRoute exact path="/profile-view/:id" component={ProfileView} />
      </Switch>
      <ToastContainer position="bottom-left" hideProgressBar/>      

    </Router>
  );
}

export default App;
