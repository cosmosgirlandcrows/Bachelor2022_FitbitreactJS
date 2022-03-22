import PropTypes from "prop-types";
import GridItemHeader from "./GridItemHeader";

const GridItemContainer = ({ title, gridColumn, children }) => {
  return (
    <div className="gridItem" style={{ gridColumn: gridColumn }}>
      <GridItemHeader titletext={title} data="65bpm" />
      <div className="gridItemContent">{children}</div>
    </div>
  );
};

GridItemContainer.defaultProps = {
  gridColumn: "span 3",
};

GridItemContainer.propTypes = {
  gridColumn: PropTypes.string,
};

export default GridItemContainer;
