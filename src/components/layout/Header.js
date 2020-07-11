import React from 'react';

const Header = () => {
    return (
        <div style={headerStyle}>
            <h2>Vehicle Manager Inc.</h2>
            <p>A vehicle database management system</p>
        </div>
    );
}

const headerStyle = {
    background: '#333',
    color: '#fff',
    textAlign: 'center',
    padding: '10px'
}

export default Header;