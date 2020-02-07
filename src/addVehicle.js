import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

class AddVehicle extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

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
    this.input.focus();
  }

  handleSubmit(e) {
    // Turn off default form handling
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
      purchaser_phone: this.state.purchaser_phone,
      price_paid: this.state.price_paid,
      paint_color: this.state.paint_color
    };

    const url = `https://bti-webapi.herokuapp.com/api/cars/add`;

    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newVehicle)
    })
      .then(response => {
        if (response.ok) {
          // Parse the response body as JSON
          return response.json();
        } else if (response.status >= 400 && response.status < 500) {
          // Error caused by the requestor
          throw Error(`HTTP ${response.status}, ${response.statusText}`);
        } else {
          // Some other situation
          throw Error(`HTTP ${response.status}, ${response.statusText}`);
        }
      })
      .then(responseData => {
        // Redirect to detail
        this.props.history.push(`/cars/details/${responseData._id}`);
      })
      .catch(error => {
        // Handles an error thrown above, as well as network general errors
        console.log(error);
      });
  }

  render() {
    document.title = "Add vehicle";

    // Determine the button state
    const isDisabled = this.state.vin.length <= 0;

    return (
      <div>
        <h4>Add a new vehicle</h4>
        {/* <form onSubmit={this.handleSubmit}> */}
        <div className="container">
          <p>Enter new vehicle data:</p>
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
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="car_model">Car Model</label>
              <input
                name="car_model"
                className="form-control"
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="car_year">Car Year</label>
              <input
                name="car_year"
                className="form-control"
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="vin">VIN</label>
              <input
                name="vin"
                className="form-control"
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="msrp">MSRP</label>
              <input
                name="msrp"
                className="form-control"
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="photo">Photo</label>
              <input
                name="photo"
                className="form-control"
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="purchase_date">Purchase Date</label>
              <input
                name="purchase_date"
                className="form-control"
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="purchaser_name">Purchaser Name</label>
              <input
                name="purchaser_name"
                className="form-control"
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="purchaser_email">Purchaser Email</label>
              <input
                name="purchaser_email"
                className="form-control"
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="purhcaser_phone">Purchaser Phone</label>
              <input
                name="purhcaser_phone"
                className="form-control"
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="price_paid">Price Paid</label>
              <input
                name="price_paid"
                className="form-control"
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="paint_color">Paint Color</label>
              <input
                name="paint_color"
                className="form-control"
                onChange={this.handleChange}
              />
            </div>
            <div className="col-auto">
              <button
                disabled={isDisabled}
                onClick={this.handleSubmit}
                className="btn btn-success"
              >
                Add Vehicle
              </button>
              &nbsp;&nbsp;
              <Link className="btn btn-primary" to="/cars">
                Cancel
              </Link>
            </div>
          </form>
        </div>
        {/* </form> */}
      </div>
    );
  }
}

export default withRouter(AddVehicle);