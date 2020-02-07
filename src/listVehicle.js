import React, { Component } from "react";
import { Link } from "react-router-dom";

class ListVehicle extends Component {
  
state = { vehicles: [] };

  componentDidMount() {

    const url = "https://bti-webapi.herokuapp.com/api/cars";

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
        console.log(responseData.data);
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
          <Link className="btn btn-primary" to="/cars/add">
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

export default ListVehicle;

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
  const v = props.vehicle;

  return (
    <tr>
      <td>{v.car_make}</td>
      <td>{v.car_model}</td>
      <td>{v.car_year}</td>
      <td>{v.vin}</td>
      <td>{v.msrp}</td>
      <td>
        <img src={v.photo} alt="" className="imgInTable" />
      </td>
      <td>{v.purchase_date}</td>
      <td>{v.purchaser_name}</td>
      <td>{v.purchaser_email}</td>
      <td>{v.purchaser_phone}</td>
      <td>{v.price_paid}</td>
      <td>{v.paint_color}</td>
      <td className="d-inline-flex">
        <Link
          className="btn btn-primary"
          to={`/vehicles/details/${v._id}`}
        >
          Details
        </Link>
        &nbsp;&nbsp;
        <Link className="btn btn-warning" to={`/vehicles/edit/${v._id}`}>
          Edit
        </Link>
        &nbsp;&nbsp;
        <Link className="btn btn-danger" to={`/vehicles/delete/${v._id}`}>
          Delete
        </Link>
      </td>
    </tr>
  );
};
