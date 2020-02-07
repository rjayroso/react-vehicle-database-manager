import React, { Component } from 'react';
import { Route, Switch, Link } from "react-router-dom";
import ListVehicle from "./listVehicle";
import AddVehicle from "./addVehicle";
import DetailsVehicle from "./detailsVehicle";
import EditVehicle from "./editVehicle";
import DeleteVehicle from "./deleteVehicle";
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="container">
        <Navbar className="navbar navbar-default" />
        <Header />
        <hr />
        <Switch>
          <Route 
            exact path="/" 
            render={() => <Home />} />
          <Route 
            exact path="/cars" 
            render={() => <ListVehicle />} 
            />
          <Route
            exact path="/cars/add"
            render={() => <AddVehicle />}
          />
          <Route
            exact path="/cars/details/:id"
            render={props => <DetailsVehicle id={props.match.params.id} />}
          />
          <Route
            exact path="/cars/edit/:id"
            render={props => <EditVehicle id={props.match.params.id} />}
          />
          <Route
            exact path="/cars/delete/:id"
            render={props => <DeleteVehicle id={props.match.params.id} />}
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
            <Link className="nav-link" to="/cars">
              Vehicles
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/cars/add">
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