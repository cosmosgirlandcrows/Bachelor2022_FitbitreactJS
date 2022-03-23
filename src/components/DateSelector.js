import React, { useEffect, useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import PropTypes from "prop-types";

const DateSelector = ({ values, handleOnChange }) => {
  const [isToggled, setToggled] = useState(false);
  const [selected, setSelected] = useState(values[0]);
  const [insideDropdown, setInsideDropdown] = useState(false);

  useEffect(() => {
    handleOnChange(selected);
  }, [selected]);

  const toggleDropdown = () => {
    setToggled(!isToggled);
    setInsideDropdown(false);
  };
  const handleMouseEnter = () => setInsideDropdown(true);
  const handleMouseLeave = () => setInsideDropdown(false);
  const handleClick = (index) => {
    setToggled(!isToggled);
    setSelected(values[index]);
  };
  const handleBlur = () => {
    if (!insideDropdown) setToggled(!setToggled);
  };

  return (
    <div className="select">
      <input
        type="text"
        readOnly
        value={selected}
        className="selectInput"
        onClick={toggleDropdown}
        onBlur={handleBlur}
      />
      <MdKeyboardArrowDown className="arrow" />
      {isToggled && (
        <ul
          className="dropdown"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {values.map((value, index) => (
            <li key={index} onClick={() => handleClick(index)}>
              {value}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

DateSelector.defaultProps = {
  values: ["1 week", "1 month", "3 months", "1 year"],
};

DateSelector.propTypes = {
  values: PropTypes.arrayOf(PropTypes.string),
  handleOnChange: PropTypes.func.isRequired,
};

export default DateSelector;
