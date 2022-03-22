import PropTypes from "prop-types";
import { FaHeartbeat } from "react-icons/fa";

const GridItemHeader = ({ titletext, data }) => {
  return (
    <div className="gridItemHeader">
      <div className="gridHeaderIcon">
        <FaHeartbeat />
      </div>
      <div>
        <h1>{data}</h1>
        <h2>{titletext}</h2>
      </div>
    </div>
  );
};

GridItemHeader.defaultProps = {
  title: "Grid Item",
};

GridItemHeader.propTypes = {
  title: PropTypes.string,
};

export default GridItemHeader;
