import PropTypes from "prop-types";

const GridItemContainer = ({ title, gridColumn, children }) => {
  return (
    <div className="gridItem" style={{ gridColumn: gridColumn }}>
      <div className="gridItemHeader">
        <h2>{title}</h2>
      </div>
      <div className="gridItemContent">{children}</div>
    </div>
  );
};

GridItemContainer.defaultProps = {
  title: "Grid Item",
  gridColumn: "span 3",
};

GridItemContainer.propTypes = {
  title: PropTypes.string,
  gridColumn: PropTypes.string,
};

export default GridItemContainer;
