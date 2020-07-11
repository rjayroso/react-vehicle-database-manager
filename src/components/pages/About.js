import React from 'react';

const About = () => {
    
    document.title = "About";

    return (
        <div>
            <h1 style={{textAlign: "center"}}>About</h1>
            <p style={paragraphStyle}>This is the VehicleDatabaseManager app v1.0.0. This is a React assignment of mine which I have been given from the course BTI425-"Web Programming for Apps and Services" of the Seneca College Software Development program.<br/>
            NOTE: This React app pulls from a personal online API and MongoDB database to populate the vehicle list</p>
            <p>&nbsp;</p>
        </div>
    );
}

const paragraphStyle = {
    paddingLeft: "40px",
    paddingRight: "40px"
};

export default About;