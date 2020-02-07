import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

class editVehicle extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Class properties
  state = {
    vehicle: {},

    car_make: 0,
    car_model: "",
    car_year: 0,
    vin: "",
    msrp: 0,
    photo: "",
    purchase_date: "",
    purchaser_name: "",
    purchaser_email: "",
    purchaser_phone: "",
    price_paid: 0,
    paint_color: "",

    httpStatusCode: 0,
    httpStatusOk: false
  };

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  componentDidMount() {
    const getUrl = `https://bti-webapi.herokuapp.com/api/vehicles/${this.props.id}`;

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
        this.setState({
          vehicle: responseData,
          car_make: responseData.car_make,
          car_model: responseData.car_model,
          car_year: responseData.car_year,
          vin: responseData.vin,
          msrp: responseData.msrp,
          photo: responseData.photo,
          purchase_date: responseData.purchase_date,
          purchaser_name: responseData.purchaser_name,
          purchaser_email: responseData.purchaser_email,
          purchaser_phone: responseData.purchaser_phone,
          price_paid: responseData.price_paid,
          paint_color: responseData.paint_color
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleSubmit(e) {
    e.preventDefault();

    const newVehicle = {
      car_make: this.state.car_make,
      car_model: this.state.car_model,
      car_year: this.state.car_year,
      vin: this.state.vin,
      msrp: this.state.msrp,
      photo: this.state.photo,
      purchase_date: this.state.purchase_date,
      purchaser_name: this.state.purchaser_name,
      purchaser_email: this.state.purchaser_email,
      price_paid: this.state.price_paid,
      purchaser_phone: this.state.purchaser_phone,
      paint_color: this.state.paint_color
    };

    const putUrl = `https://bti-webapi.herokuapp.com/api/vehicles/edit/${this.props.id}`;

    fetch(putUrl, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newVehicle)
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else if (response.status >= 400 && response.status < 500) {
          throw Error(`HTTP ${response.status}, ${response.statusText}`);
        } else {
          throw Error(`HTTP ${response.status}, ${response.statusText}`);
        }
      })
      .then(responseData => {
        this.props.history.push(`/vehicles/details/${this.props.id}`);
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    document.title = `Vehicle ${this.props.id} edit`;

    const isDisabled = this.state.vehicle.car_make === 0;

    const vehicle = this.state.vehicle;

    if (this.input && this.state.vehicle.car_make === 0) {
      this.input.focus();
    }

    return (
      <div>
        <h4>
          Edit vehicle {vehicle.car_make} {vehicle.car_model} {vehicle.car_year}{" "}
          ({vehicle.vin})
        </h4>

        {this.state.httpStatusOk ? (
          <div className="container">
            <p>Edit vehicle data:</p>
            <hr />
            <form>
              <div className="form-group">
                <label htmlFor="car_make">Car Make</label>
                <input
                  name="car_make"
                  className="form-control"
                  ref={i => {
                    this.input = i;
                  }}
                  onChange={this.handleChange}
                  placeholder={vehicle.car_make}
                />
              </div>
              <div className="form-group">
                <label htmlFor="car_model">Car Model</label>
                <input
                  name="car_model"
                  className="form-control"
                  onChange={this.handleChange}
                  placeholder={vehicle.car_model}
                />
              </div>
              <div className="form-group">
                <label htmlFor="car_year">Car Year</label>
                <input
                  name="car_year"
                  className="form-control"
                  onChange={this.handleChange}
                  placeholder={vehicle.car_year}
                />
              </div>
              <div className="form-group">
                <label htmlFor="vin">VIN</label>
                <input
                  name="vin"
                  className="form-control"
                  onChange={this.handleChange}
                  placeholder={vehicle.vin}
                />
              </div>
              <div className="form-group">
                <label htmlFor="msrp">MSRP</label>
                <input
                  name="msrp"
                  className="form-control"
                  onChange={this.handleChange}
                  placeholder={vehicle.msrp}
                />
              </div>
              <div className="form-group">
                <label htmlFor="photo">Photo</label>
                <input
                  name="photo"
                  className="form-control"
                  onChange={this.handleChange}
                  placeholder={vehicle.photo}
                />
              </div>
              <div className="form-group">
                <label htmlFor="purchase_date">Purchase Date</label>
                <input
                  name="purchase_date"
                  className="form-control"
                  onChange={this.handleChange}
                  placeholder={vehicle.purchase_date}
                />
              </div>
              <div className="form-group">
                <label htmlFor="purchaser_name">Purchaser Name</label>
                <input
                  name="purchaser_name"
                  className="form-control"
                  onChange={this.handleChange}
                  placeholder={vehicle.purchaser_name}
                />
              </div>
              <div className="form-group">
                <label htmlFor="purchaser_email">Purchaser Email</label>
                <input
                  name="purchaser_email"
                  className="form-control"
                  onChange={this.handleChange}
                  placeholder={vehicle.purchaser_email}
                />
              </div>
              <div className="form-group">
                <label htmlFor="purchaser_phone">Purchaser Phone</label>
                <input
                  name="purchaser_phone"
                  className="form-control"
                  onChange={this.handleChange}
                  placeholder={vehicle.purchaser_phone}
                />
              </div>
              <div className="form-group">
                <label htmlFor="price_paid">Price Paid</label>
                <input
                  name="price_paid"
                  className="form-control"
                  onChange={this.handleChange}
                  placeholder={vehicle.price_paid}
                />
              </div>
              <div className="form-group">
                <label htmlFor="paint_color">Paint Color</label>
                <input
                  name="paint_color"
                  className="form-control"
                  onChange={this.handleChange}
                  placeholder={vehicle.paint_color}
                />
              </div>
              <div className="form-group">
                <button
                  disabled={isDisabled}
                  onClick={this.handleSubmit}
                  className="btn btn-success"
                >
                  Save
                </button>
                &nbsp;&nbsp;
                <Link className="btn btn-primary" to="/vehicles">
                  Cancel
                </Link>
              </div>
            </form>
          </div>
        ) : (
          <div>
            <p>
              Requested vehicle with identifier {this.props.id} was not found
            </p>
            <hr />
            <p>
              <Link className="btn btn-default" to="/vehicles">
                Show list of vehicles
              </Link>
            </p>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(editVehicle);
