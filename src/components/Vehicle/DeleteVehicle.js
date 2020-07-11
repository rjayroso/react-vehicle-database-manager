import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

class DeleteVehicle extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  state = { vehicle: {}, httpStatusCode: 0, httpStatusOk: false };

  componentDidMount() {
    const getUrl =  `https://bti-webapi.herokuapp.com/api/cars/details/${this.props.id}`;

    fetch(getUrl)
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
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleSubmit(e) {
    const deleteUrl = `https://bti-webapi.herokuapp.com/api/cars/delete/${this.props.id}`;

    fetch(deleteUrl, { method: "DELETE" })
      .then(response => {
        if (response.ok) {
          return response.status;
        } else if (response.status >= 400 && response.status < 500) {
          throw Error(`HTTP ${response.status}, ${response.statusText}`);
        } else {
          throw Error(`HTTP ${response.status}, ${response.statusText}`);
        }
      })
      .then(responseData => {
        this.props.history.push("/react-vehicle-database-manager/cars");
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    document.title = `Delete vehicle ${this.props.id}`;

    // For coding convenience, create a shortcut object
    const vehicle = this.state.vehicle;

    return (
      <React.Fragment>
        <h4 style={headerStyle}>
          Delete vehicle {vehicle.car_make} {vehicle.car_model}{" "}
          {vehicle.car_year}
        </h4>
        {this.state.httpStatusOk ? (
          <div style={divStyle}>
            <div>
              <dl>
                <dt>Database ID</dt>
                <dd>{vehicle._id}</dd>
                <dt>VIN</dt>
                <dd>{vehicle.vin}</dd>
                <dt>Car Make</dt>
                <dd>{vehicle.car_make}</dd>
                <dt>Car Model</dt>
                <dd>{vehicle.car_model}</dd>
                <dt>Car Year</dt>
                <dd>{vehicle.car_year}</dd>
                <dt>VIN</dt>
                <dd>{vehicle.vin}</dd>
                <dt>MSRP</dt>
                <dd>{vehicle.MSRP}</dd>
                <dt>Purchase Date</dt>
                <dd>{vehicle.purchase_date}</dd>
                <dt>Purchaser Name</dt>
                <dd>{vehicle.purchaser_name}</dd>
                <dt>Purchaser email</dt>
                <dd>{vehicle.purchaser_email}</dd>
                <dt>Purchaser Email</dt>
                <dd>{vehicle.purchaser_email}</dd>
                <dt>Price Paid</dt>
                <dd>{vehicle.price_paid}</dd>
                <dt>Paint Color</dt>
                <dd>{vehicle.paint_color}</dd>
              </dl>
            </div>
            <div>
              <img src={vehicle.photo} alt=""/>
            </div>
          </div>
        ) : (
          <p>Requested vehicle was not found</p>
        )}

        <hr />
        <p>
          Confirm that this vehicle should be deleted, or cancel to return to
          the list of vehicles.
        </p>
        <p>
          <button onClick={this.handleSubmit}>Confirm delete</button>
          &nbsp;&nbsp;
          <Link to="/react-vehicle-database-manager/cars">
            Cancel
          </Link>
        </p>
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

export default withRouter(DeleteVehicle);
