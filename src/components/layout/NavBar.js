import React from 'react';
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div style={headerStyle}>
            <Link style={linkStyle} to="/react-vehicle-database-manager/" className="navbar-brand">
                Home
            </Link>
            &nbsp; | &nbsp;
            <Link style={linkStyle} to="/react-vehicle-database-manager/about" className="navbar-brand">
                About
            </Link>
            &nbsp; | &nbsp;
            <Link style={linkStyle} to="/react-vehicle-database-manager/cars">
                Vehicles
            </Link>
            &nbsp; | &nbsp;
            <Link style={linkStyle} to="/react-vehicle-database-manager/cars/add">
                Add New Vehicle
            </Link>
        </div>
    );
}

const headerStyle = {
    background: '#333',
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    padding: '10px'
}

const linkStyle = {
    color: '#fff',
    textDecoration: 'none'
}

export default Navbar;