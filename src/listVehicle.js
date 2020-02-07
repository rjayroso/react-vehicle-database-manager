import React, { Component } from "react";
import { Link } from "react-router-dom";

class listVehicle extends Component {
  state = { vehicles: [] };

  componentDidMount() {

    const url = 'https://bti-webapi.herokuapp.com/api/vehicles';

    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else if (response.status === 404) {
          throw Error("HTTP 404, Not found");
        } else {
          throw Error(`HTTP ${response.status}, ${response.statusText}`);
        }
      })
      .then(responseData => {
        this.setState({ vehicles: responseData });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    document.title = "Vehicle list";

    return (
      <div className="container-fluid">
        <h4>Vehicles</h4>
        <p>
          <Link className="btn btn-primary" to="/vehicles/add">
            Add New Vehicle
          </Link>
        </p>
        <div
          className="container table-responsive"
          style={{ maxWidth: "100%", maxHeight: "100%" }}
        >
          <table className="table-sm table-striped ">
            <TableHeader />
            <TableBody vehicles={this.state.vehicles} />
          </table>
        </div>
      </div>
    );
  }
}

export default listVehicle;

// Function component, table header
const TableHeader = () => {
  return (
    <thead>
      <tr>
        <th>Car Make</th>
        <th>Car Model</th>
        <th>Car Year</th>
        <th>VIN</th>
        <th>MSRP</th>
        <th>Photo</th>
        <th>Purchase Date</th>
        <th>Purchaser Name</th>
        <th>Purchaser Email</th>
        <th>Purchaser Phone</th>
        <th>Price Paid</th>
        <th>Paint Color</th>
        <th>Actions</th>
      </tr>
    </thead>
  );
};

// Function component
// Its purpose is to render the HTML table body element
const TableBody = props => {
  let rows = props.vehicles.map((vehicle, index) => {
    return <TableRow vehicle={vehicle} key={index} />;
  });

  return <tbody>{rows}</tbody>;
};

// Function component
// Its purpose is to render a single HTML table row
const TableRow = props => {
  const vehicle = props.vehicle;

  return (
    <tr>
      <td>{vehicle.car_make}</td>
      <td>{vehicle.car_model}</td>
      <td>{vehicle.car_year}</td>
      <td>{vehicle.vin}</td>
      <td>{vehicle.msrp}</td>
      <td>
        <img src={vehicle.photo} alt="" className="imgInTable" />
      </td>
      <td>{vehicle.purchase_date}</td>
      <td>{vehicle.purchaser_name}</td>
      <td>{vehicle.purchaser_email}</td>
      <td>{vehicle.purchaser_phone}</td>
      <td>{vehicle.price_paid}</td>
      <td>{vehicle.paint_color}</td>
      <td className="d-inline-flex">
        <Link
          className="btn btn-primary"
          to={`/vehicles/detail/${vehicle._id}`}
        >
          Details
        </Link>
        &nbsp;&nbsp;
        <Link className="btn btn-warning" to={`/vehicles/edit/${vehicle._id}`}>
          Edit
        </Link>
        &nbsp;&nbsp;
        <Link className="btn btn-danger" to={`/vehicles/delete/${vehicle._id}`}>
          Delete
        </Link>
      </td>
    </tr>
  );
};
