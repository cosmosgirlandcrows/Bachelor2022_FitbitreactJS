import React from "react";
import PropTypes from "prop-types";

const Button = ({ title, onClick }) => {
  return (
    <button className="btn" onClick={onClick}>
      {title}
    </button>
  );
};

Button.defaultProps = {
  title: "Button",
};

Button.propTypes = {
  title: PropTypes.string,
  onClick: PropTypes.func,
};

export default Button;
