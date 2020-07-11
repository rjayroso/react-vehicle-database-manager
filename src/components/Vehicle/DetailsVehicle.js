import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

class DetailsVehicle extends Component {
  state = { vehicle: {}, httpStatusCode: 0, httpStatusOk: false };

  componentDidMount() {
    const url = `https://bti-webapi.herokuapp.com/api/cars/details/${this.props.id}`;

    fetch(url)
      .then(response => {
        this.setState({
          httpStatusCode: response.status,
          httpStatusOk: response.ok
        });
        if (response.ok) {
          return response.json();
        } else if (response.status === 404) {
          throw Error("HTTP 404, Not found");
        } else {
          throw Error(`HTTP ${response.status}, ${response.statusText}`);
        }
      })
      .then(responseData => {
        this.setState({ vehicle: responseData });
        // console.log(responseData);
      })
      .catch(error => {
        // Handles an error thrown above, as well as network general errors
        console.log(error);
      });
  }

  render() {
    document.title = `vehicle ${this.props.id} detail`;

    // For coding convenience, create a shortcut object
    const vehicle = this.state.vehicle;

    return (
      <React.Fragment>
          <h4 style={headerStyle}>
            Details about vehicle {vehicle.car_make} {vehicle.car_model}{" "}
            {vehicle.car_year}
          </h4>
          <div style={divStyle}>
          {this.state.httpStatusOk ? (
            <div className="row">
              <div className="col-md-6">
                <dl className="dl-horizontal">
                  <dt>Database ID</dt>
                  <dd>{vehicle._id}</dd>
                  <dt>Identifier</dt>
                  <dd>{vehicle.vin}</dd>
                  <dt>Make</dt>
                  <dd>{vehicle.car_make}</dd>
                  <dt>Model</dt>
                  <dd>{vehicle.car_model}</dd>
                  <dt>Year</dt>
                  <dd>{vehicle.car_year}</dd>
                  <dt>VIN</dt>
                  <dd>{vehicle.vin}</dd>
                  <dt>MSRP</dt>
                  <dd>{vehicle.msrp}</dd>
                  <dt>Purchase date</dt>
                  <dd>{vehicle.purchase_date}</dd>
                  <dt>Purchaser name</dt>
                  <dd>{vehicle.purchaser_name}</dd>
                  <dt>Purchaser email</dt>
                  <dd>{vehicle.purchaser_email}</dd>
                  <dt>Purchaser Phone</dt>
                  <dd>{vehicle.purchaser_phone}</dd>
                  <dt>Price Paid</dt>
                  <dd>{vehicle.price_paid}</dd>
                  <dt>Paint Color</dt>
                  <dd>{vehicle.paint_color}</dd>
                </dl>
              </div>
              <div className="col-md-2">
                <img src={vehicle.photo} alt="" className="img-responsive" />
              </div>
            </div>
          ) : (
            <p>Requested vehicle was not found</p>
          )}
          <p>
            <Link to={`/react-vehicle-database-manager/cars/edit/${vehicle._id}`}>Edit</Link>
            &nbsp;&nbsp;
            <Link to="/react-vehicle-database-manager/cars">Show list of vehicles</Link>
          </p>
        </div>
      </React.Fragment>
      
    );
  }
}

const divStyle = {
  paddingLeft: "70px"
}

const headerStyle = {
  paddingLeft: "70px",
  paddingTop: "20px", 
  height: "40px",
  background: "#d1d1d1",
  margin: "0 auto",
  verticalAlign: "middle"
}

export default withRouter(DetailsVehicle);