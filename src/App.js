import React, { Component } from 'react';
import { Route, Switch, Link } from "react-router-dom";
import listVehicle from "./listVehicle";
import addVehicle from "./addVehicle";
import detailsVehicle from "./detailsVehicle";
import editVehicle from "./editVehicle";
import deleteVehicle from "./deleteVehicle";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="container">
        <Navbar className="navbar navbar-default" />
        <Header />

        <hr />

        <Switch>
          <Route exact path="/" render={() => <Home />} />
          <Route exact path="/vehicles" render={() => <listVehicle />} />
          <Route
            exact
            path="/vehicles/add"
            render={() => <addVehicle />}
          />
          <Route
            exact
            path="/vehicles/details/:id"
            render={props => <detailsVehicle id={props.match.params.id} />}
          />
          <Route
            exact
            path="/vehicles/edit/:id"
            render={props => <editVehicle id={props.match.params.id} />}
          />
          <Route
            exact
            path="/vehicles/delete/:id"
            render={props => <deleteVehicle id={props.match.params.id} />}
          />
          <Route render={() => <NotFound />} />
        </Switch>

        <p>&nbsp;</p>
        <hr />
        <footer>
          <p>&copy; 2020, Royce Ayroso-Ong</p>
        </footer>
      </div>
    );
  }
}

export default App;

// Function component for the top-of-view header
const Header = () => {
  return (
    <div className="container">
      <div className="masthead">
        <h2>BTI425 Assignment 1</h2>
        <br/>
        <p>A vehicle database management system.</p>
      </div>
    </div>
  );
}

// Function component for the navigation bar
const Navbar = () => {
  return (
    <div className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="navbar-brand">
        <Link to="/" className="navbar-brand">
          Home page
        </Link>
      </div>

      {/* <!-- All the navigation links are in the following div --> */}
      <div>
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/vehicles">
              Vehicles
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/vehicles/add">
              Add New Vehicle
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

// Function component for a content area
const Home = () => {
  return (
    <div>
      <p>We're home!</p>
      <p>&nbsp;</p>
    </div>
  );
};

// Function component for a content area
const NotFound = () => {
  return (
    <div>
      <p>Resource not found.</p>
      <p>&nbsp;</p>
    </div>
  );
};