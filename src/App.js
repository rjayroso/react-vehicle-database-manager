import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";

import Footer from "./components/layout/Footer"
import Header from "./components/layout/Header";
import Navbar from "./components/layout/NavBar";

import About from "./components/pages/About"
import AddVehicle from "./components/pages/AddVehicle";
import Home from "./components/pages/Home"
import NotFound from "./components/pages/NotFound";


import DeleteVehicle from "./components/Vehicle/DeleteVehicle";
import DetailsVehicle from "./components/Vehicle/DetailsVehicle";
import EditVehicle from "./components/Vehicle/EditVehicle";
import ListVehicle from "./components/Vehicle/ListVehicle";

import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Navbar/>
        <Switch>
          <Route 
            exact path="/react-vehicle-database-manager/home" 
            render={() => <Home />} />
          <Route
            exact path="/react-vehicle-database-manager/about"
            render={() => <About />} />
          <Route 
            exact path="/react-vehicle-database-manager/cars" 
            render={() => <ListVehicle />} 
            />
          <Route
            exact path="/react-vehicle-database-manager/cars/add"
            render={() => <AddVehicle />}
          />
          <Route
            exact path="/react-vehicle-database-manager/cars/details/:id"
            render={props => <DetailsVehicle id={props.match.params.id} />}
          />
          <Route
            exact path="/react-vehicle-database-manager/cars/edit/:id"
            render={props => <EditVehicle id={props.match.params.id} />}
          />
          <Route
            exact path="/react-vehicle-database-manager/cars/delete/:id"
            render={props => <DeleteVehicle id={props.match.params.id} />}
          />
          <Route render={() => <NotFound />} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default App;