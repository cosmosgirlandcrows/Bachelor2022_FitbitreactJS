import PropTypes from "prop-types";

const GridItemHeader = ({ titletext, value, icon, children }) => {
  return (
    <div className="gridItemHeader">
      <div className="gridHeaderIcon">{icon}</div>
      <div>
        <h1>{value}</h1>
        <h2>{titletext}</h2>
      </div>
      <div className="dateContainer">{children}</div>
    </div>
  );
};

GridItemHeader.defaultProps = {
  title: "Grid Item",
};

GridItemHeader.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.element,
};

export default GridItemHeader;
