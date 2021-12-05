import React from 'react';
import propTypes from 'prop-types';
import Button from './Button';
import { useLocation } from 'react-router-dom';

const Header = ({ title, onAdd, showAdd }) => {
    const location = useLocation();

    return (
        <header>
            <h1>{title}</h1>
            { 
                location.pathname === '/' && 
                <Button text={showAdd ? "Add" : "Close"} color={showAdd ? "green" : "indianred"} onClick={onAdd} /> 
            }
        </header>
    );
}

Header.defaultProps = {
    title: 'Time Flies'
};

Header.propTypes = {
    title: propTypes.string.isRequired,
};

// const headingStyle = {
//     backgroundColor: "black",
//     textAlign: "center",
//     color: "#fff",
// };

export default Header;