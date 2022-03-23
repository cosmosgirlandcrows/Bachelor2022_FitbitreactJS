import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import DateSelector from "./DateSelector";

const GridItemHeader = ({ titletext, data, icon, handleUrl }) => {
  const generateTitleText = (baseText, selectedDate) => {
    if (selectedDate === "1 week") return `${baseText} the last 7 days`;
    if (selectedDate === "1 month") return `${baseText} the last 30 days`;
    if (selectedDate === "3 months") return `${baseText} the last 3 months`;
    if (selectedDate === "1 year") return `${baseText} the last year`;
    return baseText;
  };

  const [selectedDate, setSelectedState] = useState("");
  const [fullTitle, setFullTitle] = useState(null);
  const handleOnChange = (selected) => setSelectedState(selected);

  useEffect(() => {
    setFullTitle(() => generateTitleText(titletext, selectedDate));
    handleUrl(selectedDate);
  }, [selectedDate]);

  return (
    <div className="gridItemHeader">
      <div className="gridHeaderIcon">{icon}</div>
      <div>
        <h1>{data}</h1>
        <h2>{fullTitle}</h2>
      </div>
      <div className="dateContainer">
        <DateSelector handleOnChange={handleOnChange} />
      </div>
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
