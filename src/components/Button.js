import React from 'react';
import propTypes from 'prop-types';

const Button = ({ text, color, onClick }) => {
    return (
        <button style={{ backgroundColor: color }} className="btn" onClick={onClick}>
           {text}
        </button>
    ); 
};

Button.defaultProps = { 
    color: 'steelblue',
    text: 'Button'
};

Button.propTypes = {
    color: propTypes.string,
    text: propTypes.string.isRequired,
    onClick: propTypes.func,
};

export default Button;
