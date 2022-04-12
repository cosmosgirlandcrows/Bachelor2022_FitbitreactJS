import PropTypes from "prop-types";
import { useEffect, useState, useContext } from "react";
import useFetch from "../hooks/useFetch";
import GridItemHeader from "./GridItemHeader";
import moment from "moment";
import Loader from "./Loader";
import GridItemContent from "./GridItemContent";
import { AuthenticationContext } from "../contexts/AuthenticationContext";

const GridItemContainer = ({
  title,
  icon,
  gridColumn,
  children,
  url,
  getDataset,
  handleLabelChange,
}) => {
  const { access_token } = useContext(AuthenticationContext);

  //Generates full url with date parameters
  const buildUrl = (url, startDate, endDate) =>
    `${url}${startDate}/${endDate}.json`;

  const getDates = (selectedDate) => {
    const endDate = moment().format("yyyy-MM-DD");
    let startDate = moment();

    switch (selectedDate) {
      case "1 week":
        startDate = moment(startDate).subtract(7, "days").format("yyyy-MM-DD");
        break;
      case "1 month":
        startDate = moment(startDate)
          .subtract(1, "months")
          .format("yyyy-MM-DD");
        break;
      case "3 months":
        startDate = moment(startDate)
          .subtract(3, "months")
          .format("yyyy-MM-DD");
        break;
      case "1 year":
        startDate = moment(startDate).subtract(1, "years").format("yyyy-MM-DD");
        break;
    }
    return [startDate, endDate];
  };

  const enumerateDates = (startDate, endDate) => {
    const now = moment(startDate);
    const dates = [];
    while (now.isSameOrBefore(endDate)) {
      dates.push(now.format("yyyy-MM-DD"));
      now.add(1, "days");
    }
    return dates;
  };

  //Calculates average value
  const getAverage = (data, endText, roundToDecimal) => {
    let sum = 0;
    data.forEach((el) => (sum += el));
    const average = roundToDecimal
      ? (sum / data.length).toFixed(1)
      : (sum / data.length).toFixed(0);
    return average + " " + endText;
  };

  //gets called when selectedDate state is changed in GridItemHeader
  //and refetches data with new url
  const handleUrl = (selectedDate) => {
    const [startDate, endDate] = getDates(selectedDate);
    setFullUrl(() => buildUrl(url, startDate, endDate));
    const dateLabels = enumerateDates(startDate, endDate);
    handleLabelChange(dateLabels);
  };

  const [average, setAverage] = useState("");
  const [data, loading, error, setFullUrl] = useFetch(access_token, null);

  useEffect(() => {
    //gets called after api call returns response
    if (data) {
      const [dataset, text, roundToDecimal] = getDataset(data);
      setAverage(getAverage(dataset, text, roundToDecimal));
    }
  }, [data]);

  return (
    <div className="gridItem" style={{ gridColumn: gridColumn }}>
      <GridItemHeader
        titletext={title}
        data={loading ? <Loader text="Loading..." /> : `${average}`}
        icon={icon}
        handleUrl={handleUrl}
      />
      <GridItemContent>{children}</GridItemContent>
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
