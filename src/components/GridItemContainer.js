import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import GridItemHeader from "./GridItemHeader";
import moment from "moment";
import Loader from "./Loader";

const GridItemContainer = ({
  title,
  icon,
  gridColumn,
  children,
  access_token,
  url,
  getDataset,
}) => {
  //Generates full url with date parameters
  const buildUrl = (url, selectedDate) => {
    const endDate = moment().format("yyyy-MM-DD");
    if (selectedDate === "1 week") {
      const startDate = moment().subtract(7, "days").format("yyyy-MM-DD");
      return `${url}${startDate}/${endDate}.json`;
    }
    if (selectedDate === "1 month") {
      const startDate = moment().subtract(1, "months").format("yyyy-MM-DD");
      return `${url}${startDate}/${endDate}.json`;
    }
    if (selectedDate === "3 months") {
      const startDate = moment().subtract(3, "months").format("yyyy-MM-DD");
      return `${url}${startDate}/${endDate}.json`;
    }
    if (selectedDate === "1 year") {
      const startDate = moment().subtract(1, "years").format("yyyy-MM-DD");
      return `${url}${startDate}/${endDate}.json`;
    }
    return null;
  };

  //Calculates average value
  const getAverage = (dataset) => {
    const [data, endText, roundToDecimal] = dataset;
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
    setFullUrl(() => buildUrl(url, selectedDate));
  };

  const [average, setAverage] = useState("");
  const [data, loading, error, setFullUrl] = useFetch(access_token, null);

  useEffect(() => {
    //gets called after api call returns response
    if (data) setAverage(getAverage(getDataset(data)));
  }, [data]);

  return (
    <div className="gridItem" style={{ gridColumn: gridColumn }}>
      <GridItemHeader
        titletext={title}
        data={loading ? <Loader text="Loading..." /> : `${average}`}
        icon={icon}
        handleUrl={handleUrl}
      />
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
