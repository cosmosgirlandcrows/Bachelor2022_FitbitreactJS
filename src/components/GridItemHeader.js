import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import DateSelector from "./DateSelector";

const GridItemHeader = ({ titletext, data, icon, handleUrl }) => {
  //Generates header title based on text and date selection
  const generateTitleText = (baseText, selectedDate) => {
    if (selectedDate === "1 week") return `${baseText} the last 7 days`;
    if (selectedDate === "1 month") return `${baseText} the last 30 days`;
    if (selectedDate === "3 months") return `${baseText} the last 3 months`;
    if (selectedDate === "1 year") return `${baseText} the last year`;
    return baseText;
  };

  const [selectedDate, setSelectedDate] = useState("");
  const [fullTitle, setFullTitle] = useState(null);

  //gets called when date period is changed in DateSelector component
  const handleOnChange = (selected) => setSelectedDate(selected);

  //gets called when component is finished rendering, and gets recalled if selectedDate changes state
  useEffect(() => {
    setFullTitle(() => generateTitleText(titletext, selectedDate));

    //this function gets passed as a prop from GridItemContainer
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
